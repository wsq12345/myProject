<template>
	<div>
		<headerGuide msg="我的"></headerGuide>
		<div id="login">
		</div>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	export default{
		data(){
			return{
				btnExist: true,
				
			}
		},
		components:{
			headerGuide
		},
		methods:{
			login(){
				this.$router.replace("/login");
			},

		},
		computed:{

		},
		mounted(){
			
		}
	}
</script>

<style>

</style>