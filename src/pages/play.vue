<template>
    <div v-on:touchstart="startTouch" v-on:touchend="endTouch">
        <headerGuide msg="正在播放"></headerGuide>
        <img v-lazy="PicUrl" class="pic">
        <audio :src="SongUrl" @timeupdate="getTime" controls autoplay class="play"></audio>
        <p class="lyric">{{song}}</p>
    </div>
</template>

<script>
    import headerGuide from '../components/headerGuide.vue'
    export default {
        data(){
            return{
                SongUrl:'',
                PicUrl:'',
                song: '',
                startTime: 0,
                lines: []
            }       
        },
        methods:{
            show(){
                setTimeout(()=>{
                    this.SongUrl=this.$store.state.songUrl;
                    this.PicUrl=this.$store.state.picUrl;
                    let lines=this.$store.state.lines;
                    if(lines=='纯音乐，请欣赏'){
                        this.song=lines;
                    } 
                    this.initLines(lines);
                },2000)
            },
            initLines(content){
                const timeExp = /\[\d{2}:\d{2}.\d{3}\]/g;
                const lines=content.split('\n');
                for(var i=0;i<lines.length;i++){
                    const line = lines [i];
                    let result = timeExp.exec(line);
                    if (!result) continue;
                    const txt = line.replace (timeExp, '').trim ();// 现在把时间戳去掉，只剩下歌词文本
                    if (txt) {
                        this.lines.push ({time: (parseInt(result[0][1]*10)+parseInt(result[0][2]))*60+parseInt(result[0][4]*10)+parseInt(result[0][5]),txt});
                    }
                }
                this.lines.sort ((a, b) => {
                     return a.time - b.time;
                });    
            },
            getTime(e) {
                if(this.lines.length){
                    if(parseInt(e.target.currentTime)==this.lines[this.startTime].time){
                        this.song=this.lines[this.startTime].txt;
                        this.startTime++;
                    } 
                }   
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
        -webkit-animation: move 16s linear infinite;
    }
    @-webkit-keyframes move{
        0%{-webkit-transform:rotate(0deg);}
		25%{-webkit-transform:rotate(90deg);}
		50%{-webkit-transform:rotate(180deg);}
		75%{-webkit-transform:rotate(270deg);}
		100%{-webkit-transform:rotate(360deg);}
    }
    .lyric{
        text-align: center;
        margin-top: 1rem;
        color: rgb(0, 255, 170);
    }
    .play{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>