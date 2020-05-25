<template>
    <div v-cloak>
        <headerGuide :msg="songName"></headerGuide>
        <div class="zanwei"></div>
        <img :src="PicUrl" class="pic" :class="{isPlay:!isPlay}">
        <p class="lyric">{{song}}</p>
        <audio :src="SongUrl" @canplay="getDuration" @timeupdate="getTime" @ended="playNext" autoplay id="audio" ref="audio"></audio>
        <div class="play">
            <div class="block">
                <el-slider v-model="value" :show-tooltip="false" :max="allTime" @change="changeAudio"></el-slider>
                <span class="startTime">{{playingTime}}</span><span class="totalTime">{{duration}}</span>
            </div>
            <div class="control">
                <i class="iconfont" :class="{'icon-ziyuanldpi':playLoop==0,'icon-danquxunhuan':playLoop==1,'icon-suijibofang':playLoop==2}" @click="loop()"></i>
                <i class="iconfont icon-shangyishou" @click="previous()"></i>
                <i class="iconfont" :class="[isPlay?'icon-bofang':'icon-zanting']" @click="play()"></i>
                <i class="iconfont icon-xiayishou" @click="next()"></i>
                <i class="iconfont icon-bofangliebiao" @click="list()"></i> 
            </div>  
        </div>
        <div class="playList" v-show="playlist">
            <header>播放列表</header>
            <ul>
                <li v-for="(list,index) in lists" :key="list.id" :class="{on:$store.state.index==index}">
                    <span class="listName" @click="changeSong(index)">{{list.name}}</span>
                    <span class="clanel" @click="delSong(index)"><i class="iconfont icon-quxiao"></i></span>
                </li>
            </ul>
            <footer @click="close()">关闭</footer>
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
                isPlay:false,
                value: 0,
                duration: '',
                songName: '',
                playLoop: 0, //顺序播放、单曲循环、随机播放
                iconLoop: 'icon-ziyuanldpi',
                playlist: false,
                lines: [],
                lists: []
            }       
        },
        methods:{
            async show(index){
                this.start=0;
                this.lines=[];
                let id=this.$store.state.songId[index].id;
                this.lists=this.$store.state.songId;
                // getLyric(id).then(data=>{
                // if(!data.data.lrc)
                //     this.song='纯音乐，请欣赏'
                // else
                //     this.initLines(data.data.lrc.lyric);
                // }).catch(e=>{
                //     console.log(e);
                // })
                let songLrc=await getLyric({id:id});
                if(!songLrc.data.lrc)
                    this.song='纯音乐，请欣赏';
                else
                    this.initLines(songLrc.data.lrc.lyric);
                // songDetail(id).then(data=>{
                //     this.PicUrl=data.data.songs[0].al.picUrl+"?param=300x300";
                //     this.songName=data.data.songs[0].name;
                // }).catch(e=>{
                //     throw(e);
                // })
                let songD=await songDetail({ids:id});
                this.PicUrl=songD.data.songs[0].al.picUrl+"?param=300x300";
                this.songName=songD.data.songs[0].name;
                // getSongUrl(id).then(data=>{
                //     this.SongUrl=data.data.data[0].url;
                // }).catch(e=>{
                //     console.log(e);
                // })   
                let songUrl=await getSongUrl({id:id});
                this.SongUrl=songUrl.data.data[0].url;    
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
                this.isPlay=true;
                let time = this.$refs.audio.duration;
                this.duration = this.setTime(time);
                this.allTime=this.$refs.audio.duration;
            },
            changeAudio(val){
                if (this.$refs.audio) {
                    this.$refs.audio.currentTime = val;
                }
                if(this.song!='纯音乐，请欣赏'){
                    for(var i=0;i<this.lines.length-1;i++){
                        if(val>=this.lines[i].time && val<=this.lines[i+1].time){
                            this.start=i;
                            this.song=this.lines[this.start].txt;
                            this.start++;
                            break;
                        }     
                    }
                    if(val>=this.lines[this.lines.length-1].time)
                        this.song=this.lines[this.lines.length-1].txt;
                }
            },
            getTime(e) {
                this.playingTime=this.setTime(parseInt(e.target.currentTime));
                this.value=parseInt(e.target.currentTime);
                if(this.start<this.lines.length){
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
            playNext(){
                if(this.playLoop==0){
                    this.next();
                }if(this.playLoop==1){
                    this.start=0;
                    var audio=document.getElementById("audio");
                    audio.play();
                }if(this.playLoop==2){
                    let index=Math.floor(Math.random()*this.$store.state.songId.length);
                    this.$store.commit('updateInde',index);
                    this.show(index);
                }
            },
            loop(){
                if(this.playLoop==0){
                    this.playLoop=1;
                }else if(this.playLoop==1){
                    this.playLoop=2;
                }else if(this.playLoop==2){
                    this.playLoop=0;
                }
            },
            list(){
                this.playlist=true;
            },        
            close(){
                this.playlist=false;
            },
            changeSong(index){
                this.$store.commit('updateInde',index);
                this.show(index);
            },
            delSong(index){
                this.$store.commit('delSong',index);
                this.show(this.$store.state.index);//删除自动下一首
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
    .zanwei{
		height: 2rem;
	}
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
    .playList{
        width: 100%;
        position: absolute;
        bottom: 0;
        background: white;
        border-top: 1px solid #e4e4e4;
        z-index: 9999; 
        background: rgb(252, 213, 206);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        header{
            color: rgb(182, 165, 165);
            text-align: center;
            //background: white;
            height: 2rem;
            line-height: 2rem;
            border-bottom: 1px solid #e4e4e4;
        }
        ul{
            list-style: none;
            height: 300px;
            overflow: auto;
            li{
                padding: 5px 0 5px 0;
                border-bottom: 1px solid #e4e4e4; 
                height: 2rem;
                line-height: 2rem;
                text-overflow: ellipsis;
                &.on{
                    color: aqua;
                }
                .listName{
                    display: inline-block;
                    width: 80%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .clanel{
                    float: right;
                    margin-right: 1rem;
                }
            }
        }
        footer{ 
            width: 100%;
            bottom: 0;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            border-top: 1px solid #e4e4e4;
        }
    }
</style>