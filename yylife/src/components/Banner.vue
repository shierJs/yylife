<template>
    <div class="banner">
            <el-carousel trigger="click">
            <el-carousel-item v-for="(v,index) in bannerData" :key="index">
                <img v-lazy="v.img" :key="v.img" alt="">
            </el-carousel-item>
            </el-carousel>
    </div>
</template>

<script>
	export default{
		props:{
			bannerData:{
				type:Array
			}
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		margin-top:84px;
		img{
			width:100%;
		}
	}
</style>