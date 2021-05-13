<!--
 * @Author: your name
 * @Date: 2020-10-18 08:51:49
 * @LastEditTime: 2021-02-09 23:42:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\grade\detail\index.vue
-->
<template>
  <div>
    <van-nav-bar
      title="考试结果查询"
      left-text="返回"
      left-arrow
      @click-left="back()"
      class="pagetitle"
    />
    <!-- <vant-cell-group>
        <van-field label="比赛项目结果"  readonly class="gradetitle" >  -->
    <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
    <!-- </van-field >
    </vant-cell-group> -->

    <van-cell-group v-for="(item, index) in mygamegradelist" :key="index">
      <van-field readonly class="projectname">
        <span slot="label">
          <span> 项目名称</span>
        </span>
        <span slot="input">
          <span>{{ item.item_name }}</span>
        </span>
      </van-field>
      <van-field label="比赛时间" :value="item.item_time" readonly />
      <van-field label="赛次" :value="item.games" readonly />
      <van-field label="场次" :value="item.session" readonly />

      <van-field label="分组" :value="item.grouping" readonly />
      <!-- <van-field label="组别" :value="item.group" readonly /> -->
      <van-field label="序号" :value="item.serialNumber" readonly />
      <van-field
        label="道次"
        :value="item.wayNumber"
        readonly
        v-if="item.wayNumber"
      />
      <van-field label="成绩" :value="item.grade" readonly />
      <van-field label="最终分数" readonly>
        <span slot="input">
          <van-tag v-if="item.grade" type="success">{{
            item.fingrade
          }}</van-tag>
        </span>
        <span slot="input" v-if="!item.grade"> 暂无记录 </span>
      </van-field>
      <!-- 占位 -->
    </van-cell-group>

    <!-- <div class="btback">
        <van-button  type="default" icon='arrow-left' @click="back">返回</van-button>
    </div> -->
    <!-- <van-row gutter="24" class='btback'>
        <van-col span="16" offset="1">
            <van-button  type="default" style='width:100%;'  @click="back">返回</van-button>
        </van-col>
    </van-row> -->

    <van-row type="flex" justify="center">
      <van-col style="width: 80%; text-align: center">
        <van-button type="default" style="width: 80%" @click="back"
          >返回</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import api2 from "../../../api/appdatareq/index";

export default {
  name: "gradedetail",
  data() {
    return {
      projectid: "",
      mygamegradelist: [
        // {
        //   project: "1000米",
        //   time: "2020-12-12 12:12",
        //   detail_site: "运动场",
        //   divideGround: 12,
        //   group: 12,
        //   number: 1,
        //   paodao: 3,
        //   grade: 100,
        // },
        // {
        //   project: "跳远",
        //   time: "2020-12-12 12:12",
        //   detail_site: "沙场",
        //   divideGround: 12,
        //   group: 12,
        //   number: 1,
        //   grade: 100,
        // },
      ],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async projectGradeList(name) {
      let token = window.localStorage.getItem("token");
      let openid = window.localStorage.getItem("openid");
      if (token && openid) {
        let data = {
          token,
          openid,
          project_name: name,
        };
        let result = await api2.projectGradeList(data);

        if (result.data.code == 200) {
          this.mygamegradelist = result.data.itemlist;
        } else {
        }
      } else {
        this.$toast.fail("你尚未登录");
      }
    },
  },
  created() {
    let project_name = this.$route.query.project_name;
    if (project_name) {
      this.projectGradeList(project_name);
    }
  },
  mounted() {
    console.log(this.$route.query);
  },
};
</script>

<style>
</style>