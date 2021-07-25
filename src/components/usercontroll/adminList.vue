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
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
            <el-button @click="deleteAdmin(scope.row,scope.$index)" type="danger" size="mini" >删除</el-button>
            <el-button size="mini">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row :gutter="10" style="margin-top:20px">
    <el-col :span="2">
          <el-button type="danger" size="small" :disabled="multipleSelection.length==0? true:false">删除所选</el-button>
    </el-col>
    <el-col :span="2">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">新增管理员</el-button>
              
      <el-dialog title="新增管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.adminName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertAdmin">确 定</el-button>
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


// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

  export default {
    name:"userList",
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
          adminName:'',
          password:'',
          remarks:'',
        },
        loading:true,
      }
    },

    created: function(){
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

        fetchAdmin(){
          this.currentPage = 1
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
            this.getAdmin()
          },800);
        },


        insertAdmin(){
          this.$axios.post('insertAdmin',{
              adminname: this.form.adminName,
              password: this.form.password,
              remarks: this.form.remarks,
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
                message: '失败',
              });
            }
          })
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        deleteAdmin(row,index) {
            this.$axios.get('/deleteAdmin',{
                params:{
                    id: row.id,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log("成功")
                  this.getAdmin()
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
          }
        },
  }
</script>