<!--
 * @Author: your name
 * @Date: 2020-10-17 19:28:16
 * @LastEditTime: 2020-12-13 16:48:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\prostatus\index.vue
-->
<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入身份证或手机号码"
      @search="onSearch"
      class="searchtitle"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
     <van-notice-bar v-if="msg" color="#1989fa" background="#ecf9ff" left-icon="info-o">
      {{this.msg}}
    </van-notice-bar>
    <div class="list">
      <van-cell-group v-for="(item, index) in gamelist" :key="index">
        <van-cell
          arrow-direction="up"
          value="详情"
          center="true"
          @click="gameDetail(index)"
          class="cella"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <!-- <span class="custom-title">比赛名称：</span>
                    <van-tag type="primary">{{item.project}}</van-tag><br> -->
            <!-- <span class="custom-title" style='font-size:18px;display:inline-block;'>比赛名称：</span> -->
            <span style="font-size: 18px; display: inline-block">{{
              item.project_name
            }}</span
            ><br />

            <!-- <span class="custom-title">比赛地点：</span>
                    <van-tag type="success">{{item.site}}</van-tag><br> -->

            <span class="custom-title">报名时间：</span>
            <van-tag type="default">{{ item.registration_time }}</van-tag>
          </template>

          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import api2 from "../../api/appdatareq/index";
export default {
  data() {
    return {
      value: "",
      msg:"",
      gamelist: [
        //     {
        //     id:"12",
        //     project:"3月测",
        //     site:"式子里",
        //     time:"2020-12-12 12:45"
        // },
        //  {
        //     id:"13",
        //     project:"4月测",
        //     site:"式子里",
        //     time:"2020-12-12 12:45"
        // },
        //  {
        //     id:"14",
        //     project:"5月测",
        //     site:"式子里",
        //     time:"2020-12-12 12:45"
        // },
      ],
    };
  },
  methods: {

    onSearch(){

    },
    
    
    gameDetail(index) {
      this.$router.push({
        path: "/prostatus/detail",
        query: { project_name: this.gamelist[index].project_name },
      });
      // alert(this.gamelist[index])
    },

    async getMygameList() {
      let token = window.localStorage.getItem("token");
      let openid = window.localStorage.getItem("openid");

      if (token && openid) {
        let data = { token, openid };
        let res = await api2.getMycompetitionList(data);
        if (res.data.code == 200) {
            this.msg=""
          this.gamelist = res.data.gamelist;
        }else if(res.data.code==201){
            this.msg="暂无数据"
            
        }
      }else{
          this.msg="暂无数据"
      }
    },
  },
  created() {

      this.getMygameList()
      
  },
};
</script>

<style scoped>
.list > *:nth-of-type(odd) {
  color: "red";
}
.list > *:nth-of-type(even) {
  background-color: "yellow";
}
.van-cell__title {
  flex: 6;
}
</style>