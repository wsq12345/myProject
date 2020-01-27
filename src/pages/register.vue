<template>
	<div id="login" v-on:touchstart="startTouch" v-on:touchend="endTouch">
		<div class="form-container">
            <el-steps :active="active" finish-status="success">
                <el-step title="步骤 1" description="验证"></el-step>
                <el-step title="步骤 2" description="注册"></el-step>
                <el-step title="步骤 3" description="完成"></el-step>
            </el-steps>
			<h2>用户注册</h2>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData" v-if="show">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="formData.phone"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input v-model="formData.captcha"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData" v-if="!show">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="formData.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password"></el-input>
				</el-form-item>
			</el-form>	
            <el-button class="login-btn" type="success" @click="loginIn">获取验证码</el-button>
			<el-button class="login-btn" type="warning" @click="next">下一步</el-button>
		</div>
	</div>
</template>
<script>
	import headerGuide from '../components/headerGuide.vue'
	export default {
		data() {
			return {
                active: 1,
                show: true,
				formData: {
					phone: "",
                    captcha: "",
                    nickname: "",
                    password: ""
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
                            min: 3,
							message: '昵称长度至少3位',
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
					]
				}
			}
		},
		methods: {
			loginIn(){
				sessionStorage.setItem("user",this.username);
				this.$router.replace("/page1");
            },
            next() {
                this.show=false;
                this.active++
                if (this.active > 3) this.active = 0; 
                if(this.active==3){
                    var r=confirm("是否注册");
                    if(r==true){
                        this.$router.replace("/page1");
                    }
                    else{
                        this.active--;
                    }
                } 
                
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