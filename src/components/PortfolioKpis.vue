<template>
  <v-flex xs6 md3 pa-3>
    <v-card :ref="name">
      <v-card-title primary-title class="pl-1 pr-1">
        <v-flex>
          <p class="headline text-xs-center ma-1"
            v-bind:class="dynamicheadline">{{ name }}</p>
          <v-divider></v-divider>
          <p
            class="headline text-xs-center ma-1"
            v-bind:class="[kpiColor, dynamicheadline]"
          >{{ tweenedNumber > 0 ? "$ " + tweenedNumber.toFixed(2) : "($ " + Math.abs(tweenedNumber).toFixed(2) + ")" }}</p>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import { TweenLite } from 'gsap'

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
      let headClass = "";
      switch(this.screensize) {
        case("xs"): 
        headClass = "smaller-headline"
      }
      return headClass;
    }
  },

  data() {
    return {
      tweenedNumber : 0,
      // tweenLite : new tweenLite(0)
    };
  },

  watch: {
    value:  {
      immediate: true,
      handler : function(newValue) { TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue })},
    }
  }

};
</script>

<style scoped>
.smaller-headline {
  font-size: 16px !important; /* Find a way to make this less forced */
}
</style>

