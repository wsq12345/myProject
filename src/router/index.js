import Vue from 'vue'
import Router from 'vue-router'
import page1 from '../pages/page1'
import page2 from '../pages/page2'
import page3 from '../pages/page3'
import page4 from '../pages/page4'
import login from '../pages/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			redirect: '/page1',
    },
		{
		  path: '/page1',
		  name: 'page1',
		  component: page1,
			meta:{
				isShow:true
			}
			
		},
		{
		  path: '/page2',
		  name: 'page2',
		  component: page2,
			meta:{
				isShow:true
			}
		},
		{
		  path: '/page3',
		  name: 'page3',
		  component: page3,
			meta:{
				isShow:true
			}
		},
		{
		  path: '/page4',
		  name: 'page4',
		  component: page4,
			meta:{
				isShow:true
			}
		},
		{
		  path: '/login',
		  name: 'login',
		  component: login,
			meta:{
				isShow:false
			}
		}
  ]
})
