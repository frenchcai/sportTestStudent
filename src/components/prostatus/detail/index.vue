<template>
  <div>
    <van-nav-bar
      title="状态详细信息"
      left-text="返回"
      left-arrow
      @click-left="back()"
      class="pagetitle"
    />
    <van-cell-group>
      <van-field label="基本信息" readonly class="gradetitle" />
    </van-cell-group>
    <van-cell-group>
      <!-- <van-field label="姓名" readonly :value="user.userName"> </van-field> -->
      <van-field label="比赛名称" readonly :value="project.project_name">
      </van-field>
      <van-field label="报名时间" readonly :value="project.registration_time">
      </van-field>
      <van-field label="比赛地点" readonly :value="project.site"> </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field label="报名项目信息" readonly style="font-size: 16px">
      </van-field>
    </van-cell-group>
    <van-cell-group v-for="(item, index) in project.itemlist" :key="index">
      <van-field
        class="projectname"
        label="项目名称"
        :value="item.item_name"
        readonly
      />

      <van-field label="比赛时间" :value="item.item_time" readonly />
       <van-field label="赛次" :value="item.games" readonly />
      <van-field label="场次" :value="item.session" readonly />
      <van-field label="分组" :value="item.grouping" readonly />
      <van-field label="序号" :value="item.serialNumber" readonly />
      <van-field
        label="道次"
        :value="item.wayNumber"
        readonly
        v-if="item.wayNumber"
      />
      <van-field label="状态" readonly>
        <span slot="input">
          <van-tag type="success">{{ item.item_status }}</van-tag>
        </span>
      </van-field>
    </van-cell-group>

    <van-row type="flex" justify="center">
      <van-col style="width: 80%; text-align: center">
        <van-button type="default" style="width: 80%" @click="back"
          >返回</van-button
        >
      </van-col>
    </van-row>
    <!-- <div class="btback">
        <van-button  type="default" icon='arrow-left' @click="back">返回</van-button>
    </div> -->
  </div>
</template>

<script>
import api2 from "../../../api/appdatareq/index";
export default {
  name: "statusdetail",
  data() {
    return {
      user: { userName: "踩踩踩" },
      project: {
        // project: "3月测",
        // site: "沙东小学",
        // sign_time: "2020-12-11 13:14",
        // projectlist: [
        //   {
        //     project: "1000米",
        //     time: "2020-12-12 12:12",
        //     detail_site: "运动场",
        //     divideGround: 12,
        //     group: 12,
        //     number: 1,
        //     paodao: 3,
        //     project_status: "完成报名",
        //   },
        //   {
        //     project: "跳远",
        //     time: "2020-12-12 12:12",
        //     detail_site: "沙场",
        //     divideGround: 12,
        //     group: 12,
        //     number: 1,
        //     project_status: "完成考试",
        //   },
        // ],
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    async myGameDetail(name) {
      let token = window.localStorage.getItem("token");
      let openid = window.localStorage.getItem("openid");
      if (token && openid) {
        let data={
            token,
            openid,
            project_name:name
        }
        let result = await api2.myGameDetail(data);

        if (result.data.code == 200) {
          this.project = result.data.project;
        } else {
        }
      }else{
          this.$toast.fail("你尚未登录")
      }
    },
  },
  mounted() {
    console.log(this.$route.query.project_name);
  },
  created() {
    let project_name = this.$route.query.project_name;
    if (project_name) {
      this.myGameDetail(project_name);
    }
  },
};
</script>

<style>
</style>