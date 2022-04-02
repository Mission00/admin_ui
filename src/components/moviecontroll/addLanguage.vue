<template>
    <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加语言</el-button>
    <el-dialog
      title="添加语言"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="languageForm" :rules="rules" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="name">
          <el-input type="text" v-model="languageForm.language"
                    auto-complete="off" placeholder="语言名"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="createLanguage">添加</el-button>
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
          name: [{required: true, message: '语言名不能为空', trigger: 'blur'}]
        },
        checked: true,
        languageForm: {
          language: '',
        },
        loading: false
      }
    },
    methods: {
      clear () {
        this.languageForm = {
          language:'',
        }
      },
      createLanguage () {
        console.log(this.languageForm)
        this.$axios
          .post('/addLanguage',this.languageForm)
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