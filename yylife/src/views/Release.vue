<template>
    <div>
        <Head1 :title="tlt.v1" :subtitle="tlt.v2" :fn="fn"></Head1>
        <transition name="fade1">
            <div id="release" v-show="show">
                <div class="main">
                    <div class="cate" v-for="(v,index) in data" :key="index" @click="enterList(index)">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="v.icon"></use>
                        </svg>
                        <span>{{v.title}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <Foot :idx="2"></Foot>
    </div>
</template>

<script>
import Foot from '@/components/Foot'
import Head1 from '@/components/Head1'
    export default {
        data(){
            return {
                show:false,
                tlt:{
                    v1:"选择发布类别",
                    v2:"我的发布"
                },
                data:[
                    {
                        "icon": "#icon-ershouwupin",
                        "title": "二手物品"
                    },
                    {
                        "icon": "#icon-fangwuchuzu",
                        "title": "房屋出租"
                    },
                    {
                        "icon": "#icon-fangwumaimai",
                        "title": "房屋买卖"
                    },
                    {
                        "icon": "#icon-canyin",
                        "title": "餐饮广告"
                    },
                    {
                        "icon": "#icon-qiuzhizhaopin",
                        "title": "求职招聘"
                    },
                    {
                        "icon": "#icon-shenghuozhidao-",
                        "title": "生活服务"
                    }
                ]
            }
        },
        methods:{
            fn(){
                this.$router.push('/myRelease');
            },
            enterList(i){
                switch (i) {
                    case i=0:this.$router.push('/releaseUsed/0')
                    break;
                    case i=1:this.$router.push('/rental/0')
                    break;
                    case i=2:this.$router.push('/releaseHomeTrading/0')
                    break;
                    case i=3:this.$router.push('/catering/0')
                    break;
                    case i=4:this.$router.push('/recruitment/0')
                    break;
                    case i=5:this.$router.push('/service/0')
                    break;
                    default:
                    break;
                }
            }
        },
        created(){

        },
        mounted(){
            this.show=true;
        },
        components:{
            Head1,
            Foot
        }
    }
</script>

<style scoped lang="less">
    #release{
        width:100%;
        padding-top:90px;
        .main{
            display: flex;
            flex-wrap: wrap;
            padding:0 40px;
            padding-top:20px;
            justify-content: space-between;
            .cate{
                width:180px;
                display: flex;
                flex-direction:column;
                align-items: center;
                margin-bottom:20px;
                .icon{
                    height:100px;
                    margin-bottom:10px;
                    width:180px;
                }
                span{
                    font-size:26px;
                }
            }
        }
    }
</style>