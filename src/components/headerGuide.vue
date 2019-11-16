<template>
	<div id="header">{{msg}}</div>
</template>

<script>
	export default{
		props:{
			msg:String
		}
	}
</script>

<style>
	#header{
		position: fixed;
		text-align: center;
		color: white;
		background: steelblue;
		width: 100%;
		top: 0px;
		height: 30px;
		line-height: 30px;
		z-index: 1;
	}
</style>
