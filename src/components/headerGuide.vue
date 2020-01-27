<template>
	<header>
		<span id="titile">{{msg}}</span>
		<span id="icon" @click="search" v-show="$route.meta.iconShow"><i class="iconfont icon-search"></i></span>
	</header>
	
</template>

<script>
	export default{
		props:{
			msg:String
		},
		methods:{
			search:function(){
				this.$router.replace('/search');
			}
		}
	}
</script>

<style>
	header{
		color: white;
		background: steelblue;
		width: 100%;
		top: 0px;
		height: 2rem;
	}
	#titile{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	#icon{
		float: right;
	}
</style>
