<template>
  <v-navigation-drawer 
  mini-variant
  v-model="drawer"
  @update:mini-variant="false"
  fixed clipped app>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar @click.stop="mini = true">
          <router-link to="/about">
            <v-list-tile-avatar>
              <img src="../assets/headshot-water.jpg">
            </v-list-tile-avatar>
            <v-list-tile-action></v-list-tile-action>
          </router-link>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click.stop="mini = true">
        <v-list-tile-action>
          <router-link :to="item.path">
            <v-tooltip right :disabled="isMobile">
              <span>{{item.desc}}</span>
              <v-icon pt-4 large slot="activator">{{ item.icon }}</v-icon>
            </v-tooltip>
          </router-link>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>


export default {
  computed: {

      // Show and hide the sidenav via drawer state in vuex
      drawer : {
        get() {
          return this.$store.state.drawer
        },
        set(boolean) {
          this.$store.commit('updateDrawer', boolean)
        }
      }  
  },

  data() {
    return {
      isMobile: ["xs", "sm"].includes(this.$vuetify.breakpoint.name), // TODO: Don't use size, use device type
      items: [
        { path: "home", icon: "home", desc: "Home" },
        {
          path: "cousins-portfolio",
          icon: "trending_up",
          desc: "A family venture in stock investing"
        }
      ],
      mini: true
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
