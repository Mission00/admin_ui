<template>
  <div>
      <div>
        <el-radio-group v-model="type" @change="typeChange()">
          <el-radio-button label="1">已审核</el-radio-button>
          <el-radio-button label="0">未审核</el-radio-button>
        </el-radio-group>
      </div>
    <el-card>
         <el-table
          :data="review"
          border
          >
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="review"
            label="评论内容"
            width="150">
          </el-table-column>
          <el-table-column
            prop="userIDF"
            label="评论用户ID">
          </el-table-column>
          <el-table-column
            prop="userNameF"
            label="评论用户名">
          </el-table-column>
          <el-table-column
            prop="userIDT"
            label="被评论用户ID">
          </el-table-column>
          <el-table-column
            prop="userNameT"
            label="被评论用户名">
          </el-table-column>
          <el-table-column
            label="操作"
            fit>
            <template slot-scope="scope">
                <el-button @click="deleteRole(scope.row.id)" type="text" size="small" >删除</el-button>
                <el-button v-if="type==0" @click="pass(scope.row.id)" type="text" size="small" >审核通过</el-button>
            </template>
            </el-table-column>
         </el-table>
         <add-role @onSubmit="getAllRole()"></add-role>
    </el-card>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return{
            review:[],
            dialogFormVisible:false,
            currentPage:1,
            type:1,
        }
    },
    created(){
        this.getAllReview()
    },
    methods:{
        getAllReview(){
            this.$axios.get('/getAllReview',{
              params:{
                currentPage:this.currentPage,
                type:this.type
              }
            }).then(resp=>{
                this.review=resp.data
                console.log(this.review)
            })
        },
        handleCurrentChange(val) {
          console.log(val)
            if(this.currentPage!=val){
              this.currentPage = val;
              this.getAllReview()
            }
        },
        typeChange(){
          this.getAllReview()
        },
        deleteRole(val){
          console.log(val)
          this.$axios.get('/deleteReview',{
              params:{
                id:val
              }
            }).then(resp=>{
              this.getAllReview()
            })
        },
        pass(val){
          console.log(val)
          this.$axios.get('/passReview',{
              params:{
                id:val
              }
            }).then(resp=>{
              this.getAllReview()
            })
        }

    }
}
</script>

<style>

</style>