import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user:{
      account:"",
      password:""
    },
  },
  mutations: {
    login(state,payload){
      state.user = {...state.user,...payload};
    }
  },
  actions: {
  },
  modules: {
  }
})
