<template>
  <div>
    <van-nav-bar
      title="报名详细信息"
      left-text="返回"
      left-arrow
      @click-left="back()"
      class="pagetitle"
    />
    <vant-cell-group>
      <van-field label="比赛信息" readonly class="gradetitle">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="比赛名称" readonly :value="project.project_name">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="比赛地点" readonly :value="project.site">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="比赛开始时间" readonly :value="project.time">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
    </vant-cell-group>

    <vant-cell-group>
      <van-field label="选择比赛项目" readonly class="gradetitle"> </van-field>
    </vant-cell-group>
    <div class="list">
      <!-- <van-checkbox-group v-model="result">
            <van-checkbox name="a">复选框 a</van-checkbox>
            <van-checkbox name="b">复选框 b</van-checkbox>
        </van-checkbox-group> -->
      <van-cell-group v-for="(item, index) in project.itemlist" :key="index">
        <van-cell @click="select(index)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div style="height: 50%">
                <!-- <van-radio-group v-model="radio">
                                <van-radio name="1"></van-radio>
                            </van-radio-group> -->
                <van-icon
                  name="checked"
                  color="#1989fa"
                  size="24px"
                  v-if="item.checked"
                />
                <van-icon name="circle" size="24px" v-if="!item.checked" />
                <!-- <van-checkbox v-model="radio" icon-size="24px"></van-checkbox> -->
              </div>
              <div>
                <span class="custom-title">项目名称：</span>
                <van-tag type="primary">{{ item.item_name }}</van-tag
                ><br />

                <!-- <span class="custom-title">比赛地点：</span>
                <span class="custom-title">{{ item.detail_site }}</span
                ><br /> -->

                <span class="custom-title">项目费用：</span>
                <van-tag type="danger">{{ item.item_cost }}￥</van-tag><br />

                <span class="custom-title">比赛开始时间：</span>
                <span>{{ item.item_time }}</span>
              </div>
            </div>
          </template>

          <!-- <template #right-icon>
                    <van-icon name="arrow" />
                </template> -->
        </van-cell>
      </van-cell-group>

      <vant-cell-group>
        <van-field label="总费用" readonly class="gradetitle"> </van-field>
      </vant-cell-group>
      <vant-cell-group>
        <van-field label="总费用" readonly :value="total" />
      </vant-cell-group>
    </div>

    <van-row gutter="24" class="btbtn">
      <van-col span="10" offset="1">
        <van-button type="info" style="width: 100%" @click="comfirmToPay()"
          >确定报名</van-button
        >
      </van-col>
      <van-col span="10" offset="">
        <van-button
          type="default"
          style="width: 100%"
          icon="close"
          @click="back"
          >取消</van-button
        >
      </van-col>
    </van-row>
    <!-- <div class="btbtn">
        
        
    </div> -->

    <!-- <div style="display:hidden;">
        <van-button  type="info" >确定报名</van-button>
        <van-button  type="default" text=' 返回 '></van-button>
    </div> -->
  </div>
</template>

<script>
import { Dialog } from "vant";
import api from "../../../api/appdatareq/index";
export default {
  name: "signdetail",
  data() {
    return {
      radio: [],
      selectedproject: [],
      project: {
        // project: "3月测",
        // site: "式子里",
        // time: "2020-12-12 12:45",
        // itemlist: [
        // {
        //   project: "100米",
        //   detail_site: "式子里",
        //   time: "2020-12-12 12:45",
        //   item_cost: 100,
        // },
        // {
        //   project: "跳远",
        //   detail_site: "式子里",
        //   time: "2020-12-12 12:45",
        //   item_cost: 100,
        // },
        // ],
      },
      result: [],
      total: 0,
      projectid: "",
      user: {},
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
      gamelist: [
        {
          project: "100米",
          site: "式子里",
          time: "2020-12-12 12:45",
        },
        {
          project: "100米",
          site: "式子里",
          time: "2020-12-12 12:45",
        },
        {
          project: "100米",
          site: "式子里",
          time: "2020-12-12 12:45",
        },
      ],
    };
  },
  methods: {
    getGameDetail(id) {
      return api.gameDetail(id);
    },
    getuserInfo() {
      const token = window.localStorage.getItem("token");

      const l = api
        .getUserInfo({ token })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == "200") {
            //将数据赋值给用户数据

            this.user = Object.assign({}, res.data.data);
          } else if (res.code == "201") {
            console.log("用户尚未注册");
          }
        })
        .catch((error) => {});
    },

    back() {
      this.$router.go(-1);
    },
    select(index) {
      console.log(index);
      console.log(this.project.itemlist[index].checked);

      if (!this.project.itemlist[index]["checked"]) {
        // this.project.itemlist[index].checked=true
        // this.project.itemlist[index]["checked"]= true
        this.$set(this.project.itemlist[index], "checked", true);
      } else if (this.project.itemlist[index]["checked"]) {
        // this.project.itemlist[index].checked= !this.project.itemlist[index].checked

        this.$set(this.project.itemlist[index], "checked", false);
      }
      this.total = this.getMoney();
      console.log(this.total);
    },
    getMoney() {
      let total = 0;

      this.project.itemlist.map((item) => {
        if (item.checked) {
          total = total + Number.parseInt(item.item_cost);
        }
      });
      return total;
    },
    getSelectedPro() {
      this.project.itemlist.map((item) => {
        if (item.checked) {
          this.selectedproject = this.selectedproject.concat(item);
        }
      });
    },
    comfirmToPay() {
      let token = window.localStorage.getItem("token");
      let openid = window.localStorage.getItem("openid");
      if (token && openid) {
        if (!this.user.idNumber) {
          Dialog.alert({
            title: "提示",
            message: "你尚未注册,是否前往注册",
          })
            .then(() => {
              this.$router.replace("/home");
            })
            .catch(() => {});
        } else {
          this.getSelectedPro();
          if (this.selectedproject.length == 0) {
            // Dialog({ message: '提示' });
            Dialog.alert({
              title: "提示",
              message: "请至少选择一项比赛项目",
            }).then(() => {
              // on close
            });
          } else {
            // this.getSelectedPro();

            let data = {
              project_name: this.project.project_name,
              site: this.project.site,
              time: this.project.time,
              itemList: this.selectedproject,
            };
            //当需要从params传参数的时候，path不能共存，只能使用name，因此，路由那边必须配置name
            this.$router.push({
              name: "signpay",
              params: {
                project: data,
                total: this.total,
              },
            });
          }
        }
      } else {
        Dialog.alert({
          title: "提示",
          message: "你尚未登录,是否前往登录",
        })
          .then(() => {
            this.$router.replace("/home");
          })
          .catch(() => {});
      }
    },
  },
  computed: {},
  watch: {},
  created() {
    this.getuserInfo();
    if (this.$route.query.name) {
      console.log(this.$route.query.name);
      let name = this.$route.query.name;
      api
        .gameDetail(name)
        .then((res) => {
          if (res.data.code == 200) {
            this.project = res.data.data;
          }
        })
        .catch((error) => {
          this.$toast.fail("获取信息失败");
        });
    }
  },
  mounted() {
    // const a={projectid:this.$route.query.projectid}
    // this.getGameDetail(a)

    console.log();
  },
};
</script>

<style>
</style>