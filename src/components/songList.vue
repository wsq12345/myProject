<template>
	<div id="content">
		<h3>推荐新歌</h3>
		<ul id="songs">
			<li id="song" v-for="(comment,index) in comments" @click="getUrl(index)" v-bind:key=comment.index>
				<img v-lazy="comment.picUrl" />
				{{comment.name}}</li>
		</ul>
		<div class="foot"></div>
	</div>
</template>

<script>
	import {getSongList,getSongUrl,getLyric} from '../api/api'
	export default {
		data() {
			return {
				comments: '',
			}
		},
		methods: {
			show: function() {
				getSongList().then(data=>{
					//console.log(data.data.result);
					this.comments=data.data.result;
				})
			},
			getUrl:function(index){
				let id=this.comments[index].id;
				let lines;
				let picUrl=this.comments[index].picUrl+"?param=300x300";
				this.$store.commit('getPicUrl',picUrl);
				getLyric(id).then(data=>{
                    if(!data.data.lrc)
                        lines='纯音乐，请欣赏'
                    else
                        lines=data.data.lrc.lyric;
                    this.$store.commit('getLyric',lines);
                }).catch(e=>{
                    console.log(e);
                })
				getSongUrl(id).then(data=>{
					let songUrl=data.data.data[0].url;
					this.$store.commit('getSongUrl',songUrl);
				})
				this.$router.replace("/play");
			}
		},
		mounted() {
			this.show();
		}
	}
</script>

<style lang="less">
	h3{
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	#songs {
		color: #4682B4;
		#song {
			display: flex;
			flex: 1;
			flex-direction: column;
			text-align: center;
			overflow: hidden;
			img{
				width: 100%;
			}
		}
	}
	.foot{
		height: 3rem;
		width: 100%;
	}
</style>
