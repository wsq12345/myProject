<template>
	<div>
		<headerGuide msg="排行榜"></headerGuide>
		<div class="zanwei"></div>
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
	.zanwei{
		height: 2rem;
	}
</style>
