<template>
  <v-container grid-list-lg>
    <v-layout justify-center wrap>
      <v-flex xs12 md6 lg3>
        <v-img
          :src="require('../assets/headshot-water.jpg')"
          style="border-radius:3px"
          aspect-ratio="1"
          max-height="400"
          max-width="400"
        ></v-img>
      </v-flex>
      <v-flex xs12 md6 lg9>
        <h1 mr-3 class="headline text-uppercase">
          About me
          <a
            href="https://www.linkedin.com/in/andrew-mcgregor-a5506934/"
            style="text-decoration:none"
            target="_blank"
          >
<i class="fab fa-linkedin pl-2">
  
  </i>          </a>
          <a href="mailto:andrew.mcgregor@cnu.edu" style="text-decoration:none" target="_blank">
<i class="far fa-envelope pl-2"></i>
          </a>
        </h1>
        <v-divider/>
        <p class="pt-3">
        I am an Analytics and Insights Director at Procter & Gamble. I lead the design and execution of our data strategy for our P&G team with the goal of enabling market growth for our retail partners.
        </p>
        <p mt-3>I began building this website in 2018 knowing it would encourage me to dive into the latest trends in web-development and analytics. A result of hobby projects, personal development, and on the job training, I've become comfortable with...
        </p>
        <p>
        <ul>
          <li>Web-development: Node.js, JavaScript, Vue.js, d3.js, Python and Databricks </li>
          <li>Machine Learning: TensorFlow, SciKit Learn, Reinforcement Learning and Optimization</li>
          <li>Data Analytics: Tableau, PowerBI, SQL and Excel</li>
        </ul>
        </p>
      </v-flex>

      <v-flex xs12>
          <h1 class="headline text-uppercase">A Brief History</h1>
          <aboutTimeline/>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

import aboutTimeline from '../components/AboutTimeline'

export default {
  components: {
    aboutTimeline
  }
}
</script>


<style>
body {
  font-size: larger;
}
</style>
