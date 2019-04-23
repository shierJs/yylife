import Vue from 'vue'

export default Vue.filter('flowMall',(n)=>{
    //判断文本是否超出，超出显示...
    if(n.length>=12){
        let str=n.substr(0,30)+'...';
        return str
    };
    return n
});