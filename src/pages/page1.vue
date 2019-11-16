<template>
	<div>
		<headerGuide msg="音乐馆"></headerGuide>
		<songList></songList>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	import songList from '../components/songList'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			headerGuide,
			songList
		},
		
	}
</script>

<style>


</style>
