<template>
  <div style="text-align:left">
          <el-radio-group v-model="type" @change="typeChange">
            <el-radio-button label="0">影评</el-radio-button>
            <el-radio-button label="1">资讯</el-radio-button>
        </el-radio-group>
         <el-radio-group v-model="state" @change="typeChange">
            <el-radio-button label="0">未审核</el-radio-button>
            <el-radio-button label="1">已审核</el-radio-button>
        </el-radio-group>

        <el-card>
         <el-table
          :data="ArticleList"
          border
          >
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="articleTitle"
            label="封面"
            width="150">
            <template slot-scope="scope">
                <el-image :src="scope.row.articleCover" style="height:120px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="articleTitle"
            label="标题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="articleDate"
            label="时间"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作"
            fit>
            <template slot-scope="scope">
                <el-button @click="deleteArticle(scope.row.id)" type="text" size="small" >删除</el-button>
                <el-button v-if="type==0&&state==0" @click="pass(scope.row.id)" type="text" size="small" >审核通过</el-button>
                <el-button @click="diglogFromChange(scope.row)" type="text" size="small" >查看</el-button>
            </template>
            </el-table-column>
         </el-table>
    </el-card>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
        
        <!-- <el-card style="text-align: left;width: 900px;">
            <div>
            <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
            <el-divider content-position="left">{{article.articleDate}}</el-divider>
            <div class="markdown-body">
                <div v-html="article.articleContentHtml"></div>
            </div>
            </div>
        </el-card> -->


        <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="70%">
        <el-card style="text-align: left;width: 100%;">
            <div>
            <span style="font-size: 20px"><strong>{{selectarticle.articleTitle}}</strong></span>
            <el-divider content-position="left">{{selectarticle.articleDate}}</el-divider>
            <div class="markdown-body">
                <div v-html="selectarticle.articleContentHtml"></div>
            </div>
            </div>
        </el-card>
        </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            ArticleList:[],
            type:0,
            state:1,
            selectarticle:{},
            dialogVisible: false,
            currentPage:1,
        }
    },
    created(){
        this.getArticleList()
    },
    methods:{
        getArticleList(){
            this.$axios.get('/articleList',{
                params:{
                    type:this.type,
                    state:this.state,
                    currentPage:this.currentPage
                }
            }).then(resp=>{
                if(resp.status==200){
                   console.log(resp.data);
                   this.ArticleList = resp.data
                }else{
                    console.log("失败")
                }
            })
        },
        typeChange(){
          this.getArticleList()
        },
        diglogFromChange(val){
            this.selectarticle = val
            this.dialogVisible = true
        },
        deleteArticle(id){
            this.$axios.get('/deletearticle',{
                params:{
                    id:id
                }
            }).then(resp=>{
                this.getArticleList()
            })
        },
        pass(id){
            this.$axios.get('/passarticle',{
                params:{
                    id:id
                }
            }).then(resp=>{
                this.getArticleList()
            })
        },
        handleCurrentChange(val){
            console.log(val)
            if(this.currentPage!=val){
              this.currentPage = val;
              this.getArticleList()
            }
        }
    }
}
</script>

<style>

</style>