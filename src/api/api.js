import axios from 'axios'
import url from 'postcss-url';
const api="http://localhost:3000"
export const getSongList = () => {return axios.get(`${api}/personalized/newsong`);}
export const getSongUrl =(params)=>{return axios.get(`${api}/song/url`,{params:{id:params}});}
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

