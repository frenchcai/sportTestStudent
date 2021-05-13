<!--
 * @Author: your name
 * @Date: 2020-10-17 19:28:07
 * @LastEditTime: 2020-12-13 21:03:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\my\index.vue
-->
<template>
  <div style="text-align: center">
    <div><van-icon :name="user.headimgurl" size="60" /></div>

    <van-button
      type="default"
      size="small"
      v-if="!user.headimgurl"
      @click="signIn"
      >点击登录</van-button
    >

    <van-cell-group>
      <van-field label="状态" :value="status" readonly>
        <template #button
          ><van-button
            type="default"
            v-show="status == '未注册' ? true : false"
            size="small"
            @click="register"
          >
            前往注册</van-button
          >
        </template>
      </van-field>

      <van-field label="姓名" :value="user.name" readonly />
      <van-field label="性别" :value="user.sex" readonly />
      <van-field label="学校" :value="user.school" readonly />
      <van-field label="联系电话" :value="user.phone" readonly />
      <van-field label="身份证号" :value="user.idNumber" readonly />
      <van-cell style="text-align: left" title="修改个人信息" @click="mod()">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import api from "../../api";
import api2 from "../../api/appdatareq/index";
import { getQueryString } from "../../utils/utils";
export default {
  name: "my",
  data() {
    return {
      userpic: "circle",
      isSign: false,
      status: "未注册",
      searchResult: [],
      user: {
        // sex: "男",
        // school: "杭桑",
        // userName: "黎明",
        // idNumber: "44092319980141427",
        // phone: "12345678901",
      },
    };
  },
  methods: {
    async returnGetCodeUrl() {
      let { data } = await api.getWxAuth();
      if (data.status === 200) {
        window.location.href = data.url;
      }
    },
    signIn() {
      this.returnGetCodeUrl();
    },
    register() {
      this.$router.push({ path: "/home/register", query: { type: 1 } });
    },
    mod() {
      this.$router.push({ name: "register", params: { user: this.user } });
    },
    async getUserInfo(data) {
      return await data;
    },
  },
  created() {
    //判断是否为回调跳转
    const token = window.localStorage.getItem("token");
    if (token) {
      //如果拿到token说明已经授权成功，将其储存在本地
      // window.localStorage.setItem("token", token);
      const l = api2
        .getUserInfo({ token })
        .then((res) => {
          if (res.data.data.openid) {
            this.user = Object.assign({}, res.data.data);
            console.log(res.data);
            window.localStorage.setItem("openid", res.data.data.openid);
          }

          if (res.data.code == "200") {
            //将数据赋值给用户数据
            this.status = "已注册";

            // this.user["sex"] = this.user["sex"] == "1" ? "男" : "女";
          } else if (res.code == "201") {
            console.log("用户尚未注册");
          }
        })
        .catch((error) => {console.log(error);});
    }
  },
};
</script>

<style>
</style>