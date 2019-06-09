<template>
  <v-img
    :src="getPic(tile.img)"
    height="100%"
    gradient="rgba(0, 0, 0, .4), rgba(0, 0, 0, .9)"
  >
    <v-layout v-if="!tile.prominent" fill-height wrap text-xs-right ma-0>
      <v-flex xs12>
        <v-chip
          label
          class="mx-0 mb-2 text-uppercase"
          color="grey darken-3"
          text-color="white"
          small
          @click.stop
        >{{ tile.desc }}</v-chip>
        <h3 class="title font-weight-bold mb-2">{{ tile.title }}</h3>
        <div class="caption">
          {{ tile.date }}
        </div>
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