<template>
    <div :id="chartID" class="chart"></div>
</template>

<script>
import * as d3 from "d3";
import SteakBarChart from "../js/steak-bar-chart.js";

/* global d3  */
export default {
  props: ['data', 'steakScale', 'chartID'],
  methods: {
	  SteakBarChart
  },
  computed: {
  },
  mounted() {
    SteakBarChart(this.data, this.charts[this.chartID])
  },

  data() {
    return {
      charts : {
        consumerByIncome : {
          title: "Household Income",
          target: "hhIncome",
          categories: ["$150,000+", "$100,000 - $149,999", "$50,000 - $99,999", "$25,000 - $49,999", "$0 - $24,999"],
          tooltips: ["who make $150,000+", "who make $100,000 - $149,999", "who make $50,000 - $99,999", "who make $25,000 - $49,999", "who make $0 - $24,999"],
          htmlID: "consumerByIncome"
        }, 
        consumerByEducation : {
          title: "Education",
          target: "education",
          categories: ["Graduate degree", "Bachelor degree", "Some college or Associate degree", "High school degree", "Less than high school degree"],
          tooltips: ["with a graduate degree", "with a bachelor degree", "with some college or an associate degree", "with a high school degree", "with less than a high school degree"],			
          htmlID: "consumerByEducation"
        }
      }
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

