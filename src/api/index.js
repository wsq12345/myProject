import axios from 'axios'
import api from './api'
import { config, error } from 'shelljs'
import {Message} from 'element-ui'
let loading=null;
let instance=axios.create({
    timeout: 5000,
    baseURL: process.env.BASE_URL
})
instance.interceptors.request.use(config=>{
    return config;
},error=>{
    return Promise.reject(error);
})
instance.interceptors.response.use(response => {
    if (response.status === 200) {
      return response;
    }
    return Promise.reject(response);
  }, error => {
    if (error) {
      console.log(error);
      Message({
        message: '网络连接中断',
        type:'error'
      });
    } else {
        Message({
            message: '未知错误',
            type:'error'
        });
    }
    return Promise.reject(error);
  });
export default instance;
