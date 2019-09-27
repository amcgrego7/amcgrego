<template>
  <v-flex fill-height pa-0 elevation-3>
    <router-link :to="tile.path">
      <v-hover>
        <v-img
          :src="getPic(tile.img)"
          loading="lazy"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 16 : 2}`"
          height="200"
          gradient="rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)"
        >
          <v-layout v-if="!tile.prominent" fill-height wrap ma-0>
            <v-flex xs12>
              <v-chip
                label
                class="my-1 text-uppercase title"
                color="rgba(0, 0, 0, .7)"
                text-color="white"
                medium
                @click.stop
              >{{ tile.title }}</v-chip>
              <br />
              <v-chip
                label
                class="my-0"
                color="rgba(0, 0, 0, .7)"
                text-color="white"
                small
                @click.stop
              >{{ tile.desc }}</v-chip>
            </v-flex>
          </v-layout>
        </v-img>
      </v-hover>
    </router-link>
  </v-flex>
</template>

<script>
export default {
  props: {
    tile: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      hover : true
    };
  },
  computed: {},
  methods: {
    getPic(path) {
      return require("../assets/" + path);
    }
  }
};
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
a {
  text-decoration: none;
}
</style>