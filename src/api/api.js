import axios from 'axios'
import instance from './index'
import url from 'postcss-url';
const api="http://localhost:3000"
// export const getSongList = () => {return axios.get(`/personalized/newsong`);}
// export const getSongUrl =(params)=>{return axios.get(`/song/url`,{params:{id:params}});}
export const checkExitstence=(phone)=>{return axios.get(`/cellphone/existence/check`,{params:{phone:phone}});}
export const sendCaptcha = (phone) => {return axios.get(`/captcha/sent`,{params:{phone:phone}});}
export const verifyCaptcha = (phone,captcha) => {return axios.get(`/captcha/verify`,{params:{phone:phone,captcha:captcha}});}
export const register=(phone,password,captcha,nickname)=>{
    return axios.get(`/register/cellphone`,{params:
    {
        phone:phone,
        password:password,
        captcha:captcha,
        nickname:encodeURI(nickname) 
    }}) 
}
export const login=(phone,password)=>{return axios.get(`/login/cellphone`,{params:{phone:phone,password:password}});}
export const logout=()=>{return axios.get(`/logout`)}
export const getUserInfo=()=>{return axios.get(`/user/subcount`)}

export const personalized=()=>{return axios.get(`/personalized?limit`)}
export const hot=()=>{return axios.get(`/search/hot`)}   
export const searchM=(keywords)=>{return axios.get(`/search`,{params:{keywords:keywords}})}
export const topList=()=>{return axios.get(`/toplist/detail`)} 


export const banners=()=>instance.get('/banner')
export const getSongList = () => instance.get('/personalized/newsong')
export const getSongUrl =(data)=>instance.get('/song/url',{params:data})
export const songDetail=(data)=>instance.get('/song/detail',{params:data})
export const getLyric=(data)=>instance.get('/lyric',{params:data})