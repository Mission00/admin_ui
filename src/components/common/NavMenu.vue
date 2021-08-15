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
                <i class="el-icon-user"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item index="/userlist" ><i class="el-icon-user"></i>普通用户管理</el-menu-item>
            <el-menu-item index="/adminlist"><i class="el-icon-user-solid"></i>管理员管理</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-user"></i>
                <span>影片管理</span>
            </template>
            <el-menu-item index="/movielist">
              <i class="el-icon-menu"></i>
              <span slot="title">影片列表</span>
            </el-menu-item>
            <el-menu-item index="/otherlist">
              <i class="el-icon-menu"></i>
              <span slot="title">分类列表</span>
            </el-menu-item>
        </el-submenu>

        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">资讯管理</span>
        </el-menu-item>

        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">帖子管理</span>
        </el-menu-item>

        
        <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">角色管理</span>
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