<template>
<div>

  <el-col span="4">
    <el-input
      placeholder="请输入内容"
      v-model.trim="searchMsg"
      v-on:input="fetchUser">
      <i slot="prefix" class="el-input__icon el-icon-search" id="search_input"></i>
    </el-input>
  </el-col>

  <el-table
    stripe
    ref="multipleTable"
    :data="users"
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
      prop="username"
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
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
            <el-button @click="deleteUser(scope.row)" type="danger" size="mini" >删除</el-button>
            <el-button size="mini" @click="dialogFormVisible = true,UpdateOrInsert=0,form=scope.row">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row :gutter="10" style="margin-top:20px">
    <el-col :span="2">
          <el-button type="danger" size="small" :disabled="multipleSelection.length==0? true:false" @click="deleteSelect()">删除所选</el-button>
    </el-col>
    <el-col :span="2">
        <el-button type="primary" size="small" @click="dialogFormVisible = true,UpdateOrInsert=1">新增管理员</el-button>   
      <el-dialog title="新增管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false,form = {}">取 消</el-button>
          <el-button type="primary" @click="UpdateOrInsert==1?insertUser():updateUser()">确 定</el-button>
        </div>
      </el-dialog>

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



</div>
</template>

<script>

  export default {
    name:"userList",
    data() {
      return {
        users: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: '' ,
        searchMsg:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          id:'',
          username:'',
          password:'',
          remarks:'',
        },
        loading:true,
        UpdateOrInsert:'',
      }
    },

    created: function(){
        this.getUsers()
    },

    methods: {
        getUsers(){
            var _this = this;
            this.$axios.get('/userlist',{
                params:{
                    pageSize:_this.pageSize,
                    currentPage:_this.currentPage,
                    searchMsg:this.searchMsg,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log(resp.data)
                    this.users = resp.data.data
                    this.total = resp.data.total
                    
                }
            })
        },

        updateUser(){
          console.log(this.form)
          this.$axios.post('/updateUser',{
              id: this.form.id,
              username: this.form.username,
              password: this.form.password,
              remarks: this.form.remarks,
          }).then(resp => {
            if(resp && resp.status === 200){
              this.getUsers()
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

        fetchUser(){
          this.currentPage = 1
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
            this.getUsers()
          },800);
        },


        insertUser(){
          console.log("insert")
          this.$axios.post('/insertUser',{
              username: this.form.username,
              password: this.form.password,
              remarks: this.form.remarks,
          }).then(resp => {
            if(resp && resp.data.code === 200){
              this.getUsers()
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
            this.deleteUser(item)
          }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        deleteUser(row) {
            this.$axios.get('/deleteUser',{
                params:{
                    id: row.id,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log("成功")
                  this.getUsers()
                }
            })
        },

        handleSizeChange(val) {
          if(this.pageSize!=val){
            this.pageSize = val;
            this.getUsers()
          }      
          console.log(`每页 ${val} 条`);
        },

        handleCurrentChange(val) {
            if(this.currentPage!=val){
              this.currentPage = val;
              this.getUsers()
            }
          }
        },
  }
</script>