<template>
  <div>
    <van-form>
      <van-nav-bar
        title="填写个人信息"
        left-text="返回"
        left-arrow
        @click-left="back()"
        class="pagetitle"
      />
      <van-cell-group>
        <van-field label="基本信息" readonly class="gradetitle">
          <!-- <template #button><van-button type="default" size='small'>
                  前往注册</van-button>
              </template> -->
        </van-field>
      </van-cell-group>
      <van-form>
        <van-field
          v-model="user.name"
          name="name"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />

        <van-field
          name="sex"
          label="性别"
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="user.sex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
          v-model="user.school"
          name="school"
          label="学校"
          placeholder="输入学校名称"
          :rules="[{ required: true, message: '请填写学校名称' }]"
        />

        <van-field
          v-model="user.idNumber"
          name="idNumber"
          label="身份证号"
          placeholder="输入身份证件号"
          :rules="[
            {
              required: true,
              validator:idvalidator,
              message: '请填写身份证件号',
            },
          ]"
        />
        <van-field
          v-model="user.phone"
          name="phone"
          label="联系电话"
          placeholder="输入手机号码"
          :rules="[
            {
              required: true,
              validator:phonevalidator,
              message: '请填写联系方式',
            },
          ]"
        />

        <div style="margin: 16px"></div>
      </van-form>

      <van-row gutter="24" class="btbtn">
        <van-col span="10" offset="1">
          <van-button
            type="primary"
            icon="sign"
            style="width: 100%"
            @click="onSubmit"
            :text="btntext"
           
          >
          </van-button>
        </van-col>
        <van-col span="10">
          <van-button
            type="default"
            icon="close"
            style="width: 100%"
            @click="back"
            >取消</van-button
          >
        </van-col>
      </van-row>
      <div></div>
    </van-form>
  </div>
</template>

<script>
import api from "../../../api/appdatareq/index";

export default {
  data() {
    name: "register";
    return {
      btntext: "注册",
      user: {},
      idpattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
      phpattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
    };
  },
  methods: {

    phonevalidator(value){
      return this.phpattern.test(value)
    },

    idvalidator(val){
      return this.idpattern.test(val)
    },
    onSubmit() {
      //校验,需要做加密

      if(!this.user||!this.phonevalidator(this.user.phone)||!this.idvalidator(this.user.idNumber)||this.user.name==""||this.user.school==""){
        return
      }
      let token = window.localStorage.getItem("token");
      let user = this.user;
      let data = {
        token,
        openid: window.localStorage.getItem("openid"),
        user: JSON.stringify(user),
      };
      let that = this;
      if (this.btntext == "注册") {

        api.register(data).then((res) => {
          if (res.data.code == "200") {
            this.$toast.success("注册成功");
            window.setTimeout(() => {
              this.$router.replace({ name: "/home", params: { register: 1 } });
            }, 300);
          } else if (res.code == "203") {
            this.$toast.fail("此微信号已注册");
          }
        });
      } else if (this.btntext == "修改") {
        api.modifyUserInfo(data).then((res) => {
          if (res.data.code == "200") {
           this.$toast.success("修改成功");
            window.setTimeout(() => {
              this.$router.replace({ path: "/home", params: { modify: 1 } });
            }, 300);
          } else if (res.data.code == "203" || res.data.code == "201") {
            this.$toast.fail("修改失败");
          }
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
    register() {
      // api.register()
    },
  },
  mounted() {
    if (this.$route.query.type) {
    } else {
      let p = this.$route.params.user;
      // p.sex == "男" ? (p.sex = "1") : (p.sex = "0");
      this.user = p;
      this.btntext = "修改";

      console.log(this.user);
    }
  },
};
</script>

<style>
</style>