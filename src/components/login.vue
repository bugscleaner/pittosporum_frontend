<template>
<div>
    <div id="app">
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div class="login_main">
        <el-form ref="accountFrom" v-model="account" :rules="rules" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <el-form-item prop="username">
                <el-input type="text"  v-model="account.username" auto-complete="off" placeholder="Account"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input type="password"  v-model="account.pwd" auto-complete="off" placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" v-on:click="handleLogin">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>
import {login} from "../api/user";
export default {
  name: 'login',
  data () {
    return  {
        login: false,
        account: {
          username: 'admin',
          pwd: 'NLkPJ1YfeXyZ9Aqb'
        },
        rules: {
          username: [
            {required: true, message: 'please input account', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: 'please input password', trigger: 'blur'},
          ]
        },
        checked: true
      };
  },
    methods:{
        handleLogin (){
            login({
                userName: this.account.username,
                userPwd: this.account.pwd
            }).then(() => {
                this.$router.push({
                    path : "/mgr"
                })
            }).catch(() => {
                alert("login has error")
            })
        }
    }
}
</script>


<style>
#app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

  .login_main{
    position: relative;
    left: 30px;
    top: 20px;
  }

  body{
    background: #DFE9FB;
  }
  .login-container{
    width:350px;
    margin-left:35%;
  }
</style>