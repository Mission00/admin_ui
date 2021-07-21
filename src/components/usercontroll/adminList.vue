<template>
<div>
  <el-table
    stripe
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row>
    <el-col :span="2">
    <div style="margin-top: 20px;">
        <el-button>删除所选</el-button>
    </div>
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
        total: 400 ,
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
                    console.log(resp.data)
                    _this.admins = resp.data
                }
            })
        },

        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        handleClick(row) {
            console.log(row);
        },

        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
        },
  }
</script>