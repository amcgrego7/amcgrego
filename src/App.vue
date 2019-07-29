<template>
  <v-app>

    <nav-header/>

    <nav-sidebar/>
    
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>

import NavHeader from "./components/NavHeader"
import NavSidebar from "./components/NavSidebar"

export default {
  name: "App",
  components: {
    NavHeader,
    NavSidebar
  },
  data() {
    return {}
  }
};
</script>
