<template>
  <v-container grid-list-lg>
    <v-layout justify-left wrap>
      <v-flex xs12>
        <home-main-banner />
      </v-flex>

      <v-flex xs12>
        <h2 class="display-1 font-weight-light">
          I bring
          data analytics and machine learning into usable web applications
        </h2>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="(tile, index) in tiles" :key="index">
        <home-sub-banner :tile="tile" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import homeMainBanner from "../components/HomeMainBanner";
import homeSubBanner from "../components/HomeSubBanner";

export default {
  name: "home",
  computed: {
    ...mapGetters(["tiles"])
  },
  components: {
    homeMainBanner,
    homeSubBanner
  }
};
</script>
