/* global d3, topojson */

export default (us, data, steakScale) => {
  d3.select(window).on('resize', sizeChange);

  var projection = d3.geo.albersUsa().scale(1100);
  var path = d3.geo.path().projection(projection);

  var svg = d3
    .select('#steakScaleRegions')
    .append('svg')
	.attr('width', '100%')
	.attr('id', 'map')
	.append('g');

  var region = {
    'East North Central': {
      set: { '17': 1, '18': 1, '26': 1, '55': 1, '39':1},
      score: 0
    },
    'East South Central': {
      set: { '21': 1, '47': 1, '28': 1, '1': 1 },
      score: 0
    },
    'Middle Atlantic': {
      set: { '36': 1, '42': 1, '34': 1 },
      score: 0
    },
    Mountain: {
      set: { '16': 1, '30': 1, '56': 1, '32': 1, '49': 1, '8': 1, '4': 1, '35': 1 },
      score: 0
    },
    'New England': {
      set: { '23': 1, '33': 1, '50': 1, '25': 1, '9': 1, '44': 1 },
      score: 0
    },
    Pacific: {
      set: { '41': 1, '53': 1, '2': 1, '6': 1, '15': 1 },
      score: 0
    },
    'South Atlantic': {
      set: { '54': 1, '24': 1, '10': 1, '11': 1, '51': 1, '37': 1, '45': 1, '13': 1, '12': 1 },
      score: 0
    },
    'West North Central': {
      set: { '38': 1, '27': 1, '46': 1, '31': 1, '19': 1, '20': 1, '29': 1 },
      score: 0
    },
    'West South Central': {
      set: { '40': 1, '5': 1, '48': 1, '22': 1 },
      score: 0
    }
  };

  // excude empty steak preference and regions
  data = data.filter(function (el) {
  	return el.steakPreference != "" &&
  		el.region != "";
  })

  // put the array of categories in the order that they should appear
  var summary = d3.nest()
  	.key(function (d) { return d.region; })
  	.key(function (d) { return d.steakPreference; })
  	.rollup(function (v) { return v.length; })
  	.map(data);

  var regions = Object.keys(summary);
  // using the grouped data, get percentage of steakConsumers per each income level
  for (let x = 0; x < regions.length; x++) {

  	var sum = 0;
  	var count = 0;
  	var target = summary[regions[x]];

  	for (var k in target) {
  		if (target.hasOwnProperty(k)) {
  			sum += steakScale[k] * target[k]
  			count += target[k]
  		}
  	}

  	// update the average steak score for each region
  	region[regions[x]]['score'] = String(sum / count)
  }

  var div = d3.select("body").append("div")
  	.attr("class", "tooltip")
  	.style("opacity", 0);


  var colorScale = d3.scale.linear().domain([1, 2, 4, 5]).range(["#edfaff", "#edfaff",  "#2A3C65", "#2A3C65"]);

  var states = topojson.feature(us, us.objects.states);

  regions.forEach(reg => {
    var selection = {
      type: 'FeatureCollection',
      features: states.features.filter(function(d) {
        return d.id in region[reg].set;
      })
    };

    svg
      .append('path')
      .datum(selection)
      .attr('class', 'state selected-boundary')
      .attr('d', path);

    svg
      .append('path')
	  .datum(selection)
  	  .style('fill', colorScale(region[reg]['score']))
	  .attr('d', path)
	  
	.on("mouseover", function() {
		div.transition()
			.duration(200)
			.style("opacity", .9);
		div	.html( "The " + reg + " region likes their meat at <b>"+ Number(region[reg]['score']).toFixed(2)
		+ "</b> on the steak scale")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
	.on("mouseout", function() {
		div.transition()
			.duration(500)
			.style("opacity", 0);
	})

	// for mobile, hover is not availabe so do operation on clickl
	.on("click", function() {
		div.transition()
			.duration(200)
			.style("opacity", .9);
		div	.html( "The " + reg + " region likes their meat at <b>"+ Number(region[reg]['score']).toFixed(2)
		+ "</b> on the steak scale")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
  });

  var container = document.getElementById('steakScaleRegions')

  d3.select('#map').select('g').attr('transform', 'scale(' + (container.offsetWidth) / 900 + ')');
  document.getElementById('map').style.height = (container.offsetWidth) * 0.618;

  function sizeChange() {
    d3.select('#map').select('g').attr('transform', 'scale(' + (container.offsetWidth-40) / 900 + ')');
    document.getElementById('map').style.height = (container.offsetWidth) * 0.618;
  }

	/** build the legend */
	//set up svg using margin conventions
	var margin = {
		top: 10,
		bottom: 15	
	};

	var height = 10 + margin.top  + margin.bottom;
	var width = 220;

	var svg = d3.select("#legend")
		.attr("height", height)

	//Append a defs (for definition) element to your SVG
	var defs = svg.append("defs");

	//Append a linearGradient element to the defs and give it a unique id
	var linearGradient = defs.append("linearGradient")
		.attr("id", "linear-gradient");

	//Set the color for the start (0%)
	linearGradient.append("stop") 
		.attr("offset", "0%")   
		.attr("stop-color", "#edfaff");

	linearGradient.append("stop") 
		.attr("offset", "10%")   
		.attr("stop-color", "#edfaff");		

	linearGradient.append("stop") 
		.attr("offset", "90%")   
		.attr("stop-color", "#2A3C65"); 	

	//Set the color for the end (100%)
	linearGradient.append("stop") 
		.attr("offset", "100%")   
		.attr("stop-color", "#2A3C65"); 	

	//Draw the rectangle and fill with gradient
	svg.append("rect")
		.attr("width", width)
		.attr("height", height - margin.top - margin.bottom)
		.style("fill", "url(#linear-gradient)");

	// append ticks and lables to the legend TODO: This could created using loop
	svg.append("text")
		.attr("x", 0)
		.attr("y", 30)
		.text("Rare (1)");

	svg.append("text")
		.attr("x", (width-55)/2)
		.attr("y", 30)
		.text("Medium (3)");	

	svg.append("text")
		.attr("x", width-30)
		.attr("y", 30)
		.text("Well (5)");	

	svg.append("line")
		.attr("x1", .5)
		.attr("y1", 0)
		.attr("x2", .5)
		.attr("y2", height - margin.top-margin.bottom + 3)
		.attr("stroke-width", 1)
		.attr("stroke", "grey");

	svg.append("line")
		.attr("x1", width/2)
		.attr("y1", 0)
		.attr("x2", width/2)
		.attr("y2", height - margin.top-margin.bottom + 3)
		.attr("stroke-width", 1)
		.attr("stroke", "grey");

	svg.append("line")
		.attr("x1", width-1)
		.attr("y1", 0)
		.attr("x2", width-1)
		.attr("y2", height - margin.top-margin.bottom + 3)
		.attr("stroke-width", 1)
		.attr("stroke", "grey")
  
}
