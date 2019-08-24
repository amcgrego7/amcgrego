<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 style="font-weight:600;margin-top:0px">Americans and Steak</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm12 lg4>
        <h2>Who eats steak?</h2>

        <p class="pr-4">
          A recent
          <a href="https://github.com/fivethirtyeight/data/tree/master/steak-survey">survey</a> provides a taste of how
          Americans prefer to eat steak. The bar charts of individuals who eat steak grouped by income and education indicate some interesting
          trends, while viewing regional preferences for the doneness tells us who likes their meat moo-ing!
        </p>
      </v-flex>

      <v-flex xs12 sm6 lg4>
        <steak-bar-chart v-if="steakData.length" :data="steakData" chartID="consumerByIncome"></steak-bar-chart>
      </v-flex>

      <v-flex xs12 sm6 lg4>
        <steak-bar-chart v-if="steakData.length" :data="steakData" chartID="consumerByEducation"></steak-bar-chart>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-flex>
          <h3 style="margin-top:0px">Steak scale</h3>
          <p style="padding-right:40px">
            The steak scale is for analyzing the doneness of steak, from
            <b>rare (1) to well done (5)</b>. In the map, view
            regional preferences for steak doneness. In the line chart, we can compare age groups and how
            <span
              style="color:#607C9A; font-weight:bold"
            >males</span> and
            <span style="color:#aa007f; font-weight:bold">females</span> prefer to have their steak cooked.
          </p>
        </v-flex>
        <v-flex>
          <steak-line-chart
            v-if="steakData.length"
            :data="steakData"
            :steakScale="steakScale"
            style="text-align:center"
          ></steak-line-chart>
        </v-flex>
      </v-flex>

      <v-flex xs12 sm9>
        <steak-geo-chart
          class="pt-4 ml-0 mt-0"
          style="text-align:center"
          v-if="steakData.length && us"
          xs9
          :us="us"
          :data="steakData"
          :steakScale="steakScale"
        ></steak-geo-chart>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import algorithm from "../js/optimization";
import * as d3 from "d3";
import steakGeoChart from "../components/SteakGeoChart.vue";
import steakLineChart from "../components/SteakLineChart.vue";
import steakBarChart from "../components/SteakBarChart.vue";
import us from "../assets/us-states.json";

export default {
  components: {
    steakGeoChart,
    steakLineChart,
    steakBarChart
  },
  created() {
    this.$ga.page('/steak-analysis')

    // d3.json("https://d3js.org/us-10m.v1.json").then(map => {
    // d3.json("https://bl.ocks.org/mbostock/raw/4090846/us.json").then(map => {
    //   this.us = map;
    // });

    const vm = this;
    let idx = 0;
    d3.csv(
      "https://raw.githubusercontent.com/fivethirtyeight/data/master/steak-survey/steak-risk-survey.csv",
      function(row) {
        const rowRenamed = vm.renameProperties(row);
        idx += 1;
        // first row is junk
        if (idx > 1) {
          vm.steakData.push(rowRenamed);
        }
      }
    );
  },
  methods: {
    renameProperties(row) {
      // contains the new column names
      var colNames = [
        "respondent",
        "lotteryRisk",
        "cigarettes",
        "alcohol",
        "gamble",
        "skydive",
        "speeder",
        "cheater",
        "steakConsumer",
        "steakPreference",
        "gender",
        "age",
        "hhIncome",
        "education",
        "region"
      ];

      // get the number of keys in the object
      var len = Object.keys(row).length;

      // iterate from the last position to the first since we will be deleteing properties
      for (let x = len - 1; x > -1; x--) {
        // define original and new property names
        let origProp = Object.keys(row)[x];
        let newProp = colNames[x];

        // set value of the new property to the value of the original
        row[newProp] = row[origProp];

        // delete original property from the object
        delete row[origProp];
      }

      return row;
    }
  },
  computed: {},
  data() {
    return {
      us,
      steakData: [],
      steakScale: {
        Well: 5,
        "Medium Well": 4,
        Medium: 3,
        "Medium rare": 2,
        Rare: 1
      }
    };
  }
};
</script>

<style>
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
  background: #e0dede;
}

/* pertains to the bar charts */
.bar {
  fill: #607c9a;
}

.bar:hover {
  opacity: 0.8;
}

.axis {
  font-size: 13px;
}

.axis path,
.axis line {
  fill: none;
  display: none;
}

.label {
  fill: #fff;
  font-size: 13px;
}

/* below pertains to the geochart*/
path:hover {
  fill-opacity: 0.8;
}

.regionTitle {
  text-anchor: middle;
  font-family: arial;
  font-weight: bold;
}

.state-boundary {
  fill: none;
  stroke: #fff;
}

.state.selected-boundary {
  fill: none;
  stroke: #fff;
  stroke-width: 2px;
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

.states {
  fill: #aaa;
  stroke: #fff;
  stroke-width: 0.75px;
}
</style>
