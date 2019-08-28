<template>
  <v-img
    class="grey lighten-2"
    height="400"
    width="100%"
    gradient="to top right, rgb(245,245,245, .7), rgb(0,0,0, .1)"
    :src="require('@/assets/switzerland-compressed.jpg')"
    loading="lazy"
  >
    <v-layout fill-height align-center pa-3>
      <v-flex xs12 md7 offset-md1>
        <h1 class="display-3 font-weight-bold">Andrew McGregor</h1>
        <v-flex xs12 md6 lg12 class="subheading font-weight-bold text-uppercase pl-2 mb-4">Data Analyst and Web Developer</v-flex>

        <router-link to="./about">
          <v-btn color="primary" depressed round>About me</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
  </v-img>
</template>
        