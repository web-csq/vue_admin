<template>
    <div class="login-vue">
        <div class="container">
            <p class="title">学情分析系统</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
        <particles></particles>
        <web-footer></web-footer>
    </div>
</template>

<script>
import Particles from '@/components/Particles/index'
import WebFooter from "./WebFooter/index"
import { login } from "@/api/user"
import { mapState,mapMutations } from "vuex"
export default {
    name: 'login',
    data() {
        return {
            account: 'admin',
            pwd: '123456',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
        }
    },
    created() {
        
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
      ...mapMutations("app",["ADDPERMISSIONLIST"]),
        verifyAccount(e) {
            if (this.account==="") {
                this.accountError = '账号不能为空';
                return false
            }else{
              return true
            }
        },
        verifyPwd(e) {
            if (this.pwd.length<6) {
                this.pwdError = '密码不能小于6位';
                return false
            }else{
              return true
            }
        },
        register() {
           
        },
        forgetPwd() {
            
        },
        async submit() {
          this.isShowLoading = true;
          if(this.verifyAccount()&&this.verifyPwd()){
            login({
              username:this.account,
              password:this.pwd
            }).then(res=>{
              this.isShowLoading = false;
              let data=res.data;
               sessionStorage.setItem('userImg',data.user.pic);
               sessionStorage.setItem('userName', data.user.trueName);
               sessionStorage.setItem('token', 'loginin');
               this.ADDPERMISSIONLIST(data.permissionList);
               this.$router.push({path: '/moduleshow'})
               
            });
          }else{
            this.verifyAccount();
            this.verifyPwd();
            this.isShowLoading = false;
          }
          
            
        }
    },
    components:{
        Particles,
        WebFooter
    }
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .2);
    width: 400px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
    margin-top:-10rem;
    position: relative;
    z-index: 2;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


