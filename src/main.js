
import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './plugins/vuetify'
import Vuetify from 'vuetify'

import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

import App from './App.vue'

Vue.use(VueAxios, axios, Vuetify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
