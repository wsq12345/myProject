<template>
    <div v-on:touchstart="startTouch" v-on:touchend="endTouch" class="searchPage">
        <el-input v-model="search" placeholder="搜索歌曲、歌手、专辑">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <ul v-if="!hotShow" class="result">
            <li v-for="(result,index) in results" :key="result.index" @click="getUrl(index)">
                {{result.name}}
                <br>
                <span v-for="artist in result.artists" :key="artist.index">{{artist.name+'/'}}</span>
                <span>{{result.album.name}}</span>
            </li>
        </ul>
        <div v-if="hotShow">
           <p class="hot">热门搜索</p>
            <ul class="hotSearch">
                <li v-for="(hotNew,index) in hotNews" :key="hotNew.index" @click="searchMusic(index)">{{hotNew.first}}</li>
            </ul> 
        </div>
        
    </div>
</template>
<script>
    import {hot,searchM,getSongUrl} from '../api/api'
    export default {
        data(){
            return{
                search:'',
                hotShow: true,
                hotNews: [],
                results: []
            }
        },
        methods:{
            startTouch(evt) {
                // 缓存起始位置信息
                this.touchStartTaget = evt.targetTouches[0]
            },
            endTouch(evt) {
                const endTouch = evt.changedTouches[0]
                const startTouch = this.touchStartTaget
                const deltaX = endTouch.clientX - startTouch.clientX
                const deltaY = endTouch.clientY - startTouch.clientY
                // 向右滑, x轴有效长应大于100px
                if (deltaX > 50) {
                // 上下偏移量小于45°
                    if (Math.abs(deltaY) / deltaX <= 1) {
                        // 认为 ”右滑动“
                        this.$router.replace("/page1");
                    }
                }
            },
            debounce(func, wait,immediate) {
                let timer;
                return function() {
                let context = this,
                    args = arguments;    
                    if (timer) clearTimeout(timer);
                    if (immediate) {
                        let callNow = !timer;
                        timer = setTimeout(() => {
                        timer = null;
                        }, wait);
                        if (callNow) func.apply(context, args);
                    } else {
                        timer  = setTimeout(() => {
                            func.apply
                        }, wait)
                    }
                }
            },
            searchSong(){
                searchM(this.search).then(data=>{
                    this.results=data.data.result.songs;
                    this.hotShow=false;
                }).catch(e=>{
                    console.log(e);
                })
            },
            showHot(){
                hot().then(data=>{
                    this.hotNews=data.data.result.hots;
                }).catch(e=>{
                    console.log(e);
                })
            },
            searchMusic(index){
                let content=this.hotNews[index].first;
                this.search=content;
				searchM(content).then(data=>{
                    this.results=data.data.result.songs;
                    this.hotShow=false;
                }).catch(e=>{
                    console.log(e);
                })
            },
            getUrl(index){
                let id=this.results[index].id;
                let picUrl=this.results[index].artists[0].img1v1Url+"?param=300x300";
				this.$store.commit('getPicUrl',picUrl);
				getSongUrl(id).then(data=>{
					let songUrl=data.data.data[0].url;
					this.$store.commit('getSongUrl',songUrl);
				})
				this.$router.replace("/play");
			}
        },
        mounted(){
            this.showHot();
        },
        watch:{
            search(){
                if(!this.search)
                    this.hotShow=true;
                else
                    this.debounce(this.searchSong(),1000,true)
            }
        }
        
    }
</script>

<style lang="less">
    .searchPage{
        background: rgb(242, 243, 244);
        height: 100%;
        .result{
            list-style: none;
            li{
                margin-left: 2rem;
                border-bottom: 1px solid rgba(255,0,255,0.3);
                span{
                    color: palevioletred;
                    opacity: 0.5;
                    font-size: 0.6rem;
                }
            }
            
        }
        .hot{
            color: salmon;
            opacity: 0.5;
            margin-top: 3rem;
        }
        .hotSearch{
            list-style: none;
            overflow: hidden;
            li{
                margin-right: 2rem;
                margin-bottom: 4px; 
                border-radius: 20%; 
                float: left;
                background: white;
                padding: 2px 8px 2px 8px;
            }
        }
    }
    
    
</style>
