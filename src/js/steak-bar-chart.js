/* global d3 */
export default (data, chart) => {
  var startLen = data.length;
  var endLen = 0;
  var categories = [];
  var scores = [];

  // excude empty income and consumber responses
  data = data.filter(function(el) {
    return el[chart.target] != '' && el.steakConsumer != '';
  });

  // update with new length so we can report number of samples that we're excluded
  endLen = data.length;

  // put the array of categories in the order that they should appear
  var summary = d3
    .nest()
    .key(function(d) {
      return d[chart.target];
    })
    .sortKeys(function(a, b) {
      return chart.categories.indexOf(a) - chart.categories.indexOf(b);
    })
    .key(function(d) {
      return d.steakConsumer;
    })
    .rollup(function(v) {
      return v.length;
    })
    .map(data);

  // using the grouped data, get percentage of steakConsumers per each income level
  for (x = 0; x < chart.categories.length; x++) {
    scores.push({
      label: chart.categories[x].replace('Some college or Associate degree', 'Some college').replace('degree', ''),
      tooltips: chart.tooltips[x],
      score: summary[chart.categories[x]].Yes / (summary[chart.categories[x]].Yes + summary[chart.categories[x]].No)
    });
  }

  // set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 25,
    right: 35,
    bottom: 15,
    left: 160
  };

  var titleSpace = 10;

  var width = 390 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom - titleSpace;

  var svg = d3
    .select('#' + chart.htmlID)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom + titleSpace)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var x = d3.scale
    .linear()
    .range([0, width])
    .domain([
      0,
      d3.max(scores, function(d) {
        return d.score;
      })
    ]);

  var y = d3.scale
    .ordinal()
    .rangeRoundBands([height, 0], 0.1)
    .domain(
      scores.map(function(d) {
        return d.label;
      })
    );

  //make y axis to show bar labels
  var yAxis = d3.svg
    .axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient('left');

  svg
    .append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + 0 + ',' + titleSpace + ')')
    .call(yAxis);

  // Define the div for the tooltip
  var div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  var bars = svg
    .selectAll('.bar')
    .data(scores)
    .enter()
    .append('g');

  //append rects
  bars
    .append('rect')
    .attr('transform', 'translate(' + 0 + ',' + titleSpace + ')')
    .attr('width', 0) // set initial width to 0 for easing
    .on('mouseover', function(d) {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html('Individuals ' + d.tooltips + ' are <b>' + Math.round(d.score * 100, 0) + '%</b> likely to consume steak')
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
    })
    .on('mouseout', function(d) {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
    })
    .transition()
    .duration(1000)
    .attr('class', 'bar')
    .attr('y', function(d) {
      return y(d.label);
    })
    .attr('height', y.rangeBand())
    .attr('x', 0)
    .attr('width', function(d) {
      return x(d.score);
    });

  //add a score label to the inside of each bar
  bars
    .append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + 0 + ',' + titleSpace + ')')

    //y position of the label is halfway down the bar
    .attr('y', function(d) {
      return y(d.label) + y.rangeBand() / 2 + 4;
    })
    //x position is 30 pixels to the left of the bar end
    .attr('x', function(d) {
      return x(d.score) - 30;
    })
    .text(function(d) {
      return d3.format('.0%')(d.score);
    });

  // add a title
  svg
    .append('text')
    .attr('x', 40 - margin.left)
    .attr('y', 0 - margin.top / 2)
    .style('font-size', '16px')
    .text(chart.title);
  // add subtitle
  svg
    .append('text')
    .attr('x', 40 - margin.left)
    .attr('y', 18 - margin.top / 2)
    .style('font-size', '12px')
    .text(chart.subtitle);

  svg
    .append('text')
    .attr('x', margin.right)
    .attr('y', height + margin.bottom +titleSpace / 1.25)
    .style('font-size', '12px')
    .text(String(startLen - endLen) + ' empty values excluded');
};
