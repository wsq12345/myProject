<template>
	<div id="login" v-on:touchstart="startTouch" v-on:touchend="endTouch">
		<div class="form-container">
			<h2>用户登录</h2>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="formData.phone"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password" type="password"></el-input>
				</el-form-item>
				<el-button class="login-btn" type="success" :loading="logining" @click="loginIn">登录</el-button>
				<el-button class="login-btn" type="warning" @click="register">注册</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login} from '../api/api'
	export default {
		data() {
			return {
				logining: false,
				formData: {
					phone: "",
					password: "",
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入手机名',
							trigger: 'blur'
						},
						{
							min: 11,
							message: '手机号长度至少为11',
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
			loginIn(){
				login(this.formData.phone,this.formData.password).then(data=>{
					//console.log(data);
					if(data.data.code==200){
						// console.log(data.data.profile.nickname)
						sessionStorage.setItem("nickname",data.data.profile.nickname);
						//this.$store.commit('getNickname',data.data.profile.nickname);
						this.$router.replace("/page1");
					}
						
					if(data.data.code==502)
						alert("密码错误");
				}).catch(e=>{
					if(e.response.status==501)alert("账号不存在");
				})
				// this.$router.replace("/page1");
			},
			register(){
				this.$router.replace("/register");
			},
			startTouch(evt) {
                // 缓存起始位置信息
                this.touchStartTaget = evt.targetTouches[0]
            },
            endTouch(evt) {
                const endTouch = evt.changedTouches[0]
                const startTouch = this.touchStartTaget
                const deltaX = endTouch.clientX - startTouch.clientX
                const deltaY = endTouch.clientY - startTouch.clientY
                // 向右滑, x轴有效长应大于100px
                if (deltaX > 50) {
                // 上下偏移量小于45°
                    if (Math.abs(deltaY) / deltaX <= 1) {
                        // 认为 ”右滑动“
                        this.$router.replace("/page4");
                    }
                }
            }
		}
	}
</script>

<style>
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
