import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user:{
      account:"",
      password:""
    },
    tabPanes:[],
    activeName:'/index/admin/devices',
  },
  getters:{
    activeName:()=>{

    }
  },
  mutations: {
    login(state,payload){
      state.user = {...state.user,...payload};
    },
    changeActiveName(state,name){
      state.activeName = name;
    },
    addTabpane(state,value){
      state.tabPanes.push(value);
    },
    removeTabpane(state,value){
      //删除tabpanes里的一条数据
      let index;
      for(let i=0;i<state.tabPanes.length;i++){
        if(state.tabPanes[i].name === value){
          index = i;
          break;
        }
      }
      state.tabPanes.splice(index,1);
    }
  },
  actions: {
  },
  modules: {
  }
})
