<template>
  <v-container>
    <v-layout wrap>
      <div v-if="['lg', 'xl'].includes(screensize)" id="wrap"></div>

      <h1>Pack that car!</h1>
      <v-spacer></v-spacer>
      <v-flex style="display:none">
        <v-chip xs2 small color="info" text-color="white" class="font-weight-bold">App</v-chip>
        <v-chip
          xs2
          small
          color="blue-grey darken-3"
          text-color="white"
          class="font-weight-bold"
        >Tutorial</v-chip>
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
      <v-btn xs4 @click="beginAlgorithm" color="info">Run</v-btn>
      <v-btn
        xs4
        @click="beginAlgorithm"
        color="default"
        v-on:click="showSettings = !showSettings"
      >Settings</v-btn>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">{{ 'Wow, $' + totalValue + '!'}}</v-card-title>

          <v-card-text>
            The solution uses
            <span class="subtitle-1 font-weight-bold">{{ totalSpace }}</span>
            units of space and has a total value of
            <span
              class="subtitle-1 font-weight-bold"
            >{{ '$' + totalValue }}</span>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn secondary text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-alert 
        v-if="totalSpace && totalValue"
        :value="true"
        type="info"
        outline
      >
        The solution uses
        <span class="title font-weight-bold">{{ animatedSpace }}</span>
        units of space and has a total value of
        <span
          class="title font-weight-bold"
        >{{ '$' + animatedValue }}</span>
      </v-alert>

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
      <v-flex xs4 sm3 md2 mt-2 mb-2 v-for="input in inputs" style="text-align:center">
        <div>
          <b>{{input.item}}</b>
        </div>
        <div>Value: ${{input.value}}</div>
        <div>Size: {{input.size}}</div>
        <div class="mt-2">
          <v-icon
            :color="input.active ? 'teal accent-4' : 'blue-grey darken-3'"
            size="50"
          >{{input.icon}}</v-icon>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import stockCard from "../components/PortfolioStockCard";
import algorithm from "../js/optimization";
import { TweenLite } from "gsap";

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

      this.totalValue = output[this.inputs.length];
      this.totalSpace = output[this.inputs.length + 1];

      // Iterate through it to highlight items selected
      output.forEach((d, i) => {
        if (i < this.inputs.length) {
          if (d === 1) {
            this.inputs[i].active = true;
          } else {
            this.inputs[i].active = false;
          }
        }
      });

      if (this.dialogFlag) {
        this.dialog = true;
        this.dialogFlag = false;
      }

      // alert(output);
    }
  },
  computed: {
    animatedSpace: function() {
      return this.tweenedSpace.toFixed(0);
    },
    animatedValue: function() {
      return this.tweenedValue.toFixed(0);
    },
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
      dialogFlag: true,
      dialog: false,
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
      space: 20,
      totalSpace: null,
      totalValue: null,
      tweenedSpace: 0,
      tweenedValue: 0
    };
  },
  watch: {
    totalSpace: {
      deep: true,
      handler: function(newValue) {
        TweenLite.to(this.$data, 0.25, { tweenedSpace: newValue });
      }
    },
    totalValue: {
      deep: true,
      handler: function(newValue) {
        TweenLite.to(this.$data, 0.5, { tweenedValue: newValue });
      }
    }
  }
};
</script>

<style lang="css">
.active {
  color: green;
}

#wrap:after {
  content: "\f1b9";
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  position: absolute;
  font-size: 400px;
  color: rgba(51, 122, 183, 0.08);
  top: 50%;
  left: 50%;
  margin: -425px 0px 0 125px;
  z-index: 0;
}
</style>
