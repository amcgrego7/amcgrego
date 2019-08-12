<template>
  <div :id="chartID" class="chart"></div>
</template>

<script>
import * as d3 from "d3";
import SteakBarChart from "../js/steak-bar-chart.js";

/* global d3  */
export default {
  props: ["data", "steakScale", "chartID"],
  methods: {
    SteakBarChart
  },
  computed: {},
  mounted() {
    SteakBarChart(this.data, this.charts[this.chartID]);
  },

  data() {
    return {
      charts: {
        consumerByIncome: {
          title: "Household Income",
          subtitle: "% of steak consumers by income",
          target: "hhIncome",
          categories: [
            "$150,000+",
            "$100,000 - $149,999",
            "$50,000 - $99,999",
            "$25,000 - $49,999",
            "$0 - $24,999"
          ],
          tooltips: [
            "who make $150,000+",
            "who make $100,000 - $149,999",
            "who make $50,000 - $99,999",
            "who make $25,000 - $49,999",
            "who make $0 - $24,999"
          ],
          htmlID: "consumerByIncome"
        },
        consumerByEducation: {
          title: "Education",
          subtitle: "% of steak consumers by education",
          target: "education",
          categories: [
            "Graduate degree",
            "Bachelor degree",
            "Some college or Associate degree",
            "High school degree",
            "Less than high school degree"
          ],
          tooltips: [
            "with a graduate degree",
            "with a bachelor degree",
            "with some college or an associate degree",
            "with a high school degree",
            "with less than a high school degree"
          ],
          htmlID: "consumerByEducation"
        }
      }
    };
  }
};
</script>