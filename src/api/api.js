import axios from 'axios'
import instance from './index'
import url from 'postcss-url';
const api="http://localhost:3000"
// export const getSongList = () => {return axios.get(`${api}/personalized/newsong`);}
// export const getSongUrl =(params)=>{return axios.get(`${api}/song/url`,{params:{id:params}});}
export const checkExitstence=(phone)=>{return axios.get(`${api}/cellphone/existence/check`,{params:{phone:phone}});}
export const sendCaptcha = (phone) => {return axios.get(`${api}/captcha/sent`,{params:{phone:phone}});}
export const verifyCaptcha = (phone,captcha) => {return axios.get(`${api}/captcha/verify`,{params:{phone:phone,captcha:captcha}});}
export const register=(phone,password,captcha,nickname)=>{
    return axios.get(`${api}/register/cellphone`,{params:
    {
        phone:phone,
        password:password,
        captcha:captcha,
        nickname:encodeURI(nickname) 
    }}) 
}
export const login=(phone,password)=>{return axios.get(`${api}/login/cellphone`,{params:{phone:phone,password:password}});}
export const logout=()=>{return axios.get(`${api}/logout`)}
export const getUserInfo=()=>{return axios.get(`${api}/user/subcount`)}
// export const banners=()=>{return axios.get(`${api}/banner`)}
export const personalized=()=>{return axios.get(`${api}/personalized?limit`)}
export const hot=()=>{return axios.get(`${api}/search/hot`)}   
export const searchM=(keywords)=>{return axios.get(`${api}/search`,{params:{keywords:keywords}})}
export const topList=()=>{return axios.get(`${api}/toplist/detail`)} 
// export const songDetail=(ids)=>{return axios.get(`${api}/song/detail`,{params:{ids:ids}})} 
// export const getLyric=(id)=>{return axios.get(`${api}/lyric`,{params:{id:id}})}

export const banners=()=>instance.get('/banner')
export const getSongList = () => instance.get('/personalized/newsong')
export const getSongUrl =(data)=>instance.get('/song/url',{params:data})
export const songDetail=(data)=>instance.get('/song/detail',{params:data})
export const getLyric=(data)=>instance.get('/lyric',{params:data})