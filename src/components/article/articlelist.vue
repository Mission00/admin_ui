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
  </div>
</template>

<script>
export default {
    data(){
        return{
            ArticleList:[],
            type:0,
            state:1,
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
                    state:this.state
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
    }
}
</script>

<style>

</style>