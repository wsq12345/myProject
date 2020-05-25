<template>
    <div>
        <headerGuide msg="歌单"></headerGuide>
		<div class="zanwei"></div>
        <div class="background">
            <div class="cover">
                <img :src="coverPic">
            </div>
            <div class="content">
                {{name}}
                <div class="creator">
                    <img :src="avatarUrl">
                    <div class="nickname">{{nickname}}</div>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="item in songList" :key="item.index">
                {{item.name}}<br>
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
            img{
                width: 100px;
                height: 100px;
                float: left;
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
    }
</style>