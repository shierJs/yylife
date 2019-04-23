<template>
    <div>
        <Head :i="-1"></Head>
        <div id="main">
            <div class="wrap">
                <div class="breadcrumb">
                    <router-link to="/" class="link">首页</router-link>
                    <i class="iconfont icon-arrow-r-copy"></i>
                    <span>联系我们</span>
                </div>
                <div class="wrapper">
                    <p class="title">联系我们</p>
                    <ul class="list">
                        <li class="item">
                            <p class="name"><b>一、联系客服</b></p>
                            <div class="item-wrap">
                                <img src="../../static/img/material/about_3.jpg" alt="">
                                <p class="content">
                                    如果您有 <br>
                                   使用沂源生活中无法自行解决的问题；<br>
                                    请联系我们！<br>
                                    电话：{{contact.service_phone}}<br>   
                                    微信：{{contact.service_wechat}}<br>
                                    邮箱：{{contact.service_email}}<br>
                                </p>
                            </div>
                        </li>
                        <li class="item">
                            <p class="name"><b>二、广告位合作</b></p>
                            <div class="item-wrap">
                                <img src="../../static/img/material/about_1.jpg" alt="">
                                <p class="content">
                                    如果您是 <br>
                                    在沂源生活上购买广告位，<br>
                                    为自己或者公司的产品增加曝光度；<br>
                                    请联系我们！<br>
                                    电话：{{contact.ad_phone}}<br>
                                    微信：{{contact.ad_wechat}} <br>
                                    邮箱：{{contact.ad_email}}
                                </p>
                            </div>
                        </li>
                        <li class="item">
                            <p class="name"><b>三、市场合作</b></p>
                            <div class="item-wrap">
                                <img src="../../static/img/material/about_2.jpg" alt="">
                                <p class="content">
                                    如果您是 <br>
                                    在沂源生活上推广产品；<br>
                                    请联系我们！<br>
                                    电话：{{contact.service_phone}}<br>
                                    微信：{{contact.service_wechat}}<br>
                                    邮箱：{{contact.service_email}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from "@/components/Head"
    import getInfoApi from "@/api/getInfo";
    import Foot from "@/components/Foot";
    export default {
        data(){
            return {
                contact:{},
            }
        },
        methods:{
            getContact(){
                getInfoApi.getAboutSystem().then(res=>{
                    ;
                    if(res.data.code === 200){
                        this.contact=res.data.data;
                    }else{
                        this.$Message.info(res.data.msg);
                    }
                }).catch(err=>console.log(err));
            }
        },
        mounted(){
            this.getContact();
        },
        components:{
            Head,
            Foot
        }
    }
</script>

<style scoped lang="less">
#main{
    background: #f4f0ea;
    .wrap{
        .breadcrumb{
            line-height: 80px;
            font-size:14px;
            color:#999;
            .link{
                color:#333;
                font-size:14px;
            }
            .link:hover{
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .wrapper{
            border:1px solid #ddd;
            background: #fff;
            padding:40px;
            .title{
                font-size:20px;
            }
            .item{
                margin-top:40px;
                .name{
                    font-size:16px;
                    line-height: 40px;
                }
                .item-wrap{
                    .content{
                        display: inline-block;
                        font-size:16px;
                        line-height: 35px;
                        margin-left:40px;
                    }
                }
            }
        }
    }
}
</style>