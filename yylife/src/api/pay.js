import axios from 'axios'
const URL="/api/";

//金币充值
async  function reCharge(params){
    let url=URL+"paymentRecharge";
    let res=await axios({
        method:"post",
        url:url,
        params:params,
    })
    return res;
}  

export default {
    reCharge
}