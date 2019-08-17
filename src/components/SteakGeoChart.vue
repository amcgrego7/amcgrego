<template>
  <v-flex>
	<svg class="mb-0" id="legend"/>
  <div id="steakScaleRegions" width="100%"></div>
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
