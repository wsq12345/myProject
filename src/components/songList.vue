<template>
	<div id="content">
		<ul id="songs">
			<li id="song" v-for="comment in comments" v-bind:key=comment.index>
				<img v-lazy="comment.pic_big" />
				{{comment.album_title}}</li>
		</ul>
	</div>
</template>

<script>
	import {getSong} from '../api/api'
	export default {
		data() {
			return {
				comments: '',
			}
		},
		methods: {
			show: function() {
				getSong().then(data=>{this.comments=data});
			}
		},
		mounted() {
			this.show();
		}
	}
</script>

<style>
	#songs {
		position: absolute;
		top: 30px;
		color: #4682B4;
		width: 100%;
		margin-bottom: 50px;
	}

	#song {
		display: flex;
		flex: 1;
		flex-direction: column;
		text-align: center;
	}
</style>
