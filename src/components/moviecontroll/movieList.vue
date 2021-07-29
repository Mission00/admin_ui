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
    :data="movies"
    tooltip-effect="dark"
    style="width: 100%"
    height="600"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>
    <el-table-column
      prop="movie_id"
      label="id"
      sortable
      width="50"
      align="center">
      <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
    </el-table-column>
    <el-table-column
      label="封面"
      align="center">
        <template slot-scope="scope">
           <img :src="require('../../assets/movie_img/'+ scope.row.name2 +'.jpg')" style="height:120px" />
        </template>
    </el-table-column>
    <el-table-column
      prop="name1"
      label="中文名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name2"
      label="原名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="actot"
      label="主演"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="director"
      label="导演"
      width="120">
    </el-table-column>
    <el-table-column
      prop="screenwriter"
      label="编剧"
      width="120">
    </el-table-column>
    <el-table-column
      prop="premiere"
      label="上映时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tagList"
      label="标签"
      width="120">
        <template slot-scope="scope">
            <el-tag v-for="item in scope.row.tagList" :key="item.tag_id"> {{item.tag_name}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      prop="num"
      label="集数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="movie_length"
      label="时长"
      width="120">
    </el-table-column>
    <el-table-column
      prop="language"
      label="语言"
      width="120">
    </el-table-column>
    <el-table-column
      prop="introduction"
      label="简介"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
            <el-button @click="deleteAdmin(scope.row)" type="danger" size="mini" >删除</el-button>
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
            <el-input v-model="form.adminname" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="UpdateOrInsert==1?insertAdmin():updateAdmin()">确 定</el-button>
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
    name:"movieList",
    data() {
      return {
        movies: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: '' ,
        searchMsg:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          id:'',
          adminname:'',
          password:'',
          remarks:'',
        },
        loading:true,
        UpdateOrInsert:'',
      }
    },

    created: function(){
        this.getMovies()
    },

    methods: {
        getMovies(){
            var _this = this;
            this.$axios.get('/movielist',{
                params:{
                    pageSize:_this.pageSize,
                    currentPage:_this.currentPage,
                    searchMsg:this.searchMsg,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log(resp.data)
                    this.movies = resp.data.data
                    this.total = resp.data.total
                    console.log(resp.data.data)
                    
                }
            })
        },

        updateAdmin(){
          console.log(this.form)
          this.$axios.post('/updateAdmin',{
              id: this.form.id,
              adminname: this.form.adminname,
              password: this.form.password,
              remarks: this.form.remarks,
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