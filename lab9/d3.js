/*Scatter Plot*/


var data = [];
for (var i = 0; i < 100; i++) {
  var x = Math.random() * 500;
  var y = Math.random() * 500;
  data.push({
    x: x,
    y: y
  });
}

function generatePlot() {
  var margin = {
      top: 50,
      right: 50,
      bottom: 70,
      left: 70
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3.select("#scatter-plot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleLinear()
    .domain([0, 500])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, 500])
    .range([height, 0]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", 40)
    .attr("x", width / 2)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("X-axis");

  g.append("g")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("y", -40)
    .attr("x", -height / 2)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Y-axis");

  svg.append('text')
    .attr('x', width / 2 + margin.left)
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Scatter Plot');

  g.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })
    .attr("r", 2)
    .style("fill", "#b891cf");
}


/*Pie Chart*/
function generatePieChart() {
  d3.csv('titanic.csv').then(function (data) {
    var ageData = data.map(function (d) {
      return +d.Age;
    });

    var ageCategories = {
      '0-10': 0,
      '11-20': 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '>50': 0,
    };

    data.forEach(function (d) {
      var age = +d.Age;
      if (age >= 0 && age <= 10) {
        ageCategories['0-10']++;
      } else if (age >= 11 && age <= 20) {
        ageCategories['11-20']++;
      } else if (age >= 21 && age <= 30) {
        ageCategories['21-30']++;
      } else if (age >= 31 && age <= 40) {
        ageCategories['31-40']++;
      } else if (age >= 41 && age <= 50) {
        ageCategories['41-50']++;
      } else {
        ageCategories['>50']++;
      }
    });

    var pieData = Object.keys(ageCategories).map(function (category) {
      return {
        label: category,
        value: ageCategories[category]
      };
    });

    var width = 500;
    var height = 500;
    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };

    var svg = d3.select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + (margin.left + width / 2) + ',' + (margin.top + height / 2) + ')');

    var pie = d3.pie()
      .value(function (d) {
        return d.value;
      });
    var pieData = pie(pieData);

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2);

    var colorScale = d3.scaleOrdinal(["#C0A0D8", "#D8A4A0", "#B8D8A0", "#A0D4D8", "#D8C0A0", "#A0D8C0"]);

    svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr("fill", function (d, i) {
        return colorScale(i);
      })
      .attr('d', arc)


    svg.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', function (d) {
        return 'translate(' + arc.centroid(d) + ')';
      })
      .text(function (d) {
        return d.data.label;
      });
  });
}