<template>
  <v-flex lg9 offset-lg1>
	<svg id="legend" style="margin-left:375px" />
	<svg
			id="steakScaleRegions"
			width="960"
			height="600"
			style="margin-top:-60px"
			stroke-linejoin="round"
			stroke-linecap="round"
		/>
  </v-flex>
</template>

<script>
import * as d3 from "d3";
import SteakGeochart from "../js/steak-geo-chart.js";

/* global d3  */
export default {
  props: ['us','data', 'steakScale'],
  methods: {
	  SteakGeochart
  },
  computed: {
  },
  mounted() {
    SteakGeochart(this.us, this.data, this.steakScale)
	  
  },

  data() {
    return {
    };
  }


};
</script>

<style scoped>
/* pertains to the bar charts */
.bar {
    fill: #607C9A;
}

.axis {
    font-size: 13px;
}

.axis path, .axis line {
    fill: none;
    display: none;
}

.label {
    fill: #fff;
    font-size: 13px;
}


div.tooltip {	
    position: absolute;			
    text-align: center;			
    width: 190px;					
    height: 54px;					
    padding: 2px;			
    font: 14px sans-serif;		
    border: 0px;		
    border-radius: 1px;			
    pointer-events: none;
    background: #E0DEDE;
}
  

/* below pertains to the geochart*/
path:hover {
	fill-opacity: .8;
}

.state {
  fill: #ccc;
}

.state-boundary {
  fill: none;
  stroke: #fff;
}

.regionTitle {
  text-anchor: middle;
  font-family: arial;
  font-weight: bold;
}

/* below pertains to the line chart */
path { 
    stroke-width: 1;
    fill: none;
} 

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}

.grid .tick {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
}
.grid path {
    stroke-width: 0;
}

</style>

