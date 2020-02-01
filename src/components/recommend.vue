<template>
    <div>
        <h3>推荐歌单</h3>
        <ul class="recommend">
            <li v-for="item in items" :key="item.index">
                <img v-lazy="item.picUrl">
                <span class="playCount"><i class="iconfont icon-erji"></i>{{getCount(item.playCount)}}</span>
                <div class="content">{{item.name}}</div>
            </li> 
        </ul>
    </div>  
</template>

<script>
import {personalized} from '../api/api'
export default {
    data(){
        return{
            items:[]
        }
    },
    methods:{
        show(){
            personalized().then(data=>{
                //console.log(data);
                this.items=data.data.result;
            }).catch(e=>{
                console.log(e);
            })
        },
        getCount(count){
            if (count < 0) return;
            if (count < 10000) {
                return count;
            } else if (Math.floor (count / 10000) < 10000) {
                return Math.floor (count/1000)/10 + "万";
            } else  {
                return Math.floor (count / 10000000)/ 10 + "亿";
            }
        }
    },
    mounted(){
        this.show();
    },
    computed:{
        
    }
}
</script>

<style lang="less">
    img{
        width: 100%;
        height: 100%;
    }
    .recommend{
        margin-bottom: 3rem;
        list-style: none;
        overflow: hidden;
        li{
            width: 32%;
            float: left;
            display: flex;
		    flex: 1;
		    flex-direction: column;
            text-align: center;
            margin-left: 1%; 
            img{
                height: 8rem;
                border-radius: 1rem;  
            }
            .playCount{
                color:white;
                font-size: 10px;
                position: relative;
                right: -1rem;
                top: -8rem;
                .iconfont{
                    font-size: 10px;
                }
            }
            .content{
                height: 4rem;
            }
        }
    }
</style>