import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  count:100,
  songUrl:'',
  picUrl:'',
  nickname:''
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
  },
  getNickname(state,nickname){
    store.nickname=nickname;
  }
}
const getters={
  ingetter(state){
    state.nickname=sessionStorage.getItem("nickname") || '';
    return state.nickname;
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
