<template>
    <div>
        <Head :title="title"></Head>
        <transition name="fade">
            <div id="main" v-show="show">
                <Upload @get="get"></Upload>
                <p class="news">您今天还可免费发帖2条，本月还可免费发帖3条。</p>
                <div class="form">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="full-rent">
                        <el-form-item label="小区" prop="name" class="item">
                            <el-input v-model="ruleForm.name" placeholder="1-30个字符"></el-input>
                        </el-form-item>
                        <!-- 小区名称 -->
                        <el-form-item label="区域" prop="name" class="item">
                            <el-input v-model="ruleForm.area" placeholder="如 岳麓 天马山"></el-input>
                        </el-form-item>
                        <!-- 小区所在区域 -->
                        <el-form-item label="户型" required class="item com1">
                            <el-form-item prop="room">
                                <el-input v-model.number="ruleForm.room"></el-input>室
                            </el-form-item>
                            <el-form-item prop="hall">
                                <el-input v-model.number="ruleForm.hall"></el-input>厅
                            </el-form-item>
                            <el-form-item prop="wei">
                                <el-input v-model.number="ruleForm.wei"></el-input>卫
                            </el-form-item>
                        </el-form-item>
                        <!-- 房间的户型 -->
                        <el-form-item label="面积" prop="acreage" class="item com1 com">
                            <el-input v-model.number="ruleForm.acreage"></el-input>
                            <span>平/方</span>
                        </el-form-item>
                        <!-- 房屋面积 -->
                        <el-form-item label="租金" prop="rent" class="item com1 com">
                            <el-input v-model.number="ruleForm.rent"></el-input>
                            <span>元/月</span>
                        </el-form-item>
                        <!-- 房屋租金 -->
                        <el-form-item label="付款方式" prop="region" class="item">
                            <el-select v-model="ruleForm.region" placeholder="押一付一">
                            <el-option label="押一付一" value="1/1"></el-option>
                            <el-option label="押一付三" value="1/3"></el-option>
                        </el-select>
                        </el-form-item>
                        <!-- 付款方式 -->
                        <el-form-item label="标题" prop="title" class="item">
                            <el-input v-model="ruleForm.title" placeholder="1-30个字符"></el-input>
                        </el-form-item>
                        <!-- 发布文名称 -->
                        <el-form-item label="描述" prop="desc" class="item">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <!-- 房源描述 -->
                        <el-form-item label="租房标签" prop="name" class="item">
                            <span @click="showpop" class="showpop">请选择至少三个标签</span>
                            <van-popup v-model="pop" position="bottom" class="pop">
                                <div class="head-pop">
                                    <p @click="cancel">取消</p>
                                    <p @click="confirm">确认</p>
                                </div>
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="复选框 A"></el-checkbox>
                                    <el-checkbox label="复选框 B"></el-checkbox>
                                    <el-checkbox label="复选框 C"></el-checkbox>
                                    <el-checkbox label="复选框 D"></el-checkbox>
                                    <el-checkbox label="复选框 E"></el-checkbox>
                                    <el-checkbox label="复选框 F"></el-checkbox>
                                    <el-checkbox label="复选框 G"></el-checkbox>
                                    <el-checkbox label="复选框 H"></el-checkbox>
                                    <el-checkbox label="复选框 I"></el-checkbox>
                                    <el-checkbox label="复选框 J"></el-checkbox>
                                    <el-checkbox label="复选框 K"></el-checkbox>
                                    <el-checkbox label="复选框 L"></el-checkbox>
                                    <el-checkbox label="复选框 M"></el-checkbox>
                                    <el-checkbox label="复选框 N"></el-checkbox>
                                    <el-checkbox label="复选框 O"></el-checkbox>
                                </el-checkbox-group>
                            </van-popup>
                        </el-form-item>
                        <!-- 小区名称 -->
                        <el-form-item label="联系人" prop="contact" class="item">
                            <el-input v-model="ruleForm.contact" placeholder="至少两个字"></el-input>
                        </el-form-item>
                        <!-- 联系人名称 -->
                        <el-form-item label="手机号" prop="phone" class="item">
                            <el-input v-model.number="ruleForm.phone" placeholder="1xx xxxx xxxx"></el-input>
                        </el-form-item>
                        <!-- 手机号 -->
                        <el-form-item label="电话隐私保护" prop="delivery" class="item">
                            <i class="iconfont icon-wenhao"></i>
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <!-- 电话是否保护 -->
                        <el-form-item label="身份" prop="identity" class="item">
                            <el-radio-group v-model="ruleForm.identity">
                                <el-radio label="房东"></el-radio>
                                <el-radio label="经纪人"></el-radio>
                                <el-radio label="转租"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 发布者身份 -->
                        <el-form-item class="btn">
                            <el-button type="warning" @click="submitForm('ruleForm')">发布</el-button>
                        </el-form-item>
                        <!-- 提交按钮 -->
                    </el-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Head from "@/components/Head"
import Upload from "@/components/Upload"
import {Toast} from "vant"
    export default {
        data(){
            return {
                title:"整套出租",
                show:false,
                pop:false,
                ruleForm: {
                    name: '',
                    area:'',
                    region: '',
                    acreage: '',
                    rent:'',
                    room:'',
                    hall:'',
                    wei:'',
                    delivery: false,
                    identity:'',
                    desc: '',
                    imgSrc:[],
                    checkList:[],
                },
                checkList:[],
                rules: {
                    name: [
                        { required: true, message: '请输入小区名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请输入所在区域', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    room:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    hall:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    wei:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    region: [
                        { required: true, message: '请选择付款方式', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入发布名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    acreage:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    rent:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    identity: [
                         { required: true, message: '请选择身份', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写房源描述', trigger: 'blur' }
                    ],
                    contact: [
                        { required: true, message: '请输入联系人名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '手机号不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                }
            }
        },
        methods:{
            get(value){
               this.ruleForm.imgSrc=value;
            },
            showpop(){
                this.pop=true;
            },
            cancel(){
                this.pop=false;
                this.checkList=[];
            },
            confirm(){
                this.ruleForm.checkList=this.checkList;
                this.pop=false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.ruleForm.checkList.length<3){
                        Toast('请选择标签')
                    }
                    console.log(this.ruleForm)
                    
                } else {
                    Toast('请填写信息')
                    console.log('error submit!!');
                    return false;
                }
                });
            },
        },
        mounted(){
            this.show=true;
        },
        components:{
            Head,
            Upload
        }
    }
</script>

<style scoped lang="less">
    #main{
        padding-top:90px;
        .news{
            width:100%;
            background: #ccc;
            color:#505050;
            line-height:66px;
            height:66px;
            font-size:26px;
            padding:0 60px;
            margin-top:36px;
        }
        .form{
            margin-top:20px;
            padding:0 20px;
            .showpop{
                font-size:24px;
                color:#C0C4CC;
            }
            .pop{
                padding:0 32px;
                .head-pop{
                    display: flex;
                    width:100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height:88px;
                    font-size:24px;
                    color:#1989FA;
                }
            }
        }
    }
</style>