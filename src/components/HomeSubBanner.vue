<template>
  <v-img
    :src="getPic(tile.img)"
    height="100%"
    gradient="rgba(0, 0, 0, .1), rgba(0, 0, 0, .9)"
  >
    <v-layout v-if="!tile.prominent" fill-height wrap text-xs-right ma-0>
      <v-flex xs12>

        <v-chip
          label
          class="my-1 text-uppercase title"
          color="grey darken-1"
          text-color="white"
          medium
          @click.stop
        >
          {{ tile.title }}
        </v-chip>
        <br>
        <v-chip
          label
          class="my-0"
          color="grey darken-1"
          text-color="white"
          small
          @click.stop
        >{{ tile.desc }}
      
        </v-chip>
      </v-flex>
      <v-flex align-self-end>
        <!-- <v-chip class="text-uppercase ma-0" color="primary" label small @click.stop>View</v-chip> -->

        <router-link :to="tile.path">
          <v-btn color="primary" depressed small>View</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
  </v-img>
</template>

<script>
export default {
  props: {
    tile: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
  },
  methods: {
    getPic(path) {
        return require('../assets/' + path);
    }
  }
};
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}

</style>