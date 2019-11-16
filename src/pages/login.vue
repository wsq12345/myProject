<template>
	<div id="login">
		<el-button id="back" type="info" @click="back">返回</el-button>
		<div class="form-container">
			<h2>用户登录</h2>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="formData.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password" type="password"></el-input>
				</el-form-item>
				<el-button class="login-btn" type="success" :loading="logining">登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import headerGuide from '../components/headerGuide.vue'
	export default {
		data() {
			return {
				logining: false,
				formData: {
					username: "",
					password: "",
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '用户名长度需在3-10个字符之间',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码长度至少6个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			back:function(){
				this.$router.replace("/page4");
			}
		}
	}
</script>

<style>
		#back{
			position: fixed;
			top: 0px;
			left: 0px;
		}
		#login{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
		.form-container{
			background: #fff;
			text-align: center;
			box-sizing: border-box;
		}
		.login-btn{
			width: 100px;
		}
</style>
