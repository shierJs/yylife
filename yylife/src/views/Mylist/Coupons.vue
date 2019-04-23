<template>
    <div>   
        <Head :title="title"></Head>
        <transition name="fade2">
            <div id="main" v-show="show">
                <!-- <div class="nav">
                    <p class="bar" :class="{active:i==id}" @click="tab(i)" v-for="(v,i) in navbar" :key="i">{{v}}</p>
                </div>
                <div class="list">
                    <div class="content" v-for="(item,index) in coupons[id].item" :key="index">
                        <div class="left">
                            <p class="amount">
                                <span class="currency">￥</span>
                                {{item.amount}}
                            </p>
                            <span class="sub">{{item.sub}}</span>
                            <span class="class">({{item.class}})</span>
                        </div>
                        <div class="center">
                            <p class="title">{{item.title}}</p>
                            <p class="desc">{{item.desc}}</p>
                            <span class="validity">有效期：{{item.validity}}</span>
                            <p class="explain">!</p>
                        </div>
                        <div class="right">
                            <p>{{item.use}}</p>
                        </div>
                        <div class="round top"></div>
                        <div class="round bottom"></div>
                    </div>
                </div> -->
                <div class="bg">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-meiyouyouhuiquan"></use>
                    </svg>
                    <p class="txt">没有可用的优惠券哦</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Head from "@/components/Head"
    export default {
        data(){
            return {
                title:"领券中心",
                show:false,
                id:0,

                navbar:[
                    "待使用",
                    "待领取"
                ],
                coupons:[
                    {
                        item:[
                            {
                                "amount":"8",
                                "sub":"直减8",
                                "class":"直减券",
                                "title":'8元无门槛现金券',
                                "desc":'新人见面礼-8元无门槛现金券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即使用"
                            },
                            {
                                "amount":"20",
                                "sub":"满199减20",
                                "class":"满减券",
                                "title":'20元优惠券',
                                "desc":'新人见面礼-满199减20元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即使用"
                            },
                            {
                                "amount":"30",
                                "sub":"满299减30",
                                "class":"满减券",
                                "title":'30元优惠券',
                                "desc":'新人见面礼-299减30元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即使用"
                            },
                            {
                                "amount":"50",
                                "sub":"满599减50",
                                "class":"满减券",
                                "title":'50元优惠券',
                                "desc":'新人见面礼-满599减50元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即使用"
                            },
                            {
                                "amount":"120",
                                "sub":"满1299减120",
                                "class":"满减券",
                                "title":'120元优惠券',
                                "desc":'新人见面礼-满1299减120元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即使用"
                            },
                        ],
                    },
                    {
                        item:[
                            {
                                "amount":"20",
                                "sub":"满199减20",
                                "class":"满减券",
                                "title":'20元优惠券',
                                "desc":'新人见面礼-满199减20元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即领取"
                            },
                            {
                                "amount":"50",
                                "sub":"满599减50",
                                "class":"满减券",
                                "title":'50元优惠券',
                                "desc":'新人见面礼-满599减50元优惠券',
                                "validity":"2018.03.11-2018.03.18",
                                "use":"立即领取"
                            },
                        ],
                    }
                ]
            }
        },
        methods:{
            tab(i){
                this.id=i;
            },
            count(){
                for(let i=0;i<this.navbar.length;i++){
                    this.navbar[i]=`${this.navbar[i]} (${this.coupons[i].item.length})`
                }
            },
        },

        mounted(){
            this.show=true;
            this.count();
        },
        components:{
            Head
        }
    }
</script>

<style scoped lang="less">
    #main{
        padding:110px 32px 60px;
        background: #F5F5F5;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        .bg{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .icon{
                width:300px;
                height:300px;
                margin:0 auto;
            }
            .txt{
                font-size:30px;
                color:#5c5c5c;
            }
        }
        .nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width:100%;
            border:2px solid #FF8D1A;
            .bar{
                height:54px;
                line-height: 54px;
                text-align: center;
                font-size:22px;
                color:#393939;
                width:50%;
                background: #fff;
            }
            .active{
                background: #FF8D1A;
                color:#fff;
            }
        }
        .list{
            margin:52px 20px 0;
            .content{
                width:100%;
                height:164px;
                background:#E1972A;
                border-radius: 10px;
                margin-bottom:32px;
                display: flex;
                align-items: center;
                color:#fff;
                position: relative;
                .left{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width:184px;
                    .amount{
                        position: relative;
                        font-size:40px;
                        font-weight: 700;
                        .currency{
                            font-size:20px;
                            font-weight: 100;
                            position: absolute;
                            top:0;
                            left:-20px;
                        }
                    }
                    span{
                        font-size:16px;
                    }
                }
                .center{
                    font-size:18px;
                    width:320px;
                    position: relative;
                    .title{
                        font-size:24px;
                    }
                    .desc{
                        line-height:40px;
                    }
                    .explain{
                        position: absolute;
                        width:20px;
                        height:20px;
                        border:1px solid #fff;
                        border-radius:10px;
                        right:20px;
                        top:50%;
                        transform: translateY(-50%);
                        text-align: center;
                        line-height: 20px;
                    }
                }
                .right{
                    width:148px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    p{
                        width:50px;
                    }
                }
                .round{
                    position: absolute;
                    width:28px;
                    height:28px;
                    background: #f5f5f5;
                    border-radius:14px;
                    right:132px;
                }
                .top{
                    top:-14px;
                }
                .bottom{
                    bottom:-14px;
                }
            }
        }
    }
</style>