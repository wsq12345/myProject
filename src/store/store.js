import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  count:100,
  songUrl:'',
  picUrl:'',
  nickname:'',
  lines:'',
  songId:[],
  index:'',
}
const mutations={
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
    state.lines='',
    state.lines=line;
  },
  getId(state,arr){
      state.songId=[];
      for(var i=0;i<arr.length;i++){
        state.songId.push({id:arr[i].id,name:arr[i].name});
      }  
  },
  getIndex(state,index){
    state.index='';
    state.index=index;
  },
  updateInde(state,index){
    state.index=index;
  },
  delSong(state,index){
    state.songId.splice(index,1);
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
