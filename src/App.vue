<template>
  <v-app dark
>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">THE</span>
        <span>COUSINS</span>
        <span class="font-weight-light">PORTFOLIO</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <portfolio-cards/>
    </v-content>
  </v-app>
</template>

<script>
import PortfolioCards from './components/PortfolioCards'

export default {
  name: 'App',
  components: {
    PortfolioCards
  },
  data () {
    return {
      //
    }
  }
}
</script>
