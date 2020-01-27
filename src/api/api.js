import axios from 'axios'
const api="http://localhost:3000"
export const getSongList = () => {return axios.get(`${api}/personalized/newsong`);}
export const getSongUrl =(params)=>{return axios.get(`${api}/song/url`,{params:{id:params}});}
export const checkExitstence=(params)=>{return axios.get(`${api}/cellphone/existence/check`,{params:{phone:params}});}
export const sendCaptcha = (params) => {return axios.get(`${api}/captcha/sent`,{params:{phone:params}});}
export const verifyCaptcha = (phone,captcha) => {return axios.get(`${api}/captcha/verify`,{params:{phone:phone,captcha:params}});}


