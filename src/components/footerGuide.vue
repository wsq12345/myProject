<template>
	<div id="footer">
		<div class="guide_item" @click="goto('/page1')" :class="{on:'/page1'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-tubiao15"></i>
			</span>
			<span class="guide_msg">音乐馆</span>
		</div>
		<div class="guide_item" @click="goto('/page2')" :class="{on:'/page2'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-lianxiren"></i>
			</span>
			<span class="guide_msg">推荐</span>
		</div>
		<div class="guide_item" @click="goto('/page3')" :class="{on:'/page3'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-dongtai"></i>
			</span>
			<span class="guide_msg">动态</span>
		</div>
		<div class="guide_item" @click="goto('/page4')" :class="{on:'/page4'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-wode"></i>
			</span>
			<span class="guide_msg">我的</span>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			goto(path){
				this.$router.replace(path);
			}
		}
	}
</script>

<style>
	#footer{
		position: fixed;
		bottom: 0px;
		border-top: 1px solid #e4e4e4;
		width: 100%;
		background: white;
		display: flex;
		height: 50px;
	}
	.guide_item{
		display: flex;
		flex: 1;
		flex-direction: column;
		text-align: center;
	}
	.iconfont{
		font-size: 30px;
	}
	.guide_msg{
		font-size: 10px;
	}
	.on{
		color: #42B983;
	}
</style>
