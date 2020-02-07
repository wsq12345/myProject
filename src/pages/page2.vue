<template>
	<div>
		<headerGuide msg="推荐"></headerGuide>
		<div class="zanwei"></div>
		<songList></songList>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	import songList from '../components/songList'
	export default{
		components:{
			headerGuide,
			songList
		},
		methods:{
			
		},
		computed:{
		}
	}
</script>

<style lang="less">
	.zanwei{
		height: 2rem;
	}
</style>


