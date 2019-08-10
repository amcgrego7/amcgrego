

/* global d3 */
export default (data, steakScale) => {

	// loop through each chart object to create identical charts
	var startLen = data.length;
	var endLen = 0;
	var ages = ['18-29', '30-44','45-60', '> 60'];
	var males = [];
	var females = [];

	// excude empty steak preference and age
	data = data.filter(function (el) {
		return el.steakPreference != "" &&
			el.age != "";
	})

	// update with new length so we can report number of samples that we're excluded
	endLen = data.length;

	// put the array of gender --> age --> steak preferences in the order that they should appear
	var summary = d3.nest()
	.key(function (d) { return d.gender; })	
	.key(function (d) { return d.age; }).sortKeys(function (a, b) { return ages.indexOf(a) - ages.indexOf(b); })
	.key(function (d) { return d.steakPreference; })
	.rollup(function (v) { return v.length; })
	.map(data);

	// using the grouped data, get percentage of steakConsumers per each gender and age
	const genders = ['Male', 'Female']

	for (let x = 0; x < genders.length; x++) {

		for (let e=0; e<ages.length; e++) {

			var sum = 0;
			var count = 0;	
			var target = summary[genders[x]][ages[e]];
	
			for (var k in target) {
				if (target.hasOwnProperty(k)) {
					sum += steakScale[k] * target[k]
					count += target[k]
				}								
			}	

			// push male data to array
			if (x === 0) {
				males.push ({
					age : ages[e],
					score : sum / count,
					gender : "Males"

				})
			}

			// push female data to array
			if (x === 1) {
				females.push ({
					age : ages[e],
					score : sum / count,
					gender : "Females"
				})
			}
		}
	}

	// Set the dimensions of the canvas / graph
	var margin = {top: 15, right: 20, bottom: 40, left: 28},
	width = 220 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;

	// Set the ranges
	var x = d3.scale.ordinal()
		.domain(ages)
		.rangePoints([0, width]);

	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(4);

	var yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

	// Define the div for the tooltip
	var div = d3.select("body").append("div")	
	.attr("class", "tooltip")				
	.style("opacity", 0);

	// Define the line
	var valueline = d3.svg.line()
	.x(function(d) { return x(d.age); })
	.y(function(d) { return y(d.score); });

	// Adds the svg canvas
	var svg = d3.select("#genderAgePreferences")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", 
			"translate(" + margin.left + "," + margin.top + ")");

	function make_y_axis() {		
		return d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5)
	}		
	var lineData = [males, females]
	var colors = ["#607C9A", "#aa007f"]

	for (let e=0; e<lineData.length; e++) {
		
		var data = lineData[e];

		// Scale the range of the data
		x.domain(data.map(function(d) { return d.age; }));
		y.domain([2.25, 3.75]);


		// Add Y Axis gridlines
		svg.append("g")			
		.attr("class", "grid")
		.call(make_y_axis()
			.tickSize(-width, 0, 0)
			.tickFormat("")
		)

		// Add the valueline path.
		svg.append("path")
			.attr("class", "line")
			.style("stroke", colors[e])
			.style("stroke-width", "3px")
			.attr("d", valueline(data));

		svg.selectAll("dot")
			.data(data)
		.enter().append("circle")
			.attr("r", 5.5)
			.style("fill", colors[e])
			.attr("cx", function(d) { return x(d.age); })
			.attr("cy", function(d) { return y(d.score); })
			.on("mouseover", function(d) {		
				div.transition()
					.duration(200)		
					.style("fill", "#fff")
					.style("opacity", .9);		
				div	.html(d.gender +" ages <b>" + d.age+ " </b>"  + "prefer their steak at <b>" + (d.score).toFixed(2) + "</b> on the steak scale" )	
					.style("left", (d3.event.pageX) + "px")		
					.style("top", (d3.event.pageY - 28) + "px");	
				})
			.on("mouseout", function(d) {		
				div.transition()		
					.duration(500)		
					.style("opacity", 0);	
			});

		// Add the X Axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height-30) + ")")
			.call(xAxis);

		// Add the X Axis Secondary label
		svg.append("text")
			.attr("x", (width)/3.5)
			.attr("y", height + (margin.bottom-30))
			.style("font-size", "12px")
			.text("Age Group");

		// Add the Y Axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		// Add the title
		svg.append("text")
		.attr("x", (width)/6)
		.attr("y", 10)
		.style("font-size", "16px")
		.text("Steak Preference");
		
	}

};


