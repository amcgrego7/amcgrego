<template>
  <v-toolbar app clipped-left height="58px">
    <v-toolbar-side-icon @click.stop="updateStoreDrawer(!drawer)"></v-toolbar-side-icon>

    <v-toolbar-title>
      <router-link to="home">
        <span class="font-weight-light">ANDREW</span>
        <span>MCGREGOR</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link to="/about">
        <v-list-tile-avatar class="mt-2">
          <img src="../assets/headshot-water.jpg" />
        </v-list-tile-avatar>
      </router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      drawer: "drawer"
    })
  },
  data() {
    return {};
  },
  created() {
    const screenSize = ["md", "lg", "xl"];
    this.updateStoreDrawer(screenSize.includes(this.$vuetify.breakpoint.name));
  },
  methods: {
    ...mapMutations(["updateDrawer"]),
    updateStoreDrawer(boolean) {
      this.updateDrawer(boolean);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

</style>