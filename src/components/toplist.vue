<template>
    <div>
        <p>官方榜</p>
        <ul class="toplist">
            <li v-for="toplist in toplists" :key="toplist.index">
                <img v-lazy="toplist.coverImgUrl">
                <span class="list">
                    <h5 v-for="(title,index) in toplist.tracks" :key="title.index" @click="showTop(index)">{{index+1+'.'}}{{title.first+'-'+title.second}}</h5> 
                </span>
                <div class="ss"></div>
                <span class="updateDate">{{toplist.updateFrequency}}</span>
            </li>
        </ul>
        <div class="content"></div>
    </div>
</template>

<script>
import {topList} from '../api/api'
export default {
    data(){
        return{
            toplists: []
        }
    },
    methods:{
        show(){
            topList().then(data=>{
                this.toplists=data.data.list.slice(0,4);
                //console.log(data.data.list);
            }).catch(e=>{
                console.log(e);
            })
        }
    },
    mounted(){
        this.show();
    }
}
</script>

<style lang="less">
    p{
        margin-bottom: 1rem; 
    }
    .toplist{
        list-style: none;
        li{
            overflow: hidden;
            margin-bottom: -1rem; 
        } 
        img{
            width: 25%;
            height: 25%;
            border-radius: 10%; 
            float: left;
        }
        .updateDate{
            color: wheat;
            position: relative;
            top: -1.6rem;
            font-size: 0.6rem;
        }
        .ss{
            clear: both;
        }
        .list{
            h5{
                margin-bottom: 2%;
                opacity: 0.5; 
            }
        }
    }
    .content{
        height: 3rem;
    }
</style>