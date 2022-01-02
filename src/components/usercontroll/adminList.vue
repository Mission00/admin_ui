<template>
<div>

  <el-col span="4">
    <el-input
      placeholder="请输入内容"
      v-model.trim="searchMsg"
      v-on:input="fetchAdmin">
      <i slot="prefix" class="el-input__icon el-icon-search" id="search_input"></i>
    </el-input>
  </el-col>

  <el-table
    stripe
    ref="multipleTable"
    :data="admins"
    tooltip-effect="dark"
    style="width: 100%"
    height="600"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      sortable
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
    </el-table-column>
    <el-table-column
      prop="adminname"
      label="用户名"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注"
       >
    </el-table-column>
    <el-table-column
      label="状态"
       >
       <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isUsed"
            active-color="#13ce66"
            inactive-text='禁用'
            active-text="启用"
            @change="banCount(scope.row)"
            inactive-color="#ff4949">
          </el-switch >
       </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
            <el-button @click="deleteAdmin(scope.row)" type="danger" size="mini" >删除</el-button>
            <el-button size="mini" @click="updateButtonClick(scope.row)">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row :gutter="10" style="margin-top:20px">
    <el-col :span="2">
          <el-button type="danger" size="small" :disabled="multipleSelection.length==0? true:false" @click="deleteSelect()">删除所选</el-button>
    </el-col>
    <el-col :span="2">
        <el-button type="primary" size="small" @click="insertButtonClick()">新增管理员</el-button>
    </el-col>
</el-row>
<el-row>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</el-row>

        <!-- 修改信息的弹窗 -->
      <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" style="text-align:left">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.adminname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色分配" label-width="120px" prop="roles">
            <el-checkbox-group v-model="selectedRolesIds">
                <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.name_zh}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false,form = {}">取 消</el-button>
          <el-button type="primary" @click="UpdateOrInsert==1?insertAdmin():updateAdmin()">确 定</el-button>
        </div>
      </el-dialog>

</div>
</template>

<script>


// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

  export default {
    name:"adminList",
    data() {
      return {
        admins: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: '' ,
        searchMsg:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          adminname:'',
          password:'',
          remarks:'',
          isUsed:true,
        },
        loading:true,
        UpdateOrInsert:'',
        roles:[],
        selectedRolesIds:[],
      }
    },


    mounted(){
        this.getAllRole(),
        this.getAdmin()
    },

    methods: {
        getAdmin(){
            var _this = this;
            this.$axios.get('/adminlist',{
                params:{
                    pageSize:_this.pageSize,
                    currentPage:_this.currentPage,
                    searchMsg:this.searchMsg,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log(resp.data)
                    this.admins = resp.data.data
                    this.total = resp.data.total
                    
                }
            })
        },

        updateAdmin(){
          console.log(this.form)
          let roles = []
          //把id映射成角色
          for (let i = 0; i < this.selectedRolesIds.length; i++) {
            for (let j = 0; j < this.roles.length; j++) {
              if (this.selectedRolesIds[i] === this.roles[j].id) {
                roles.push(this.roles[j])
              }
            }
          }
          console.log(roles)
          this.$axios.post('/updateAdmin',{
              id: this.form.id,
              adminname: this.form.adminname,
              password: this.form.password,
              remarks: this.form.remarks,
              roles:roles
          }).then(resp => {
            if(resp && resp.status === 200){
              this.getAdmin()
              this.form = {}
              this.$message({
                message: '成功',
                type: 'success'
              });
              this.dialogFormVisible=false;
            }else{
              this.$message.error({
                message: '失败',
              });
            }
          })
        },

        fetchAdmin(){
          this.currentPage = 1
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
            this.getAdmin()
          },800);
        },


        insertAdmin(){
          console.log("insert")
          this.$axios.post('/insertAdmin',{
              adminname: this.form.adminname,
              password: this.form.password,
              remarks: this.form.remarks,
              isUsed:this.form.isUsed
          }).then(resp => {
            if(resp && resp.data.code === 200){
              this.getAdmin()
              this.form = {}
              this.$message({
                message: '成功',
                type: 'success'
              });
            }else if(resp && resp.data.code === 202){
              this.$message.error({
                message: '用户名已存在',
              });
            }
          })
        },

        deleteSelect(){
          console.log("deleteSelect")
          for(let item of this.multipleSelection){
            this.deleteAdmin(item)
          }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        deleteAdmin(row) {
            this.$axios.get('/deleteAdmin',{
                params:{
                    id: row.id,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  this.$message({message:'删除成功',type:'success'})
                  this.getAdmin()
                }else{
                  this.$message({message:'删除失败',type:'error'})
                }
            })
        },

        handleSizeChange(val) {
          if(this.pageSize!=val){
            this.pageSize = val;
            this.getAdmin()
          }      
          console.log(`每页 ${val} 条`);
        },

        handleCurrentChange(val) {
            if(this.currentPage!=val){
              this.currentPage = val;
              this.getAdmin()
            }
          },
        banCount(val){
          console.log(val)
            this.$axios.get('/banAdmin',{
                params:{
                    id: val.id,
                    isUsed:val.isUsed
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  this.$message({message:'成功',type:'success'})
                }else{
                  val.isUsed = !val.isUsed
                  this.$message({message:'错误',type:'error'})
                }
            })
        },

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
        updateButtonClick(user){
          this.dialogFormVisible = true,
          this.UpdateOrInsert=0,
          this.form=user
          let roleIds = []
          for (let i = 0; i < user.roles.length; i++) {
            roleIds.push(user.roles[i].id)
          }
          this.selectedRolesIds = roleIds
        },
        insertButtonClick(){
          this.dialogFormVisible = true,
          this.UpdateOrInsert=1,
          this.form={},
          this.selectedRolesIds=[]
        }
      },
  }
</script>