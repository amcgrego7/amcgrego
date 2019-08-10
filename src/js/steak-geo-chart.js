

/* global d3, topojson */

export default (us, data, steakScale) => {

	

	var region = {
		'East North Central':
		{
			set: d3.set(['55', '17', '18', '26', '39']),
			score: 0,
			coordsX: 0,
			coordsY: 0
		},
		'East South Central':
		{
			set: d3.set(['21', '47', '28', '01']),
			score: 0,
			coordsX: 180,
			coordsY: 120
		},
		'Middle Atlantic':
		{
			set: d3.set(['36', '42', '34']),
			score: 0,
			coordsX: 190,
			coordsY: 320
		},
		'Mountain':
		{
			set: d3.set(['16', '30', '56', '32', '49', '08', '04', '35']),
			score: 0,
			coordsX: 615,
			coordsY: 460
		},
		'New England':
		{
			set: d3.set(['23', '33', '50', '25', '09', '44']),
			score: 0,
			coordsX: 925,
			coordsY: 235
		},
		'Pacific':
		{
			set: d3.set(['41', '53', '02', '06', '15']),
			score: 0,
			coordsX: 560,
			coordsY: 265
		},
		'South Atlantic':
		{
			set: d3.set(['54', '24', '10', '11', '51', '37', '45', '13', '12']),
			score: 0,
			coordsX: 270,
			coordsY: 580
		},
		'West North Central':
		{
			set: d3.set(['38', '27', '46', '31', '19', '20', '29']),
			score: 0,
			coordsX: 0,
			coordsY: 0
		},
		'West South Central':
		{
			set: d3.set(['40', '05', '48', '22']),
			score: 0,
			coordsX: 0,
			coordsY: 0
		},
	}

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

	var svg = d3.select("#steakScaleRegions")
	 
	var path = d3.geo.path()
		.projection(null);

	// Define the div for the tooltip
	var div = d3.select("body").append("div")	
		.attr("class", "tooltip")				
		.style("opacity", 0);	

	svg.append("use")
		.attr("xlink:href", "#nation")
		.attr("fill-opacity", 0.2)
		.attr("filter", "url(#blur)");

	svg.append("use")
		.attr("xlink:href", "#nation")
		.attr("fill", "#fff");

	/*identify the states and apply basic formatting*/
	svg.append("path")
		.datum(topojson.feature(us, us.objects.states))
		.attr("class", "state")
		.attr("d", path);

	/*apply the state boundaries for each*/
	svg.append("path")
		.datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
		.attr("class", "state-boundary")
		.attr("d", path);
		
	var colorScale = d3.scale.linear().domain([1, 2, 4, 5]).range(["#edfaff", "#edfaff",  "#2A3C65", "#2A3C65"]);

	for (let i = 0; i < Object.keys(region).length; i++) {

		var reg = region[Object.keys(region)[i]];
		var regTitle = Object.keys(region)[i]

		svg.append("path")
			.datum(topojson.merge(us, us.objects.states.geometries.filter(function (d) { return reg['set'].has(d.id); })))
			.style('fill', colorScale(region[Object.keys(region)[i]]['score']))
			.attr("stroke-width", 1)
			.attr("stroke", "#f1efef")
			.attr("title", regTitle)
			.attr("score", region[Object.keys(region)[i]]['score'])
			.attr("d", path)
			.on("mouseover", function() {		
				div.transition()		
					.duration(200)		
					.style("opacity", .9);		
				div	.html( "The " + '$(this).attr("title")' + " region likes their meat at <b>"+ 'Number($(this).attr("score")).toFixed(2)'
				+ "</b> on the steak scale")	
					.style("left", (d3.event.pageX) + "px")		
					.style("top", (d3.event.pageY - 28) + "px");	
				})
			.on("mouseout", function() {		
				div.transition()		
					.duration(500)		
					.style("opacity", 0);	
			})			
		}

	// d3.select(self.frameElement).style("height", height + "px");
	
	/** build the legend */
	//set up svg using margin conventions
	
	var margin = {
		top: 10,
		left: 0,
		bottom: 15,
		right:0	
	};
	
	var width = 220
	var height = 10 + margin.top  + margin.bottom;

	svg = d3.select("#legend")
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
		.attr("stroke", "grey");
  

};


