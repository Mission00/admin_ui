<template>
  <div>
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
            :data="category"
            border
            >
            <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150">
            </el-table-column>
            <el-table-column
            prop="category"
            label="分类"
            width="150">
            </el-table-column>
            <el-table-column
            label="操作"
            fit>
            <template slot="header">
                <el-row :gutter="10">
                    <el-col span="18">
                        <el-input
                        v-model="C_searchMsg"
                        size="mid"
                        placeholder="输入关键字搜索"/>
                    </el-col>
                    <el-col span="5">
                        <el-button>添加</el-button>
                    </el-col>
                </el-row>
            </template>
            <template slot-scope="scope">
                <el-button @click="deleteCategory(scope.row)" type="text" size="small" >删除</el-button>
                <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
          <add-category @onSubmit="getCategory()"></add-category> 
        <div style="text-align:left">
            <el-dialog
            title="修改分类 "
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
                <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="updateCategory">修改</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
        </div>
        </el-card>
  </div>
</template>

<script>
import addCategory from './addCategory.vue'

export default {
    name:'categoryList',
    components:{addCategory},
    data(){
        return{
            category:[],
            dialogFormVisible:false,
            categoryForm: {},
        }
    },

    created: function(){
        this.getCategory()
    },
    methods:{
        getCategory(){
            this.$axios.get('/getcategory').then(resp => {
            this.category = resp.data
            console.log(this.category)
          })
        },

        deleteCategory(val){
            console.log(val)
            this.$axios.get('/deletecategory',{
                params:{
                    id:val.id
                }
            }).then(resp=>{
                if(resp.data.code==200){
                    this.$message({message:'成功',type:'success'})
                    this.getCategory()
                }else if(resp.data.code==400){
                    this.$message({message:resp.data.data,type:'error'})
                }
                
            })
        },
            editClick(Category){
                this.dialogFormVisible = true
                this.categoryForm = Category
            },

            updateCategory () {
                console.log(this.categoryForm)
                this.$axios
                .post('/updateCategory',this.categoryForm)
                .then(resp => {
                    if (resp.status  === 200) {
                    this.$alert("成功", '提示', {
                        confirmButtonText: '确定'
                    })
                    } else {
                    this.$alert("失败", '提示', {
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