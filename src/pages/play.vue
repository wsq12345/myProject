<template>
    <div>
        <headerGuide :msg="songName"></headerGuide>
        <img v-lazy="PicUrl" class="pic" :class="{isPlay:!isPlay}">
        <p class="lyric">{{song}}</p>
        <audio :src="SongUrl" @canplay="getDuration" @timeupdate="getTime" autoplay id="audio" ref="audio"></audio>
        <div class="play">
            <div class="block">
                <el-slider v-model="value" :show-tooltip="false" :max="allTime" @change="changeAudio"></el-slider>
                <span class="startTime">{{playingTime}}</span><span class="totalTime">{{duration}}</span>
            </div>
            <div class="control">
                <i class="iconfont" :class="[playLoop?'icon-ziyuanldpi':'icon-danquxunhuan']" @click="loop()"></i>
                <i class="iconfont icon-shangyishou" @click="previous()"></i>
                <i class="iconfont" :class="[isPlay?'icon-bofang':'icon-zanting']" @click="play()"></i>
                <i class="iconfont icon-xiayishou" @click="next()"></i>
            </div>  
        </div>
    </div>
</template>

<script>
    import headerGuide from '../components/headerGuide.vue'
    import {getSongUrl,songDetail,getLyric} from '../api/api'
    export default {
        data(){
            return{
                SongUrl:'',
                PicUrl:'',
                song: '',
                start: 0,
                playingTime: '00:00',
                allTime: 0,
                isPlay:true,
                value: 0,
                duration: '',
                songName: '',
                playLoop: true, //顺序播放、单曲循环
                iconLoop: 'icon-ziyuanldpi',
                lines: []
            }       
        },
        methods:{
            show(index){
                setTimeout(()=>{
                    let id=this.$store.state.songId[index];
                    getLyric(id).then(data=>{
                    if(!data.data.lrc)
                        this.song='纯音乐，请欣赏'
                    else
                        this.initLines(data.data.lrc.lyric);
                    }).catch(e=>{
                        console.log(e);
                    })
                    songDetail(id).then(data=>{
                        this.PicUrl=data.data.songs[0].al.picUrl+"?param=300x300";
                        this.songName=data.data.songs[0].name;
                    }).catch(e=>{
                        throw(e);
                    })
                    getSongUrl(id).then(data=>{
                        this.SongUrl=data.data.data[0].url;
                    }).catch(e=>{
                        console.log(e);
                    })    
                    this.isPlay=true;       
                },500)

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
            setTime(time){
                let mintues=parseInt(time/60);
                let seconds=parseInt(time)%60;
                if(mintues<10)
                    mintues='0'+mintues;
                if(seconds<10)
                    seconds='0'+seconds;
                return `${mintues}:${seconds}`
            },
            getDuration() {
                let time = this.$refs.audio.duration;
                this.duration = this.setTime(time);
                this.allTime=this.$refs.audio.duration;
            },
            changeAudio(val){
                if (this.$refs.audio) {
                    this.$refs.audio.currentTime = val;
                }
                if(this.song!='纯音乐，请欣赏'){
                    for(var i=0;i<this.lines.length;i++){
                        if(val>=this.lines[i].time && val<=this.lines[i+1].time){
                            this.start=i;
                            this.song=this.lines[this.start].txt;
                            this.start++;
                            break;
                        }     
                    }
                }
            },
            getTime(e) {
                this.playingTime=this.setTime(parseInt(e.target.currentTime));
                this.value=parseInt(e.target.currentTime);
                if(this.lines.length){
                    if(parseInt(e.target.currentTime)==this.lines[this.start].time){
                        this.song=this.lines[this.start].txt;
                        this.start++;
                    } 
                }   
            },
            previous(){
                let index=this.$store.state.index;
                index--;
                if(index<0){
                    index=this.$store.state.songId.length;
                }
                this.$store.commit('updateInde',index);
                this.show(index);
            },
            play(){
                var audio=document.getElementById("audio");
                if(this.isPlay){
                    audio.pause();
                    this.isPlay=false;
                }else{
                    audio.play();
                    this.isPlay=true;
                }
                    
            },
            next(){
                let index=this.$store.state.index;
                index++;
                if(index>=this.$store.state.songId.length){
                    index=0;
                }
                this.$store.commit('updateInde',index);
                this.show(index);
            },
            loop(){
                if(this.playLoop){
                    this.playLoop=false;
                }else{
                    this.playLoop=true;
                }
            }        
 
        },
        mounted(){
            this.show(this.$store.state.index);
        },
        computed:{
        
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
        &.isPlay{
            -webkit-animation-play-state:paused;
        }   
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
        display: flex;
        flex: 1;
		flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgb(82, 83, 88);
        color: white;
        .block{
            .startTime{
                float: left;
            }
            .totalTime{
                float: right;
            }
        }
        .control{
            display: flex;
            justify-content: center;
            .iconfont{
                font-size: 30px;
                margin-right: 1rem;
            }
        }
        
    }
</style>