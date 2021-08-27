<template>
      <el-card style="margin: 18px 2%;width: 95%">
        <el-table
            :data="language"
            border
            style="width: 100%"
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
                <el-button @click="deleteLanguage(scope.row)" type="text" size="small" >删除</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>   
    </el-card>
</template>

<script>
export default {
    name:'languageList',
    data(){
        return{
            language:[],
        }
    },

    created: function(){
        this.getLanguage()
    },

    methods:{
        getLanguage(){
          this.$axios.get('/getlanguage').then(resp => {
            this.language = resp.data
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
    }

}
</script>

<style>

</style>