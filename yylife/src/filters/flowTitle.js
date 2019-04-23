import Vue from 'vue'

export default Vue.filter('flow',(n)=>{
    //判断文本是否超出，超出显示...
    if(n.length>=16){
        let str=n.substr(0,18)+'...';
        return str
    };
    return n
})