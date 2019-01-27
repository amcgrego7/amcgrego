<template>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.stop="updateStoreDrawer(!drawer)"></v-toolbar-side-icon>

      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">THE</span>
        <span>COUSINS</span>
        <span class="font-weight-light">PORTFOLIO</span>
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