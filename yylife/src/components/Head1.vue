<template>
    <div>
        <header id="head">
            <div class="arrow" @click="back">
                <img src="../../static/img/icon/arrow_left.png" alt="">
            </div>
            <h2>{{title}}</h2>
            <p class="subtitle" @click="fn">{{subtitle}}</p>
        </header>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:"选择发布类别"
            },
            subtitle:{
                type:String,
                default:""
            },
            fn:{
                type:Function
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    #head{
        width:100%;
        height:90px;
        display: flex;
        align-items: center;
        background: #e8e8e8;
        border-bottom:1px solid #d4d2d4;
        position: fixed;
        padding:0 40px;
        justify-content: space-between;
        top:0;
        left:0;
        z-index:10;
        color:#06c1ae;
        .arrow{
            width:50px;
            height:50px;
            img{
                width:100%;
            }
        }
        h2{
            font-size:30px;
            position: absolute;
            left:50%;
            transform: translateX(-50%);
        }
        .subtitle{
            font-size:28px;
        }
    }
</style>