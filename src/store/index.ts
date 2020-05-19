import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const arr:Array<any> = []
export default new Vuex.Store({
  state:{
    tabPanes:arr,
  },
  mutations: {
    addTabpane(state,value){
      state.tabPanes.push(value);
    },
    removeTabpane(state,value:any){
      //删除tabpanes里的一条数据
      let index;
      for(let i=0;i<state.tabPanes.length;i++){
        if(state.tabPanes[i]["name"] === value){
          index = i;
          break;
        }
      }
      if(index!==undefined){
        state.tabPanes.splice(index,1);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
