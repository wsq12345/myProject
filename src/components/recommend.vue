<template>
    <div>
        <h3>推荐歌单</h3>
        <ul class="recommend">
            <li v-for="item in items" :key="item.index">
                <img v-lazy="item.picUrl">
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
        }
    },
    mounted(){
        this.show();
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
        
        li{
            width: 33%;
            float: left;
            display: flex;
		    flex: 1;
		    flex-direction: column;
            text-align: center;
            img{
                height: 8rem;
            }
            .content{
                height: 4rem;
            }
            &:nth-last-child(1){
                margin-bottom: 3rem;
            }
        }
    }
</style>