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
					this.$store.commit('getId',this.comments);
				})
			},
			getUrl:function(index){
				this.$store.commit('getIndex',index);
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
