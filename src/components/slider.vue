<template>
  <el-carousel height="10rem" indicator-position="outside">
    <el-carousel-item v-for="pic in pics" :key="pic.index">
      <img v-lazy="pic.imageUrl">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {banners} from '../api/api'
export default {
    data(){
        return{
            pics:[]
        }
    },
    methods:{
        show(){
            banners().then(data=>{
                //console.log(data);
                this.pics=data.data.banners;
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
.el-carousel {
  margin-left: 50%;
  transform: translateX(-50%);
  width: 100%;
  img{
      width: 100%;
      height: 100%;
  }
  .el-carousel__button{
      width: 1rem;
  }
}
</style>