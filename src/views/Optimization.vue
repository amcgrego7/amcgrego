<template>
  <v-container>
    <v-layout wrap>
      <v-flex>
        <h1 xs12 md6>
          Pack that car!
          <v-chip small color="primary">App</v-chip>
          <v-chip small color="grey">Tutorial</v-chip>
        </h1>
      </v-flex>

      <v-flex>
        <p class="subheading">
          This is a genetic algorithm developed in JavaScript. Here's the scenario, imagine you are going on a trip, but you have a limited amount of space available in your car. Your goal is to bring with you the combination of items that offer the
          <i>greatest</i> total value. To use this application, play with the algorithm parameters and then click "Run." The highlighted items are what you should bring on your upcoming trip!
      </p>
      </v-flex>
      
     
        <v-flex xs5 sm3 md3 lg2 mr-2>
          <v-text-field
            type="number"
            centered
            label="Specify space available"
            v-model="space"
            :min="minInputs"
            :max="sumInputs"
            :hint="'The car has room for '+ space + ' units'"
            persistent-hint
          ></v-text-field>
        </v-flex>
        <v-btn xs4 @click="beginAlgorithm" color="primary">Run</v-btn>
        <v-btn xs4
          @click="beginAlgorithm"
          color="secondary"
          v-on:click="showSettings = !showSettings"
        >Settings
        </v-btn>



      <v-flex xs12 v-if="showSettings">
        <v-flex mt-4 lg8>
          <v-slider
            v-model="mutationRate"
            label="Mutation Rate"
            min="0"
            max="100"
            step="10"
            thumb-label="always"
            messages="A higher mutation rate introduces more randomness"
          ></v-slider>
        </v-flex>
        <v-flex mt-4 lg8>
          <v-slider
            v-model="chromosomes"
            label="Chromosomes"
            min="2"
            max="5"
            thumb-label="always"
            messages="Keeping more chromosomes after crossover introduces variation"
          ></v-slider>
        </v-flex>
        <v-flex mt-4 lg8>
          <v-slider
            v-model="generations"
            label="Generations"
            min="2000"
            max="10000"
            thumb-label="always"
            messages="More generations will take more time, but lead to better results"
          ></v-slider>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout wrap mt-4>
        <v-flex xs3 md2 mt-2 mb-2 v-for="input in inputs" style="text-align:center">
          <div>
            <b>{{input.item}}</b>
          </div>
          <div>Value: ${{input.value}}</div>
          <div>Size: {{input.size}}</div>
          <div class="mt-2">
            <v-icon :color="input.active ? 'teal accent-4' : 'blue-grey darken-4'" size="50">{{input.icon}}</v-icon>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
// import stockCard from "../components/PortfolioStockCard";
import algorithm from "../js/optimization";

export default {
  components: {},
  methods: {
    beginAlgorithm() {
      const output = algorithm({
        inputs: this.inputs,
        mutationRate: this.mutationRate / 100,
        chromosomes: this.chromosomes,
        generations: this.generations,
        space: this.space
      });

      output.forEach((d, i) => {
        if(i < this.inputs.length) {
          if (d === 1) {
            this.inputs[i].active = true; 
         } else {
           this.inputs[i].active = false; 
         }
        }
      });

      // alert(output);
    }
  },
  computed: {
    screensize() {
      return this.$vuetify.breakpoint.name;
    },
    minInputs() {
      const inputs = this.inputs.map(d => d.size);
      return Math.min(...inputs);
    },
    sumInputs() {
      const inputs = this.inputs.map(d => d.size);
      return inputs.reduce((a, b) => a + b, 0);
    }
  },
  data() {
    return {
      showSettings: false,
      inputs: [
        {
          item: "Textbook",
          icon: "fas fa-book",
          size: 3,
          value: 42,
          active: false
        },
        {
          item: "Bicycle",
          icon: "fa-bicycle",
          size: 11,
          value: 99,
          active: false
        },

        {
          item: "Soccer Ball",
          icon: "fa-futbol",
          size: 4,
          value: 36,
          active: false
        },

        {
          item: "Bed",
          icon: "fa-bed",
          size: 18,
          value: 210,
          active: false
        },

        {
          item: "Binoculars",
          icon: "fa-binoculars",
          size: 5,
          value: 65,
          active: false
        },

        {
          item: "Healthkit",
          icon: "fa-medkit",
          size: 8,
          value: 89,
          active: false
        },

        {
          item: "Briefcase",
          icon: "fa-briefcase",
          size: 8,
          value: 79,
          active: false
        },

        {
          item: "Phone",
          icon: "fa-phone",
          size: 5,
          value: 116,
          active: false
        },

        {
          item: "Desktop",
          icon: "fa-desktop",
          size: 10,
          value: 224,
          active: false
        },

        {
          item: "Trophy",
          icon: "fa-trophy",
          size: 1,
          value: 5,
          active: false
        }
      ],
      mutationRate: 50,
      chromosomes: 3,
      generations: 5000,
      space: 20
    };
  }
};
</script>

<style lang="css">
.active {
  color : green;
}
</style>
