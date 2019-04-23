import axios from 'axios'
const URL="/api/"
//注册
async  function register(params){
    let url=URL+"register";
    let res=await axios.post(url,params)
    return res;
} 
//登录
async  function login(params){
    let url=URL+"login";
    let res=await axios.post(url,params)
    return res;
} 
//忘记密码
async  function forget(params){
    let url=URL+"forget";
    let res=await axios.post(url,params);
    return res;
} 
//获取手机验证码
async  function getCode(params){
    let url=URL+"sendSms";
    let res=await axios.get(url,{
        params:params,
        withCredentials : true,
    })
    return res;
} 

export default {
    register,
    getCode,
    login,
    forget,
}