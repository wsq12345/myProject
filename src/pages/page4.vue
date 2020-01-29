<template>
	<div>
		<headerGuide msg="我的"></headerGuide>
		<div id="login">
			{{nickname}}
			<el-button @click="login" type="success" v-if="btnExist">登录</el-button>
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
				console.log(this.$store.getters.ingetter)
			},
			show(){
				if(this.nickname)
					this.btnExist=false;
			}
		},
		computed:{
			nickname(){
				return `欢迎你，${this.$store.getters.ingetter}`;
			}
		},
		mounted(){
			this.show();
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