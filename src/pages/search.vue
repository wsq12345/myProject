<template>
    <div v-on:touchstart="startTouch" v-on:touchend="endTouch">
        <el-input v-model="search"></el-input>
        <ul>
            <li v-for="song in songs" :key="song.id">{{song.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                search:'',
                songs:[
                    {id:1,name:"稻香"},
                    {id:2,name:"菊花台"},
                    {id:3,name:"夜曲"},
                    {id:4,name:"青花瓷"}
                ]
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
            }
        }
        
    }
</script>

<style>

</style>
