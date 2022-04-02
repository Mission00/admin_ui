<template>
  <div>

    <el-dialog :visible.sync="dialogFormVisible" title="修改角色">
      <el-form v-model="selectedRole" style="text-align:left">
        <el-form-item label="角色名" label-width="120px" prop="name">
          <el-input v-model="selectedRole.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name_zh">
          <el-input v-model="selectedRole.name_zh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-card>
         <el-table
          :data="roles"
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
            label="角色名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name_zh"
            label="角色描述">
          </el-table-column>
          <el-table-column
            label="操作"
            fit>
            <template slot-scope="scope">
                <el-button @click="deleteRole(scope.row)" type="text" size="small" >删除</el-button>
                <el-button type="text" size="small" @click="updateButtonClick(scope.row)">编辑</el-button>
            </template>
            </el-table-column>
         </el-table>
         <add-role @onSubmit="getAllRole()"></add-role>
    </el-card>
  </div>
</template>

<script>
import addRole from './addRole.vue'
export default {
    name:"roleList",
    components:{addRole},
    data(){
        return{
            dialogFormVisible:false,
            perms:[],
            roles:[],
            selectedRole:[],
            selectedPermsIds:[],
            menus:[],
            selectedMenusIds:[],
            props: {
              id: 'id',
              label: 'nameZh',
              children: 'children'
            },
        }       
    },
    mounted(){
        this.getAllRole()
        this.getAllPerms()
        this.getAllMenu()//用角色1获取全部菜单
    },
    methods:{
        getAllRole(){
          console.log("获取角色")
          this.$axios.get('/getAllRole').then(resp => {
            if(resp && resp.status === 200){
              this.roles=resp.data;
              console.log(this.roles)
            }else{
              this.$message({message:'角色获取错误',type:'error'})
            }
          })
        },
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
        getMenuByRid(rid){
          console.log("获取菜单")
          this.$axios.get('/role/getAllMenu',{
            params:{
              rid:rid
            }
          }).then(resp => {
            if(resp.status===200 && resp.data){
              console.log("菜单获取成功")
              this.menus = resp.data
              console.log(this.menus)
            }else{
              console.log("获取菜单失败")
            }
            
          })
        },
        getAllMenu(){
          console.log("获取全部菜单")
          this.$axios.get('/role/allMenu').then(resp => {
            if(resp.status===200 && resp.data){
              console.log("菜单获取成功")
              this.menus = resp.data
              console.log(this.menus)
            }else{
              console.log("获取菜单失败")
            }
            
          })
        },
        updateButtonClick(role){
            this.dialogFormVisible = true
            this.selectedRole = role
            let permIds = []
            for (let i = 0; i < role.perms.length; i++) {
              permIds.push(role.perms[i].id)
            }
            this.selectedPermsIds = permIds

            let menuIds = []
            for (let i = 0; i < role.menus.length; i++) {
              menuIds.push(role.menus[i].id)
              for (let j = 0; j < role.menus[i].children.length; j++) {
                menuIds.push(role.menus[i].children[j].id)
              }
            }
            this.selectedMenusIds = menuIds
            console.log(this.selectedMenusIds)
            // 判断树是否已经加载
            // 第一次打开对话框前树不存在，无法调用方法，需要通过设置 default-checked 正确选中菜单项
            if (this.$refs.tree) {
              this.$refs.tree.setCheckedKeys(menuIds)
            }
        },
        updateRole(){
          let perms = []
          console.log("处理perms")
          for (let i = 0; i < this.selectedPermsIds.length; i++) {
            for (let j = 0; j < this.perms.length; j++) {
              if (this.selectedPermsIds[i] === this.perms[j].id) {
                perms.push(this.perms[j])
              }
            }
          }
          this.selectedRole.perms = perms
          console.log(this.selectedRole)

          this.$axios.post('/role/updateRole',this.selectedRole).then(resp=>{
            if(resp.status===200){
              this.$message('权限更新')
            }
            
          })
          this.$axios.put('/role/updateMenu?rid='+this.selectedRole.id,{
            menusIds: this.$refs.tree.getCheckedKeys()
          }).then(resp=>{
            if(resp.status===200){
              this.$message('菜单更新')
              this.dialogFormVisible = false
              this.getAllRole()
            }
          })
        },
        deleteRole(role){
          this.$axios.post("/role/deleteRole",role).then(resp=>{
              if(resp.status===200){
                this.$message('角色删除成功')
                this.getAllRole()
              }else{
                 this.$message('角色删除失败')
              }
          })
        }
    }
    
}
</script>

<style>

</style>