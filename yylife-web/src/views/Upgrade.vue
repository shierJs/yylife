<template>
    <div>
        <div class="wrapper">
            <h2 class="title">你的浏览器版本太低，无法显示当前内容，请升级浏览器</h2>
            <ul class="browser-list clear">
                <li class="item fl">
                    <a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-IE"></use>
                    </svg>
                    <span>IE10</span>
                    </a>
                </li>
                <li class="item fl">
                    <a href="http://www.firefox.com.cn/" target="_blank">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huohuliulanqifirefox"></use>
                    </svg>
                    <span>火狐</span>
                    </a>
                </li>
                <li class="item fl">
                    <a href="http://browser.360.cn/" target="_blank">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test"></use>
                    </svg>
                    <span>360</span>
                    </a>
                </li>
                <li class="item fl">
                    <a href="//www.google.cn/chrome/browser/desktop/index.html" target="_blank">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-Chrome"></use>
                    </svg>
                    <span>chrome</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .wrapper{
        position: absolute;
        top:300px;
        width:100%;
        .title{
            font-size:26px;
            text-align: center;
            margin:20px 0;
        }
        .browser-list{
            margin:0 auto;
            width:500px;
            .item{
                a{
                    display: block;
                }
            }
        }
    }
</style>