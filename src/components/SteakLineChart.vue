<template>
  <v-flex>
     <div id="genderAgePreferences" style="padding-top:0px"></div>
  </v-flex>
</template>

<script>
import * as d3 from "d3";
import SteakLineChart from "../js/steak-line-chart.js";

/* global d3  */
export default {
  props: ['data', 'steakScale'],
  methods: {
	  SteakLineChart
  },
  computed: {
  },
  mounted() {
    SteakLineChart(this.data, this.steakScale)
  },

  data() {
    return {
    };
  }


};
</script>
