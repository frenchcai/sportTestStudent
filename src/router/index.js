/*
 * @Author: your name
 * @Date: 2020-10-17 19:17:45
 * @LastEditTime: 2020-12-14 09:15:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import my from "@/components/my"
import register from "@/components/my/register"
import sign from "@/components/sign"
import status from "@/components/prostatus"
import grade from "@/components/grade"
import gradedetail from "@/components/grade/detail"
import signdetail from "@/components/sign/detail"
import signpay from "@/components/sign/pay"
import statusdetail from "@/components/prostatus/detail"
import author from "@/components/my/author"
Vue.use(Router)

export default new Router({
  // mode:'history',
  
  routes: [
    {
      path: '/',
      name: 'my',
      component: my
    },
    {
      path: '/sportapp',
      name: 'my',
      component: my
    },
    {
      path:"/author",
      name:"author",
      component:author,
    },
    {
      path: '/home',
      name: 'my',
      component: my
    },
    {
      path: '/home/register',
      name: 'register',
      component: register
    },

    {
      path: '/sign',
      name: 'sign',
      component:sign
    },
    {
      path: '/prostatus',
      name: 'prostatus',
      component:status
    },
     {
    path: '/prostatus/detail',
    name:"statusdetail",
    component:statusdetail,
  

},
    {
      path: '/grade',
      name: 'grade',
      component:grade,
      children:[
       
    ]
  },
    {
        path: '/grade/detail',
        name:"gradedetail",
        component:gradedetail,
      
  
    },
    {
      path: '/sign/detail',
      name:"signdetail",
      component:signdetail,
    

  },
  //报名信息确认路由
  {
    path: '/sign/pay',
    name:"signpay",
    component:signpay,
  
  }

]
})
