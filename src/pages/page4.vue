<template>
	<div>
		<headerGuide msg="我的"></headerGuide>
		<div id="login">
			<el-button @click="login" type="success">登录</el-button>
		</div>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			headerGuide
		},
		methods:{
			login:function(){
				this.$router.replace("/login");
			}
		}
	}
</script>

<style>
	#login{
		position: absolute;
		top: 30px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>