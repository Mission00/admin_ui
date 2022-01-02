<template>
  <div>

    <el-dialog :visible.sync="dialogFormVisible" title="修改权限">
      <el-form v-model="selectedPermission" style="text-align:left">
        <el-form-item label="权限名" label-width="120px" prop="name">
          <el-input v-model="selectedPermission.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" label-width="120px" prop="name_zh">
          <el-input v-model="selectedPermission.desc" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item label="API" label-width="120px" prop="name_zh">
          <el-input v-model="selectedPermission.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePermission()">确 定</el-button>
      </div>
    </el-dialog>

    <el-card>
         <el-table
          :data="perms"
          border
          >
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="权限名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="权限描述">
          </el-table-column>
           <el-table-column
            prop="url"
            label="API">
          </el-table-column>
          <el-table-column
            label="操作"
            fit>
            <template slot-scope="scope">
                <el-button @click="deletePermission(scope.row)" type="text" size="small" >删除</el-button>
                <el-button type="text" size="small" @click="updateButtonClick(scope.row)">编辑</el-button>
            </template>
            </el-table-column>
         </el-table>
         <add-permission @onSubmit="getPermission()"></add-permission>
    </el-card>
  </div>
</template>

<script>
import addPermission from './addPermission.vue'
export default {
    name:"roleList",
    components:{addPermission},
    data(){
        return{
            dialogFormVisible:false,
            perms:[],
            selectedPermission:[],
            props: {
              id: 'id',
              label: 'nameZh',
              children: 'children'
            },
        }       
    },
    mounted(){
        this.getAllPerms()
    },
    methods:{
        getAllPerms(){
          console.log("获取所有权限")
          this.$axios.get('/getPermission').then(resp => {
            if(resp && resp.status === 200){
              this.perms=resp.data;
              console.log(this.perms)
            }else{
              this.$message({message:'权限获取错误',type:'error'})
            }
          })
        },
        updateButtonClick(permission){
            this.dialogFormVisible = true
            this.selectedPermission = permission
        },
        updatePermission(){
          console.log(this.selectedPermission)

          this.$axios.post('/updatePermission',this.selectedPermission).then(resp=>{
            if(resp.status===200){
              this.$message('权限更新')
            }else{
                this.$message('更新失败')
            }
            
          })
        },

        deletePermission(permission){
            this.$axios.post('/deletePermission',permission).then(resp=>{
                if(resp.status===200){
                    this.$message('删除成功')
                }else{
                    this.$message('删除失败')
                }
            })
        }
    }
    
}
</script>

<style>

</style>