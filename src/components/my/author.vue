<!--
 * @Author: your name
 * @Date: 2020-12-12 14:05:55
 * @LastEditTime: 2020-12-14 10:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\my\author.vue
-->
<!--
 * @Author: your name
 * @Date: 2020-12-12 14:05:55
 * @LastEditTime: 2020-12-12 15:49:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\components\my\anuthor.vue
-->
<template>
    <div style="height:500px;display:flex;justify-content:center;align-items:center;">
        <van-loading type="spinner" size="24px" vertical>加载中</van-loading>
    </div>
</template>
<script>
import { getQueryString } from "../../utils/utils";
export default {
    name:"微信授权回调页面",
    data(){
        return{
            
        }
    },
    created(){
            //判断是否为回调跳转
    const token = window.location.href.split("?token=")[1].split("&msg=")[0];

    console.log(token);
    if (token) {
      //如果拿到token说明已经授权成功，将其储存在本地
      window.localStorage.setItem("token", token);

      this.$router.replace("/home")
    //   window.location.href="http://127.0.0.1:8080/home"
      
   
    }

    }
}
</script>