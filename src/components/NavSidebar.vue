<template>
  <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" fixed clipped app>
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
              <v-icon slot="activator">{{ item.icon }}</v-icon>
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
  data() {
    return {
      isMobile: ["xs", "sm"].includes(this.$vuetify.breakpoint.name), // TODO: Don't use size, use device type
      drawer: true,
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