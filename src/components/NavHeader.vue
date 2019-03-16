<template>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.stop="updateStoreDrawer(!drawer)"></v-toolbar-side-icon>

      <v-toolbar-title class="headline">
        <span class="font-weight-light">ANDREW</span>
        <span>MCGREGOR</span>
      </v-toolbar-title>
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