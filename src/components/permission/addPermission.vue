<template>
    <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加角色</el-button>
    <el-dialog
      title="添加权限"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="permissionForm" :rules="rules" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="name">
          <el-input type="text" v-model="permissionForm.name"
                    auto-complete="off" placeholder="权限名"></el-input>
        </el-form-item>
        <el-form-item prop="desc">
          <el-input type="text" v-model="permissionForm.desc"
                    auto-complete="off" placeholder="权限描述"></el-input>
        </el-form-item>
        <el-form-item prop="url">
          <el-input type="text" v-model="permissionForm.url"
                    auto-complete="off" placeholder="API"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="addPermission">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
 name: 'addRole',
    data () {
      return {
        dialogFormVisible: false,
        rules: {
          name: [{required: true, message: '权限名不能为空', trigger: 'blur'}]
        },
        checked: true,
        permissionForm: {
          name: '',
          desc: '',
          url:''
        },
        loading: false
      }
    },
    methods: {
      clear () {
        this.roleForm = {
          id:'',
          name: '',
          desc: '',
          url:''
        }
      },
      addPermission () {
          console.log(this.permissionForm)
        this.$axios
          .post('/addPermission', this.permissionForm)
          .then(resp => {
            if (resp.status === 200) {
              this.$alert('成功', '提示', {
                confirmButtonText: '确定'
              })
              this.clear()
              this.$emit('onSubmit')
            } else {
              this.$alert('失败', '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
        this.dialogFormVisible = false
      }
    }
}
</script>

<style>

</style>