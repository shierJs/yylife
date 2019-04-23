import axios from 'axios'
const URL='/api'

async  function getData(){
    let res=await axios.get(URL);
    return res;
} 

export default {
    getData
}