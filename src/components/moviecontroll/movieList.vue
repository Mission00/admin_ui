<template>
<div>
  <el-card>
  <el-row :gutter="10">
    <el-col span="11">
      <div>
        <span>语言</span>
        <el-radio-group v-model="radioLanguage" @change="fetchMovie">
          <el-radio-button label="-1">全部</el-radio-button>
          <el-radio-button v-for="item in language" :key="item.id" :label="item.id">{{item.language}}</el-radio-button>
        </el-radio-group>
      </div>
    </el-col>
    <el-col span="10">
      <div>
        <span>类型</span>
        <el-radio-group v-model="radioCategory" @change="fetchMovie">
          <el-radio-button label="-1">全部</el-radio-button>
          <el-radio-button v-for="item in category" :key="item.id" :label="item.id">{{item.category}}</el-radio-button>
        </el-radio-group>
      </div>
    </el-col>
  </el-row>

  <el-row style="margin-top:10px">
    <el-col span="2">
      <div>
      <el-select v-model="searchType"  slot="prepend" placeholder="请选择">
        <el-option label="中文名" value="name1"></el-option>
        <el-option label="演员" value="actot"></el-option>
        <el-option label="导演" value="director"></el-option>
      </el-select>
      </div>
    </el-col>

    <el-col span="10">
      <div>
      <el-input
        placeholder="请输入内容"
        v-model.trim="searchMsg"
        v-on:input="fetchMovie">
        <i slot="prefix" class="el-input__icon el-icon-search" id="search_input"></i>
      </el-input>
      </div>
    </el-col>
  </el-row>
  </el-card>

  <el-table
    stripe
    v-loading="loading"
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
      width="120"
      align="center">
        <template slot-scope="scope">
           <el-image :src="scope.row.img_src" style="height:120px"/>
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
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="tagList"
      label="标签"
      show-overflow-tooltip
      width="120">
        <template slot-scope="scope">
            <el-tag v-for="item in scope.row.tagList" :key="item.tag_id"> {{item.tag_name}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      prop="num"
      label="集数"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="movie_length"
      label="时长"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="language.language"
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
      prop="category.category"
      label="分类"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      prop="posttime"
      label="修改时间"
      sortable=""
      width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
            <el-button @click="deleteMovie(scope.row)" type="danger" size="mini" >删除</el-button>
            <el-button size="mini" @click="changeButtonClicked(scope.row)">编辑</el-button>
        </template>
    </el-table-column>
  </el-table>
<el-row :gutter="10" style="margin-top:20px">
    <el-col :span="2">
          <el-button type="danger" size="small" :disabled="multipleSelection.length==0? true:false" @click="deleteSelect()">删除所选</el-button>
    </el-col>
    <el-col :span="2">
        <el-button type="primary" size="small" @click="addButtonClicked">新增影片</el-button>
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


     <el-dialog title="编辑影片" destroy-on-close :visible.sync="dialogFormVisible" style="text-align:left">
        <el-form :model="form" >
          <el-row :gutter="10">
          <el-col span="10">
            <el-form-item label="中文名" :label-width="formLabelWidth">
              <el-input v-model="form.name1" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="原名" :label-width="formLabelWidth">
              <el-input v-model="form.name2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="主演" :label-width="formLabelWidth">
              <el-input v-model="form.actot" autocomplete="off" type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="导演" :label-width="formLabelWidth" >
              <el-input v-model="form.director" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="编剧" :label-width="formLabelWidth" >
              <el-input v-model="form.screenwriter" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="10">
          <el-form-item label="上映时间" :label-width="formLabelWidth">
              <el-date-picker
                align="left"
                v-model="form.premiere"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="集数" :label-width="formLabelWidth">
            <el-row>
              <el-col span="2">
                <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1"  ></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="时长" :label-width="formLabelWidth">
            <el-row>
            <el-col span="10">
              <el-input v-model="form.movie_length" autocomplete="off"></el-input>   
            </el-col>
            <el-col span="4">
              <span>分钟</span>
            </el-col> 
            </el-row>
          </el-form-item>
          <el-form-item label="语言" :label-width="formLabelWidth">
            <el-row>
              <el-col span="20">
                <el-select v-model="form.language.id" placeholder="请选择" @change="languageSelectChanged">
                  <el-option
                    v-for="item in language"
                    :key="item.id"
                    :label="item.language"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-row>
              <el-col span="20">
                <el-select v-model="form.category.id" placeholder="请选择" @change="categorySelectChanged">
                  <el-option
                    v-for="item in category"
                    :key="item.id"
                    :label="item.category"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input v-model="form.introduction" autosize type="textarea"></el-input>
          </el-form-item>
          </el-row>
          <el-row>
            <el-col span="3">
              <span>封面图片</span>
            </el-col>
            <el-col span="20">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-remove="uploadRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                :on-exceed="uploadExceed"
                :limit=1
                list-type="picture-card">
                <el-button size="small" type="primary">选择图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="UpdateOrInsert==1?insertMovie():updateMovie()">确 定</el-button>
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
    name:"movieList",
    data() {
      return {
        movies: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchMsg:'',
        searchType:'name1',
        dialogFormVisible: false,
        formLabelWidth: '80px',
        language:[],
        category:[],
        form: {
          id:'',
          name1:'',
          name2:'',
          actot:'',
          director:'',
          screenwriter:'',
          tagList:[],
          language:{id:'',language:''},
          movie_length:'',
          premiere:'',
          introduction:'',
          category:{id:'',category:''},
          num:'1',
          posttime:'',
          img_src:''
        },
        loading:true,
        UpdateOrInsert:'',
        fileList:[],
        uploadUrl:this.$settings.base_url+'/file/upload',
        dialogImageUrl: '',
        dialogImgVisible: false,
        radioLanguage:-1,
        radioCategory:-1,
        select:'',
      }
    },

    created: function(){
        this.getMovies()
        this.getLanguage()
        this.getCategory()
    },

    methods: {
        getMovies(){
            var _this = this;
            this.$axios.get('/movielist',{
                params:{
                    pageSize:_this.pageSize,
                    currentPage:_this.currentPage,
                    searchMsg:this.searchMsg,
                    searchType:this.searchType,
                    language:this.radioLanguage,
                    category:this.radioCategory
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log(resp.data)
                    this.movies = resp.data.data
                    this.total = resp.data.total
                    console.log(resp.data.data)
                }
                this.loading=false
            })
        },

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

        updateMovie(){
          console.log("update")
          this.$axios.post('/updatemovie',
              this.form
          ).then(resp => {
            if(resp && resp.data.code === 200){
              this.getMovies()
              this.$message({
                message: '成功',
                type: 'success'
              });
            }else if(resp && resp.data.code === 202){
              this.$message.error({
                message: resp.data.data,
              });
            }
          })
        },

        fetchMovie(){
          this.loading=true
          this.currentPage = 1
          clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
            this.getMovies()
          },800);
        },


        insertMovie(){
          console.log("insert")
          var data=JSON.stringify(this.form);
          console.log(data)
          this.$axios.post('/insertmovie',
              this.form
          ).then(resp => {
            if(resp && resp.data.code === 200){
              this.getMovies()
              this.$message({
                message: '成功',
                type: 'success'
              });
            }else if(resp && resp.data.code === 202){
              this.$message.error({
                message: '错误',
              });
            }
          })
        },

        deleteSelect(){
          console.log("deleteSelect")
          for(let item of this.multipleSelection){
            this.deleteMovie(item)
          }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        deleteMovie(row) {
            this.$axios.get('/deleteMovie',{
                params:{
                    movie_id: row.movie_id,
                }
            }).then(resp =>{
                if(resp && resp.status === 200){
                  console.log("成功")
                  this.getMovies()
                }
            })
        },

        handleSizeChange(val) {
          if(this.pageSize!=val){
            this.pageSize = val;
            this.getMovies()
          }      
          console.log(`每页 ${val} 条`);
        },

        handleCurrentChange(val) {
            if(this.currentPage!=val){
              this.currentPage = val;
              this.getMovies()
            }
          },

          handleChange(value) {
            console.log(value);
          } ,

          languageSelectChanged(value) {
            for(var i=0;i<this.language.length;i++){
              if(this.language[i].id == value){
                this.form.language.language = this.language[i].language;
                break;
              }
            }
            this.$forceUpdate();
            console.log(this.form.language)
          },

          categorySelectChanged(value) {
            for(var i=0;i<this.category.length;i++){
              if(this.category[i].id == value){
                console.log(value)
                this.form.category.category = this.category[i].category
                console.log(this.category[i])
                break;
              }
            }
            this.$forceUpdate();
            console.log(this.form.category)
          },

          uploadRemove(file) {
            this.$axios.get('/file/remove',{
              params:{
                fileName:file.response
              }
            }).then(resp=>{
              console.log(resp.data)
            })
            console.log(file);
          },

          handleSuccess(file){
              console.log(file);
              this.form.img_src = this.$settings.img_base_url+file;
              console.log(this.form.img_src)
          },

          uploadExceed(){
            console.log("只能选一张")
          },

          changeButtonClicked(value){
            this.dialogFormVisible = true,
            this.UpdateOrInsert=0,
            this.form = {...value}
          },
          addButtonClicked(){
            this.dialogFormVisible = true,
            this.UpdateOrInsert=1,form = {},
            this.form.language = {},
            this.form.category ={}
          }
    },
  }
</script>