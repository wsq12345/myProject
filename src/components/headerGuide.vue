<template>
	<header>
		<span id="back" @click="back" v-show="$route.meta.backShow"><i class="iconfont icon-fanhui"></i></span>
		<h3 id="titile">{{msg}}</h3>
		<span id="icon" @click="search" v-show="$route.meta.iconShow"><i class="iconfont icon-search"></i></span>
		<a @click="logIn" v-if="$route.meta.loginShow & isLogin" >登录</a>
		<el-dropdown v-if="$route.meta.loginShow & !isLogin" class="el-drop">
			<span class="el-dropdown-link">
				<img :src="imgUrl" class="avatarImg">
			</span>
			<el-dropdown-menu>
				<el-dropdown-item>我的信息</el-dropdown-item>
				<el-dropdown-item>个人设置</el-dropdown-item>
				<el-dropdown-item>修改密码</el-dropdown-item>
				<el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</header>
	
</template>

<script>
	import {logout} from '../api/api'
	export default{
		props:{
			msg:String
		},
		data(){
			return{
			}
		},
		methods:{
			search(){
				this.$router.replace('/search');
			},
			logIn(){
				this.$router.replace('/login');
			},
			logOut(){
				sessionStorage.removeItem("nickname");
				console.log("退出");
				logout().then(data=>{
					
				}).catch(e=>{
					console.log(e);
				})
			},
			back(){
				this.$router.replace('/page1');
			}
		},
		watch:{
			
		},
		computed:{
			isLogin(){
				if(JSON.parse(sessionStorage.getItem("nickname")))
					return false;
				else
					return true;
			},
			imgUrl(){
				let data=JSON.parse(sessionStorage.getItem("nickname"));
    			if(data)
      				return data.profile.avatarUrl;
    			return '';
			}
		}
	}
</script>

<style lang="less">
	header{
		color: white;
		background: steelblue;
		width: 100%;
		top: 0px;
		height: 2rem;
		line-height: 2rem;	
		.iconfont{
			font-size: 30px;
		}
		#titile{
			display: inline-block;
			margin-left: 50%;
			transform: translateX(-50%);
			text-overflow: ellipsis;
		}
		#icon{
			float: right;
		}
		#back{
			position: absolute;
			left: 0;
		}
		a{
			float: right;
			color: wheat;
			opacity: 0.4;
			text-decoration: none;
		}
		.el-drop{
			float: right;
			.avatarImg{
				width: 2rem;
				height: 2rem;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
</style>
