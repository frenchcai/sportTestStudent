<template>
<div>
    <van-search
  v-model="value"
  show-action
  placeholder="请输入搜索关键词"
  @search="onSearch"
>
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>
    <div class="list">
        <van-cell-group v-for="(item,index) in gamelist" :key='index'>
            <van-cell arrow-direction="up" value="详情" center=true @click="gameDetail(index)">
                 <!-- 使用 title 插槽来自定义标题 -->
                <div slot='title'>
                    
                    <span class="custom-title">比赛名称：</span>
                    <van-tag type="primary">{{item.project}}</van-tag><br>

                      <span class="custom-title">比赛地点：</span>
                    <van-tag type="success">{{item.site}}</van-tag><br>

                    <span class="custom-title">比赛时间：</span>
                    <van-tag type="default">{{item.time}}</van-tag>
                </div>

                 <div slot='right-icon'>
                    <van-icon name="arrow" />
                </div>
            </van-cell>
        </van-cell-group>

    </div>

   
</div>

 
</template>

<script>
export default {
    data(){
        return{
            value:"",
            gamelist:[
                {
                project:"100米",
                site:"式子里",
                time:"2020-12-12 12:45"
            },
             {
                project:"100米",
                site:"式子里",
                time:"2020-12-12 12:45"
            },
             {
                project:"100米",
                site:"式子里",
                time:"2020-12-12 12:45"
            },
            
            ]
        }
      
    },
      methods:{
            gameDetail(index){
                this.$router.push({path:"/sign/detail",query:{projectid:12}})

            }
        }
}
</script>

<style scoped>

.list>*:nth-of-type(odd){ color: 'red';}  
.list>*:nth-of-type(even){background-color: 'yellow';}
.van-cell__title{
    flex:6;
}
</style>