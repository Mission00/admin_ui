<template>
<div>

  <el-col span="4">
    <el-input
      placeholder="请输入内容"
      v-model="searchMsg">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </el-col>

  <el-table
    stripe
    ref="multipleTable"
    :data="admins"
    tooltip-effect="dark"
    style="width: 100%"
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
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="deleteAdmin(scope.row,scope.$index)" type="text" size="small" style="color:red">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row :gutter="10" style="margin-top:20px">
    <el-col :span="2">
          <el-button type="danger" size="small" :disabled="multipleSelection.length==0? true:false">删除所选</el-button>
    </el-col>
    <el-col :span="2">
        <el-button type="primary" size="small">新增管理员</el-button>
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
        admins: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: '' ,
        searchMsg:'',
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
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                    _this.admins = resp.data.data
                    _this.total = resp.data.total
                }
            })
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        deleteAdmin(row,index) {
            var _this = this;
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