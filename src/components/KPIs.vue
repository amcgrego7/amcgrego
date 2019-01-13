<template>
  <v-flex xs6 md3 pa-3>
    <v-card color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title class="pl-1 pr-1">
        <v-flex>
          <p class="headline text-xs-center ma-1"
            v-bind:class="dynamicheadline">{{ name }}</p>
          <v-divider></v-divider>
          <p
            class="headline text-xs-center ma-1"
            v-bind:class="[kpiColor, dynamicheadline]"
          >{{ value > 0 ? "$ " + value.toFixed(2) : "($ " + Math.abs(value).toFixed(2) + ")" }}</p>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["name", "value", "color", "screensize"],
  methods: {},

  computed: {
    // Applies color to value if color prop is true
    kpiColor() {
      let colorClass = "";

      if (this.color) {
        colorClass = this.value >= 0 ? "green--text" : "red--text";
      }

      return colorClass;
    }, 
    dynamicheadline() {
      switch(this.screensize) {
        case("xs"): return "smaller-headline"
      }
    }
  },

  data() {
    return {};
  }
};
</script>

<style scoped>
.smaller-headline {
  font-size: 16px !important; /* Find a way to make this less forced */
}
</style>

