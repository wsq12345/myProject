<template>
	<div>
		<headerGuide msg="推荐"></headerGuide>
		<el-button id="btn" type="success" @click="plus">+</el-button>
		{{number}}
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	export default{
		components:{
			headerGuide
		},
		methods:{
			plus(){
				this.$store.commit('increment');
			}
		},
		computed:{
			number(){
				return this.$store.state.count;
			}
		}
	}
</script>

<style>
	#btn{
		margin-top: 30px;
	}
</style>
