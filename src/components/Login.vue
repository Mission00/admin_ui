<template>
  <div class="background">

  <el-card class="box-card-login">

    <div slot="header" class="clearfix" >
      <el-col :span="24" class="el-icon-user-solid">用户登录</el-col>
    </div>
      <div class="login-wrap">
          <el-form class="login-container" :model="loginForm"  v-loading="loading">
              <el-form-item>
                  <el-input type="text" v-model="loginForm.adminname" placeholder="账 号" clearable prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item >
                  <el-input type="password" v-model="loginForm.password" placeholder="密  码" show-password prefix-icon="el-icon-lock" @keydown.enter.native="searchEnterFun"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width: 100%;" v-on:click="submit">登录</el-button>
              </el-form-item>
              <el-row style="text-align: center; margin-top: -10px;">
                  <el-button type="text" @click="open">忘记密码</el-button>
              </el-row>
          </el-form>
      </div>
  </el-card>
  <el-row style="text-align: center; margin-top: 170px;">
            <p style="color:#F2F6FC"> @Designed by cmx at 2020.12.9</p>
  </el-row>
  </div>
  
</template>


<script>

import {setStore} from './libs/storage';
import {getStore} from './libs/storage';
//import {setCookie} from './libs/storage';
//import {mapActions} from 'vuex';

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          adminname: '',
          password: ''
        },
        responseResult: [],
        loading: false
      }
    },

    /*created() {
    // 按回车键实现登录的效果
    var _self = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13 || key == 100) {
        _self.submit('loginForm');
      }
    };
  },*/


    methods: {
      searchEnterFun(e){
      var keyCode = window.Event?e.keyCode:e.whitch;
      if(keyCode == 13)
      {
        this.loading = true
        this.submit();
      }
    },


      submit(){
        this.$axios.post('/adminlogin',{
          adminname:this.loginForm.adminname,
          password:this.loginForm.password,
        }).then(rep => {
          this.loading = false
          if(rep.data.code === 200)
          { 
            console.log(rep.data.data.adminid);
            console.log(rep.data.data.adminname);
            setStore("adminid",rep.data.data.adminid)
            setStore("adminname",rep.data.data.adminname)

            console.log(getStore("adminid"))
            console.log(getStore("adminname"))
            this.$router.replace('/home')
            this.$notify({
              title: '登录成功',
              message: '欢迎回来',
              position: 'top-left'
            });
          }
          else
          {
            this.$message.error('登录失败，用户名或者密码错误！');
          }
        })
      },
      open() {
        this.$alert('自己想', {
          confirmButtonText: '确定',
        });
      },
    }
  }
</Script>

<style>
.login-wrap{
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 400px;
}
.login-container{
  margin-top: 5%;
}
.box-card-login {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 320px;
  margin-top:12%
}
.background{
  background:url("../assets/background/background.jpg");
  width: 100%;
  height: 100%;
  position:absolute;
  background-size:100%;
  -webkit-background-size:100%;
}
.clearfix{
  height: 25px;
}
.el-col{
  font-size: 25px;
}

html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
}

  
</style>