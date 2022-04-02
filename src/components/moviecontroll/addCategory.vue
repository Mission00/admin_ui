<template>
    <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加分类</el-button>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="categoryForm" :rules="rules" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="name">
          <el-input type="text" v-model="categoryForm.category"
                    auto-complete="off" placeholder="分类名"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="createCategory">添加</el-button>
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
          name: [{required: true, message: '分类名不能为空', trigger: 'blur'}]
        },
        checked: true,
        categoryForm: {
          category: '',
        },
        loading: false
      }
    },
    methods: {
      clear () {
        this.categoryForm = {
          category:'',
        }
      },
      createCategory () {
        console.log(this.categoryForm)
        this.$axios
          .post('/addCategory',this.categoryForm)
          .then(resp => {
            if (resp.status  === 200) {
              this.$alert("成功", '提示', {
                confirmButtonText: '确定'
              })
              this.clear()
              this.$emit('onSubmit')
            } else {
              this.$alert("", '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failResponse => {})
        this.dialogFormVisible = false
      }
    }
}
</script>

<style>

</style>