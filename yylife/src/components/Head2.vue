<template>
    <div>
        <header id="head">
            <van-icon name="arrow-left" @click="cancel" />
            <p class="title">{{title}}</p>
            <slot></slot>
        </header>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import { Icon } from "vant";
    export default {
        props:{
            title:{
                type:String,
                default:"我是标题"
            }
        },
        methods:{
            cancel(){
                this.$dialog.confirm({
                title: '确认退出发布吗',
                message: '三思哦'
                }).then(() => {
                // on confirm
                    this.resetTxt();
                    this.$router.go(-1);
                }).catch(() => {
                // on cancel

                });
            },
            ...mapMutations(['resetTxt'])
        },
        components:{
            [Icon.name]:Icon
        }
    }
</script>

<style scoped lang="less">
#head{
    height:90px;
    width:100%;
    position:fixed;
    top:0;
    left:0;
    display: flex;
    align-items: center;
    padding: 0 40px;
    justify-content: space-between;
    font-size:30px;
    background: #fff;
    z-index: 200;
    border-bottom: 1px solid #33383e;
    .title{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        font-size:32px;
    }
}
</style>