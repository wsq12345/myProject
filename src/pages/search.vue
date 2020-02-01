<template>
    <div v-on:touchstart="startTouch" v-on:touchend="endTouch" class="searchPage">
        <el-input v-model="search" placeholder="搜索歌曲、歌手、专辑">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <ul v-if="!hotShow" class="result">
            <li v-for="(result,index) in results" :key="result.index" @click="showResult(index)">
                {{result.name}}
                <h5>{{result.artists[0].name+'/'+result.album.name}}</h5>
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
    import {hot,searchM} from '../api/api'
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
			}
        },
        mounted(){
            this.showHot();
        },
        watch:{
            search(){
                if(!this.search)
                    this.hotShow=true;
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
                h5{
                    color: palevioletred;
                    opacity: 0.3;
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
                float: left;
                background: white;
                padding: 2px 8px 2px 8px;
            }
        }
    }
    
    
</style>
