<template>
	<div>
		<headerGuide msg="音乐馆"></headerGuide>
		<slider></slider>
		<recommend></recommend>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	import slider from '../components/slider'
	import recommend from '../components/recommend'
	export default{
		data(){
			return{
				items:[]
			}
		},
		components:{
			headerGuide,
			slider,
			recommend
		},	
	}
</script>

<style lang="less">


</style>>
