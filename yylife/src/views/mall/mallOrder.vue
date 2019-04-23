<template>
    <div>
        <Head :title="title"></Head>
        <transition name="fade">
            <div id="main" v-show="show">
                
            </div>
        </transition>
    </div>
</template>

<script>
    import Head from "@/components/Head"
    export default {
        data(){
            return {
                title:"全部订单",
                show:false,
            }
        },
        methods:{},
        mounted(){
            this.show=true;
        },
        components:{
            Head
        }
    }
</script>

<style scoped>

</style>