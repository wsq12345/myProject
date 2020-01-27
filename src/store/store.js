import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  count:100,
  songUrl:'',
  picUrl:''
}
const mutations={
  increment(state){
    state.count ++;
    sessionStorage.setItem("count",state.count);
  },
  getPicUrl(state,Url){
    state.picUrl=Url;
  },
  getSongUrl(state,Url){
    state.songUrl=Url;
  }
}
const getters={
  ingetter(state){
    state.count=sessionStorage.getItem("count") || 100;
    return state.count;
  }
}
const actions={
  plus({commit}){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        commit('increment');
        resolve();
      },1000);
    })
  }

}
const store=new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
export default store;
