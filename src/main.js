// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store/store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');   //去掉session信息
//   }
//   let user = sessionStorage.getItem('user');
//   if (!user && to.path != '/login') { //用户没登录强制转到登录界面
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })
/* eslint-disable no-new */
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')//与el:'#app'功能一样
