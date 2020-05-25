<template>
  <div id="app">
		<router-view></router-view>
		<footerGuide v-show="$route.meta.isShow"></footerGuide>
  </div>
</template>

<script>
import footerGuide from './components/footerGuide.vue'
export default {
  name: 'App',
	components:{
		footerGuide,
	},
	
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	html,body,#app{
		height: 100%;
	}
	a{
		text-decoration: none;
		color: #ccc;
	}
</style>
