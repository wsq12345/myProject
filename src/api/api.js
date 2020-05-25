import axios from 'axios'
import instance from './index'
import url from 'postcss-url';
const api="http://localhost:3000"

export const checkExitstence=(phone)=>instance.get(`/cellphone/existence/check`,{params:{phone:phone}})
export const sendCaptcha = (phone) => instance.get(`/captcha/sent`,{params:{phone:phone}})
export const verifyCaptcha = (phone,captcha) => instance.get(`/captcha/verify`,{params:{phone:phone,captcha:captcha}})
export const register=(phone,password,captcha,nickname)=>{
    instance.get(`/register/cellphone`,{params:
    {
        phone:phone,
        password:password,
        captcha:captcha,
        nickname:encodeURI(nickname) 
    }}) 
}
export const login=(phone,password)=>instance.get(`/login/cellphone`,{params:{phone:phone,password:password}})
export const logout=()=>instance.get(`/logout`)
export const getUserInfo=()=>instance.get(`/user/subcount`)

export const personalized=()=>instance.get(`/personalized?limit`)
export const hot=()=>instance.get(`/search/hot`) 
export const searchM=(keywords)=>instance.get(`/search`,{params:{keywords:keywords}})
export const topList=()=>instance.get(`/toplist/detail`)


export const banners=()=>instance.get('/banner')
export const getSongList = () => instance.get('/personalized/newsong')
export const getSongUrl =(data)=>instance.get('/song/url',{params:data})
export const songDetail=(data)=>instance.get('/song/detail',{params:data})
export const getLyric=(data)=>instance.get('/lyric',{params:data})
export const detail=(data)=>instance.get('/playlist/detail',{params:data});