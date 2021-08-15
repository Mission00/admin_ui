<template>
  <div>
      <el-row>      
        <el-col span="12">
            <el-card style="height:50%">
                <el-table
                    :data="language"
                    border
                    >
                    <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="language"
                    label="语言"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="300">
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
                        <el-button @click="deleteLanguage(scope.row)" type="text" size="small" >删除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>   
          </el-card>
        </el-col>
          <el-col span="12">
              <el-card >
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
                width="300">
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
                    <el-button type="text" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
              </el-card>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name:'otherList',
    data(){
        return{
            language:[],
            category:[],
        }
    },

    created: function(){
        this.getLanguage()
        this.getCategory()
    },
    methods:{
        getLanguage(){
          this.$axios.get('/getlanguage').then(resp => {
            this.language = resp.data
          })
        },
        getCategory(){
            this.$axios.get('/getcategory').then(resp => {
            this.category = resp.data
            console.log(this.language)
            console.log(this.category)
          })
        },

        deleteLanguage(val){
            console.log(val)
            this.$axios.get('/deletelanguage',{
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
        deleteCategory(val){
            console.log(val)
            this.$axios.get('/deletecategory',{
                params:{
                    id:val.id
                }
            }).then(resp=>{
                if(resp.data.code==200){
                    this.$message({message:'成功',type:'success'})
                    this.getLanguage()
                }else if(resp.data.code==400){
                    this.$message({message:resp.data.data,type:'error'})
                }
                
            })
        },

        updateLanguage(){

        },
        updateCategory(){

        },

        insertLanguage(){

        },
        insertCategory(){

        },
    }
}
</script>

<style>

</style>