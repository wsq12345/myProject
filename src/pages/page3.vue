<template>
	<div>
		<headerGuide msg="排行榜"></headerGuide>
		<toplist></toplist>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	import toplist from '../components/toplist.vue'
	export default{
		components:{
			headerGuide,
			toplist
		},

	}
</script>

<style>
	#allmap{
		position: absolute;
		top: 30px;
		width: 100%;
		height: 500px;
	}
</style>
