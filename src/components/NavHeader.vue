<template>
    <v-toolbar app clipped-left>
      
      <v-toolbar-side-icon @click.stop="updateStoreDrawer(!drawer)"></v-toolbar-side-icon>

      <router-link to='home'>
        <v-toolbar-title class="headline">
          <span class="font-weight-light">ANDREW</span>
          <span>MCGREGOR</span>
        </v-toolbar-title>
      </router-link>
    </v-toolbar>

</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      drawer : 'drawer'
    })
  },
  data() {
    return {
    }
  },
  created() {
    const screenSize = ['md', 'lg', 'xl']
    this.updateStoreDrawer(screenSize.includes(this.$vuetify.breakpoint.name))  
  },
  methods: {
    ...mapMutations([
      'updateDrawer'
    ]),
    updateStoreDrawer(boolean) {
      this.updateDrawer(boolean)
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