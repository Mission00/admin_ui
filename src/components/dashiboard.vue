<template>
<div>
<el-page-header content="导航页面"></el-page-header>
<el-row :gutter="20" style="margin-top:3%">
    <el-col :span="8">
        <el-card>
            <span>用户数:100</span>
        </el-card>
    </el-col>
    <el-col :span="8">
        <el-card>
            <span>影片数:1023</span>
        </el-card>
    </el-col>
    <el-col :span="8">
        <el-card>
            <span>评论数:344</span>
        </el-card>
    </el-col>
</el-row>
<el-row :gutter="20" style="margin-top:10%;margin-left:6%">
    <el-col :span="10">
        <div class="Echarts">
            <div id="movie" style="width: 600px;height:400px;"></div>
        </div>
    </el-col>
    <el-col :span="10">
        <div class="Echarts">
            <div id="review" style="width: 600px;height:400px;"></div>
        </div>
    </el-col>
</el-row>
</div>
</template>

<script>
export default {
  name: 'Echarts',
  methods:{
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var movie = this.$echarts.init(document.getElementById('movie'));
          var review = this.$echarts.init(document.getElementById('review'));
		  // 指定图表的配置项和数据
		  var option1 = {
                    title: {
                        text: '影片数量',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                        name: '影片数量',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '剧集' },
                            { value: 735, name: '电影' },
                            { value: 580, name: '动画' },
                            { value: 484, name: '纪录片' },
                            { value: 300, name: '豆瓣250' }
                        ],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                        }
                    ]
                    };
            var option2 = {
                    title: {
                        text: '评论数量',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                        name: '评论数量',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '未审核' },
                            { value: 735, name: '已审核' },
                        ],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                        }
                    ]
                    };

		  // 使用刚指定的配置项和数据显示图表。
		  movie.setOption(option1);
          review.setOption(option2);
		  }
  },
  mounted() {
  	this.myEcharts();
  }
}
</script>

<style>

</style>
