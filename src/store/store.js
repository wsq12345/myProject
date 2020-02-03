import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  count:100,
  songUrl:'',
  picUrl:'',
  nickname:'',
  lines:''
}
const mutations={
  increment(state){
    state.count++;
  },
  getPicUrl(state,Url){
    state.picUrl=Url;
  },
  getSongUrl(state,Url){
    state.songUrl=Url;
  },
  getNickname(state,nickname){
    state.nickname=nickname;
  },
  getLyric(state,line){
    state.lines=line;
  }
}
const getters={
  ingetter(state){
    let data=JSON.parse(sessionStorage.getItem("nickname"));
    if(data)
      state.nickname=data.profile.avatarUrl;
    return state.nickname;
  }
}
const actions={
  increment ({ commit }) {
    setTimeout(()=>{
      commit('increment');
    },1000) 
  }
}
const store=new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
export default store;
