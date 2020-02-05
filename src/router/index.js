import Vue from 'vue'
import VueRouter from 'vue-router'
import page1 from '../pages/page1'
import page2 from '../pages/page2'
import page3 from '../pages/page3'
import page4 from '../pages/page4'
import play from '../pages/play'
import search from '../pages/search'
import login from '../pages/login'
import register from '../pages/register'


export default new VueRouter({
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
				isShow:true,
				iconShow:true
			}
			
		},
		{
		  path: '/page2',
		  name: 'page2',
		  component: page2,
			meta:{
				isShow:true,
				iconShow:true
			}
		},
		{
		  path: '/page3',
		  name: 'page3',
		  component: page3,
			meta:{
				isShow:true,
				iconShow:false
			}
		},
		{
		  path: '/page4',
		  name: 'page4',
		  component: page4,
			meta:{
				isShow:true,
				iconShow:false,
				loginShow:true
			}
		},
		{
			path: '/play',
			name: 'play',
			component: play,
			  meta:{
				  isShow:false,
				  iconShow:false,
				  backShow:true
			  }
		  },
		{
			path: '/search',
			name: 'search',
			component: search,
			  meta:{
				  isShow:false,
			  }
		  },
		{
		  path: '/login',
		  name: 'login',
		  component: login,
			meta:{
				isShow:false,
			}
		},
		{
			path: '/register',
			name: 'register',
			component: register,
			  meta:{
				  isShow:false
			  }
		  }
  ]
})
