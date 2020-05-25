<template>
    <div>
        <headerGuide msg="歌单"></headerGuide>
		<div class="zanwei"></div>
        <div class="background">
            <div class="cover">
                <img :src="coverPic">
            </div>
            <div class="content">
                <h3>{{name}}</h3>
                <div class="creator">
                    <img :src="avatarUrl">
                    <div class="nickname">{{nickname}}</div>
                </div>
            </div>
            <footer class="foot">
                <div class="guide_item">
                    <span class="item_icon">
                        <i class="iconfont icon-tubiao15"></i>
                    </span>
                    <span class="guide_msg">评论</span>
                </div>
                <div class="guide_item">
                    <span class="item_icon">
                        <i class="iconfont icon-xihuan"></i>
                    </span>
                    <span class="guide_msg">点赞</span>
                </div>
                <div class="guide_item">
                    <span class="item_icon">
                        <i class="iconfont icon-jia"></i>
                    </span>
                    <span class="guide_msg">收藏</span>
                </div>
                <div class="guide_item">
                    <span class="item_icon">
                        <i class="iconfont icon-gengduo"></i>
                    </span>
                    <span class="guide_msg">更多</span>
                </div>
            </footer>
        </div>
        <ul class="list">
            <div class="top">
                <div class="playAll">
                    <i class="iconfont icon-bofang1"></i>
                    播放全部
                </div>
                <div class="collet">+ 收藏</div>
            </div>
            <li v-for="(item,index) in songList" :key="item.index" @click="getUrl(index)">
                {{item.name}}
                <br>
                <span>{{item.ar.name+'-'+item.al.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import headerGuide from '../components/headerGuide.vue'
import { detail } from '../api/api'
export default {
    data(){
        return{
            id:this.$route.params.id,
            coverPic:'',
            name:'',
            nickname:'',
            avatarUrl:'',
            songList:[]
        }
    },
    mounted(){
        this.show();
    },
    methods:{
        async show(){
            let data=await detail({id:this.id});
            this.coverPic=data.data.playlist.coverImgUrl;
            this.name=data.data.playlist.name;
            this.nickname=data.data.playlist.creator.nickname;
            this.avatarUrl=data.data.playlist.creator.avatarUrl;
            this.songList=data.data.playlist.tracks;
        },
        getUrl(index){
            this.$store.commit('getId',this.songList);
            this.$store.commit('getIndex',index);
			this.$router.replace("/play");
        }
    },
    components:{
        headerGuide
    }
}
</script>

<style lang="less" scoped>
    .zanwei{
            height: 2rem;
        }
    .background{
        background: rgba(7, 17, 27, 0.2);
        height: 200px;
        .cover{
            margin-left: 20px;
            float: left;
            img{
                width: 120px;
                height: 120px;
                
            }
        }
        .content{
            color: white;
            .creator{
                margin-top: 20px;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    float: left;
                }
                .nickname{
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .foot{
            position: relative;
            top: 30px;
            width: 100%;
            display: flex;
            height: 3rem;
            color: white;
            .guide_item{
                display: flex;
                flex: 1;
                flex-direction: column;
                text-align: center;
                .iconfont{
                    font-size: 30px;
                }
                .guide_msg{
                    font-size: 10px;
                }
            }
        }
    }
    .list{
        .top{
            height: 40px;
            .playAll{
                .iconfont{
                    font-size: 20px;
                }
                height: 40px;
                line-height: 40px;
                float: left;
            }
            .collet{
                float: right;
                color: white;
                background: red;
                height: 40px;
                line-height: 40px;
                width: 100px;
                text-align: center;
            }
        }
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
</style>