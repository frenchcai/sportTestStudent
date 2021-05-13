<!--
 * @Author: your name
 * @Date: 2020-10-17 19:41:02
 * @LastEditTime: 2020-12-13 16:40:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\footer\index.vue
-->
<template>
 <van-tabbar v-model="active">
    <van-tabbar-item icon="records" to="/sign">报名查询</van-tabbar-item>
    <van-tabbar-item icon="search" to="/prostatus">状态查询</van-tabbar-item>
    <van-tabbar-item icon="medal-o" to="/grade">成绩查询</van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/home">个人中心</van-tabbar-item>
 </van-tabbar>
</template>

<script>
export default {
 name:"navfooter",
 data() {
    return {
      active: 3,
    };
  },
  watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val.fullPath);
      if(val.fullPath.indexOf("grade")>-1){
        this.active=2
            }else if(val.fullPath.indexOf("home")>-1){
              this.active=3
            }else if(val.fullPath.indexOf("sign")>-1){
              this.active=0
            }else if(val.fullPath.indexOf("prostatus")>-1){
              this.active=1
            }

    },
    // 深度观察监听
    deep: true
  }
},
  
}
</script>

<style>

</style>