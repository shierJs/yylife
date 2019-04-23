<template>
    <div>
        <div class="load" v-show="!show">
            <van-loading color="#67CF22" size="50px"/>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            show:{
                type:Boolean,
                default:true
            }
        }
    }
</script>

<style scoped>
.load{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10086;
    background: #fff;
}
</style>