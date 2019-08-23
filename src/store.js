import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  
  drawer : false,
  apps: [
    {
      includeAsTile: true,
      date: new Date('2019/01/02').toDateString(),
      path: 'cousins-portfolio',
      icon: 'trending_up',
      desc: 'A family venture in stock investing',
      title: 'The Cousins Portfolio',
      img: 'cousins-portfolio-thumbnail.png'
    },
    {
      includeAsTile: true,
      date: new Date('2019/07/28').toDateString(),
      path: 'optimization',
      icon: 'time_to_leave',
      desc: 'An evolutionary algorithm in JavaScript',
      title: 'Optimization',
      img: 'optimization-thumbnail.png'
    },
    {
      includeAsTile: true,
      date: new Date('2019/08/11').toDateString(),
      path: 'steak-analysis',
      icon: 'restaurant_menu',
      desc: "A dashboard about Americans and steak",
      title: 'Steak Analysis',
      img: 'steak-analysis-thumbnail.png'
    },
    // {
    //   includeAsTile: false,
    //   date: new Date('2019/08/28').toDateString(),
    //   path: 'animal-classifier',
    //   icon: 'videocam',
    //   desc: "Identifying animals in a video",
    //   title: 'Animal Classifier',
    //   img: 'steak-analysis-thumbnail.png'
    // }
  ]
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  updateDrawer(state, boolean) {
    state.drawer = boolean;
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {};

// getters are functions
const getters = {
  tiles: state => {
    return state.apps.filter(app => app.includeAsTile)
  },
  // drawer: state => {
  //   const screenSize = ['sm', 'md']
  //   return state.$vuetify.breakpoint.name in screenSize
  // }
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
