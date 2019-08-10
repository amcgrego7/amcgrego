
import Vue from 'vue'
import store from "./store"

// Support for IE
import 'babel-polyfill';

// Axios for REST APIs
import axios from 'axios'
import VueAxios from 'vue-axios'


// Vuetify for UI components and styling
import './plugins/vuetify'
import Vuetify from 'vuetify'

import App from './App.vue'
import router from './router'

Vue.use(VueAxios, axios, Vuetify)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
