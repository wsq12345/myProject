<template>
	<div id="login" v-on:touchstart="startTouch" v-on:touchend="endTouch">
		<div class="form-container">
            <el-steps :active="active" finish-status="success">
                <el-step title="步骤 1" description="验证"></el-step>
                <el-step title="步骤 2" description="注册"></el-step>
                <el-step title="步骤 3" description="完成"></el-step>
            </el-steps>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData" v-if="show1">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="formData.phone"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input v-model="formData.captcha"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData" v-if="show2">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="formData.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div class="finish" v-if="show3">
				<h2>注册成功</h2>
				<el-button class="login-btn" type="success" @click="finish">确定</el-button>
			</div>	
            <el-button class="login-btn" type="success" @click="getCaptcha" :disabled="disabled" v-if="captchaShow">{{tips}}</el-button>
			<el-button class="login-btn" type="warning" @click.native.prevent="next" v-if="nextExist">下一步</el-button>
		</div>
	</div>
</template>
<script>
	import {checkExitstence,sendCaptcha,verifyCaptcha,register} from '../api/api'
	export default {
		data() {
			return {
                active: 0,
				show1: true,
				show2: false,
				show3: false,
				tips: "获取验证码",
				disabled: false,
				captchaShow: true,
				nextExist: true,
				formData: {
					phone: "",
                    captcha: "",
                    nickname: "",
					password: "",
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
                            min: 11,
							message: '手机号长度至少11位',
							trigger: 'blur'
						}
					],
					captcha: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							min: 4,
							message: '验证码长度至少4位',
							trigger: 'blur'
						}
                    ],
					nickname: [{
							required: true,
							message: '请输入昵称',
							trigger: 'blur'
						},
						{
                            min: 2,
							message: '昵称长度至少2位',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 4,
							message: '密码长度至少4位',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods: {
            next() {
				if(this.active++>2)
					this.active==0;
				if(this.active==1){
					this.show1=false;
					this.show2=true;
					this.captchaShow=false;
					verifyCaptcha(this.formData.phone,this.formData.captcha).then(data=>{
						console.log(data.data);
					}).catch(e=>{
						alert("验证码错误");
						this.active--;
						this.show1=true;
						this.show2=false;
						this.captchaShow=true;
					})
				}
				if(this.active==2){
					this.logon();
				}
			},
			logon(){
				register(this.formData.phone,this.formData.password,this.formData.captcha,this.formData.nickname).then((data)=>{
					console.log(data);
					this.show3=true;
					this.show2=false;
					this.nextExist=false;
				}).catch((e)=>{
					this.active--;
					if(e.response.status==400)
						alert("昵称不符合规范");
					if(e.response.status==505)
						alert("该昵称已被占用");
				})
			},
			checkPhone(){
				checkExitstence(this.formData.phone).then(data=>{
					if(data.data.exist==-1){
						this.sendCap();
						var a=true;
					}					
					else
						alert("已注册");
				})
			},
			sendCap(){
				sendCaptcha(this.formData.phone).then(data=>{

				})
			},
			checkCap(){
				verifyCaptcha(this.formData.phone,this.formData.captcha).then(data=>{
					console.log(data.data);
					if(data.data.code==200)
						return true;
				})
			},
			getCaptcha(){
				this.checkPhone();
				var t=60;
				this.disabled=true;
				this.tips="60s后重新获取";
				let timer=setInterval(() => {
					t--;
					this.tips=`${t}s后重新获取`;
					if (t < 0) {
   						clearInterval(timer);
   						this.tips="获取验证码";
   						t = 60;
   						this.disabled=false;
  					}
				}, 1000);
			},
			finish(){
				this.$router.replace("/login");
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
			width: 120px;
		}
		.finish{
			color: red;
		}
</style>