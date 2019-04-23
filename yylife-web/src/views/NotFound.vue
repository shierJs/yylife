<template>
    <div>
        <div class="wrap">
            <img src="../../static/img/timg.jpg" alt="页面不存在或者数据加载失败">
            <div class="btns">
                <p @click="back">返回上一级</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
.wrap{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #fff;
    z-index: 10086;
    overflow: hidden;
    img{
        position: absolute;
        top:100px;
        left:50%;
        transform: translateX(-50%);
    }
    .btns{
        width: 700px;
        height: 50px;
        background: #fff;
        position: absolute;
        top:600px;
        left:50%;
        transform: translateX(-50%);
        p{
            text-align: center;
            line-height: 50px;
            font-size: 25px;
            font-weight: 600;
            color:#37AAFB;
        }
        p:hover{
            cursor: pointer;
            color: #b4a078;
        }
    }
}
</style>