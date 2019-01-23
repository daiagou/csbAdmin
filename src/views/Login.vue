<template>
    <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-input type="text" v-model="loginForm.code" auto-complete="off" placeholder="密码"></el-input>
                </el-col>
                <!--<el-col :span="8">-->
                    <!--<el-button style="width: 100%;" type="primary" v-on:click="getCode">获取验证码</el-button>-->
                <!--</el-col>-->
            </el-row>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin,getLoginCode} from '../api/api';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {

                logining: false,
                loginForm: {
                    account: '',
                    code: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    code: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {

            getCode(e) {
                if (e.target.innerText != '获取验证码') {
                    return;
                }
                e.target.innerText = '60';



                // var getCodeData = {'phone':this.loginForm.account}
                var getCodeData = 'phone='+this.loginForm.account;
                getLoginCode(getCodeData).then(data => {
                    console.log(data)
                    console.log(JSON.stringify(data))
                    data=eval(data)
                    console.log(data.message)
                    console.log(data.status)
                    if (data.status != 0) {
                        e.target.innerText = '获取验证码'
                       this.$alert(data.message);
                       return;
                    }else{
                        var i = 59;
                        var myVar = setInterval(function () {
                            myTimer()
                        }, 1000);

                        function myTimer() {
                            e.target.innerText = i;
                            i = i - 1;
                            if (i <= -1) {
                                clearInterval(myVar);
                                e.target.innerText = '获取验证码';
                            }
                        }
                    }
                });






            },


            handleReset2() {
                this.$refs.loginForm.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams ={'username': this.loginForm.account, 'password': this.loginForm.code} ;
                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            console.log(data)
                            if (data.status != 0) {
                                this.$alert(data.message);
                            } else {
                                let  user = {
                                    id: 1,
                                    username: this.loginForm.account,
                                    password: '',
                                    avatar: '',
                                    name: this.loginForm.account
                                };
                                sessionStorage.setItem('user', JSON.stringify(user));
                                console.log("push")
                                this.$router.push({path: '/goods'});
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
