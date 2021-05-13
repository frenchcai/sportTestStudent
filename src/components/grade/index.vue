<!--
 * @Author: your name
 * @Date: 2020-10-17 19:27:55
 * @LastEditTime: 2020-12-13 16:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\grade\index.vue
-->
<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入比赛名称"
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
            <!-- <span class="custom-title">比赛名称：</span> -->

            <span style="font-size: 18px">{{ item.project_name }}</span
            ><br />

            <span class="custom-title">比赛总分：</span>
            <van-tag type="success">{{ item.fingrade }}</van-tag
            ><br />

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
  name: "grade",
  data() {
    return {
      value: "",
      msg: "",
      gamelist: [
        //     {
        //     project:"3月测",
        //     grade:"100",
        //     time:"2020-12-12 12:45"
        // },
        //  {
        //     project:"4月测",
        //     grade:"100",
        //     time:"2020-12-12 12:45"
        // },
        //  {
        //     project:"5月测",
        //     grade:"100",
        //     time:"2020-12-12 12:45"
        // },
      ],
    };
  },
  methods: {
    onSearch() {},
    gameDetail(index) {
      // alert(this.gamelist[index])
      this.$router.push({ path: "/grade/detail", query: { project_name: this.gamelist[index]["project_name"] } });
    },
    async getMyGradeList() {
      let token = window.localStorage.getItem("token");
      let openid = window.localStorage.getItem("openid");
      if (token && openid) {
        let data = {
          token,
          openid,
        };
        let result = await api2.getMyGradeList(data);

        if (result.data.code == 200) {
            this.msg=""
          this.gamelist = result.data.project;
        } else if (result.data.code == 201) {
          this.msg =result.data.msg;
        }
      } else {
        // this.$toast.fail("你尚未登录");
        this.msg="暂无成绩信息"
        
      }
    },
  },
  created() {
    this.getMyGradeList();
  },
};
</script>

<style scoped>
.van-cell__title {
  flex: 6;
}
</style>