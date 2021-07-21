<template>
    <el-menu
    router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="min-height:100%;">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item index="/userlist" >普通用户</el-menu-item>
            <el-menu-item index="/adminlist">管理员</el-menu-item>
        </el-submenu>

        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">影片管理</span>
        </el-menu-item>

        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">资讯管理</span>
        </el-menu-item>

        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">帖子管理</span>
        </el-menu-item>
        
    </el-menu>
</template>

<script>
import {getStore} from '../libs/storage';
  export default {
    name:'NavMenu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>