import Vue from "vue"

export default Vue.filter('currency',(n)=>{
    return "￥"+n
})