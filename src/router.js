import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/cousins-portfolio',
      name: 'cousins-portfolio',
      component: () => import(/* webpackChunkName: "about" */ './views/Portfolio.vue')
    },
    {
      path: '/optimization',
      name: 'optimization',
      component: () => import(/* webpackChunkName: "about" */ './views/Optimization.vue')
    },
    {
      path: '/steak-analysis',
      name: 'steak-analysis',
      component: () => import(/* webpackChunkName: "about" */ './views/SteakAnalysis.vue')
    },
    {
      path: '/animal-classifier',
      name: 'animal-classifer',
      component: () => import(/* webpackChunkName: "about" */ './views/AnimalClassifier.vue'),
    }
  ]
})
