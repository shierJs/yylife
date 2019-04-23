export default {
    access_token:"",
    refresh_token:"",
    setAtoken(access_token){
        this.access_token=access_token;
    },
    setRtoken(refresh_token){
        this.refresh_token=refresh_token;
    },
    removeToken(){
        this.access_token="";
        this.refresh_token="";
        localStorage.removeItem("tokens");
    },
}