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
      <the-cousins-portfolio/>
    </v-content>
  </v-app>
</template>

<script>
import TheCousinsPortfolio from './components/TheCousinsPortfolio'

export default {
  name: 'App',
  components: {
    TheCousinsPortfolio
  },
  data () {
    return {
      //
    }
  }
}
</script>
