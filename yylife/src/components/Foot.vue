<template>
    <div>
        <footer id="foot">
            <div class="item" v-for="(v,index) in navData" :key="index" @click="$router.push(v.push)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="index===idx?v.iconSelect:v.icon"></use>
                </svg>
                <p :class="['active',{on:index===idx}]">{{v.name}}</p>
            </div>
            <div class="bg"></div>
        </footer>
    </div>
</template>

<script>
    export default {
        props:["idx"],
        data(){
            return {
                navData:[
                    {
                        "name":"首页",
                        "push":"/",
                        "icon":"#icon-zhuye",
                        "iconSelect":"#icon-zhuye-copy"
                    },
                     {
                        "name":"购物车",
                        "push":"/cart",
                        "icon":"#icon-gouwuche",
                        "iconSelect":"#icon-gouwuche-copy"
                    },
                     {
                        "name":"发布",
                        "push":"/release",
                        "icon":"#icon-fabu",
                        "iconSelect":"#icon-fabu"
                    },
                    {
                        "name":"发现",
                        "push":"/headlines/0",
                        "icon":"#icon-faxian1",
                        "iconSelect":"#icon-faxian1-copy"
                    },
                     {
                        "name":"我的",
                        "push":"/mine",
                        "icon":"#icon-gerenzhongxin",
                        "iconSelect":"#icon-gerenzhongxin-copy"
                    },
                ],
            }
        }
    }
</script>

<style scoped lang="less">
    #foot{
        width:100%;
        position: fixed;
        z-index:10086;
        bottom:0;
        left:0;
        background: #fff;
        display: flex;
        align-items: flex-end;
        padding:20px 36px 20px;
        justify-content:space-between;
        box-shadow:0px -3px 0px 0px #e0e0e0;
        .item{
            display: flex;
            flex-direction:column;
            align-items: center;
            position: relative;
            width:80px;
            .icon{
                width:44px;
                height:44px;
            }
            .active{
                margin-top:12px;
                font-size:24px;
                color:#707070;
            }
            .on{
                color:#18cebe;
            }
        }
        .item:nth-child(3){
            .icon{
                width:86px;
                height:86px;
                position: absolute;
                top:-84px;
            }
        }
        .bg{
            position: absolute;
            width:94px;
            height:94px;
            border-radius: 45px;
            background: #fff;
            left:50%;
            transform: translateX(-47px);
            top:-28px;
            z-index: -1;
            box-shadow:0px -3px 0px 0px #e0e0e0;
        }
    }
</style>