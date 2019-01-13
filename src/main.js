
import Vue from 'vue'
import store from "./store"

// Axios for REST APIs
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuetify for UI components and styling
import './plugins/vuetify'
import Vuetify from 'vuetify'

import App from './App.vue'

Vue.use(VueAxios, axios, Vuetify)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
