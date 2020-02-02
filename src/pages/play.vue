<template>
    <div v-on:touchstart="startTouch" v-on:touchend="endTouch">
        <headerGuide msg="正在播放"></headerGuide>
        <img v-lazy="PicUrl" class="pic">
        <audio :src="SongUrl" controls autoplay class="play"></audio>
    </div>
</template>

<script>
    import headerGuide from '../components/headerGuide.vue'
    export default {
        data(){
            return{
                SongUrl:'',
                PicUrl:''
            }       
        },
        methods:{
            show(){
                setTimeout(()=>{
                    this.SongUrl=this.$store.state.songUrl;
                    this.PicUrl=this.$store.state.picUrl;
                },2000)
            },
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
        },
        mounted(){
            this.show();
        },
        components:{
            headerGuide
        }
    }
</script>

<style lang="less">
    .pic{
        width:100%;
        height:100%;
        border-radius: 50%; 
        -webkit-animation: move 8s linear infinite;
    }
    @-webkit-keyframes move{
        0%{-webkit-transform:rotate(0deg);}
		25%{-webkit-transform:rotate(90deg);}
		50%{-webkit-transform:rotate(180deg);}
		75%{-webkit-transform:rotate(270deg);}
		100%{-webkit-transform:rotate(360deg);}
    }
    .play{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>