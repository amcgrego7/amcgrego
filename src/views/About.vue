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
            <v-icon right large>account_box</v-icon>
          </a>
          <a href="mailto:andrew.mcgregor@cnu.edu" style="text-decoration:none" target="_blank">
            <v-icon right large>mail</v-icon>
          </a>
        </h1>
        <v-divider/>
        <p
        >I am a business analytics consultant at Booz Allen Hamilton. I love tackling data wrangling challenges and building web applications!</p>
        <p
          mt-3
        >I began building this website knowing it would encourage me to dive into the latest trends in web-development and analytics. A result of hobby projects, personal development, and on the job training, I've become comfortable with...
        </p>
        <p>
        <ul>
          <li>Web-development: Node.js, JavaScript, Vue.js, d3.js, Python, Django and Bootstrap </li>
          <li>Machine Learning: TensorFlow, SciKit Learn, Reinforcement Learning and Optimization</li>
          <li>Data Analytics: Tableau, PostgreSQL, Excel and Access</li>
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
