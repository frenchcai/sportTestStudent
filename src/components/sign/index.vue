<!--
 * @Author: your name
 * @Date: 2020-10-17 19:28:13
 * @LastEditTime: 2020-12-06 16:36:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\sign\index.vue
-->
<template>
<div>
    <van-search
  v-model="value"
  show-action
  placeholder="请输入搜索关键词"
  @search="onSearch"
  class='searchtitle'
>
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>
    <div class="list">
        <van-cell-group v-for="(item,index) in gamelist" :key='index' >
            <van-cell arrow-direction="up" value="详情" center=true @click="gameDetail(item.project_name)" class='cella'>
                 <!-- 使用 title 插槽来自定义标题 -->
                <div slot='title' >
                    
                    <span class="custom-title" style='font-size:18px;display:inline-block;'>{{item.project_name}}</span><br>
                    <!-- <van-tag size='large' type="primary" >{{item.project}}</van-tag><br> -->

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
import api from "../../api/appdatareq/index"
export default {
    data(){
        return{
            value:"",
            gamelist:[
            //     {
            //     project:"3月测",
            //     site:"式子里",
            //     time:"2020-12-12 12:45"
            // },
            //  {
            //     project:"4月测",
            //     site:"式子里",
            //     time:"2020-12-12 12:45"
            // },
            //  {
            //     project:"5月测",
            //     site:"式子里",
            //     time:"2020-12-12 12:45"
            // },
            
            ]
        }
      
    },
      methods:{
            gameDetail(name){
                this.$router.push({path:"/sign/detail",query:{name:name}})

            },
            getCompetitionList(){
                api.getCompetitionList()
            },
            onSearch(){

            }
        },
        created(){
            api.getCompetitionList().then(res=>{
                console.log(res);
                if(res.data.code=="200"){
                    this.gamelist=res.data.data
                     
                }
            })
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