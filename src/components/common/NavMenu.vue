<template>
    <!-- <el-menu
    router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="min-height:100%;">
        <el-submenu index="/1">
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
            <el-menu-item index="/categorylist">
              <i class="el-icon-menu"></i>
              <span slot="title">分类列表</span>
            </el-menu-item>
            <el-menu-item index="/languagelist">
              <i class="el-icon-menu"></i>
              <span slot="title">语言列表</span>
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
        
    </el-menu> -->
    <el-menu
      style="min-height:100%;"
      :default-active="currentPath"
      class="el-menu-admin"
      router
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="(item,i) in adminMenus">
        <!--index 没有用但是必需字段且为 string -->
        <el-submenu :key="i" :index="i + ''" style="text-align: left">
          <span slot="title" style="font-size: 17px;">
            <i :class="item.iconCls"></i>
            {{item.nameZh}}
          </span>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <i :class="child.icon"></i>
            {{ child.nameZh }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>

</template>

<script>
  export default {
    name:'NavMenu',

     computed: {
      adminMenus () {
        console.log(this.$store.state.adminMenus)
        return this.$store.state.adminMenus
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      currentPath () {
        return this.$route.path
      }
    }
  }
</script>