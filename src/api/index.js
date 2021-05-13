/*
 * @Author: your name
 * @Date: 2020-10-31 09:31:49
 * @LastEditTime: 2020-12-12 12:37:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\src\api\index.js
 */
/**
 * api接口的统一管理
 */

import axios from '@/utils/http' // 导入http中创建的axios实例

// 导出接口
export default {
  getWxAuth (params) {
    return axios.get(`/get_wxauth`, {
      params: params
    })
  },
  getUserInfo (data) {
    return axios.post(`/get_user_info`, data)
  },
  getOpenid(url){
    return axios.get(url)
  }
//   //注册为会员
//   register(data){
//     return axios.post(`/api/v1/user/register`, data)
//   },

// //app中获取用户在平台注册的信息
//   get_user_infoIndb(data){
//     return axios.post(`/api/v1/user/get_user_info`, data)
//   }
//   ,
//   //修改app的个人信息
//   modifyUserInfo(data){
//     return axios.post(`/api/v1/user/modifyUserInfo`, data)
//   },


// //查询报名列表
//   getCompetitionList(data){
//     return axios.get(`/api/v1/user/getCompetitionList`, data)
//   },

// //查询状态列表
//   getMycompetitionList(data){
//     return axios.get(`/api/v1/user/getMycompetitionList`, data)
//   },

// //查询成绩列表
//   getMyGradeList(data){
//     return axios.get(`/api/v1/user/getMyGradeList`, data)
//   },

// //通过比赛id查询该用户参加此项比赛的各个项目成绩信息列表
//   projectGradeList(data){
//     return axios.get(`/api/v1/user/projectGradeList`, data)
//   },

//   //通过比赛id查询该用户参加此项比赛的各个项目报名状态
//   myGameDetail(data){
//     return axios.get(`/api/v1/user/myGameDetail`, data)
//   },

//   //通过比赛id查询该比赛各个项目的详细信息（报名详情）
//   gameDetail(data){
//     return axios.get(`/api/v1/user/gameDetail`, data)
//   },


//   //缴费报名比赛
//   sign(data){
//     return axios.post(`/api/v1/user/sign`, data)
//   },

//   //通过比赛名称检索比赛
//   getProjectByName(data){
//     return axios.get(`/api/v1/user/getProjectByName`, data)
//   },
//   //通过身份证号或电话号码查询报名状态
//   getProjectById(data){
//     return axios.get(`/api/v1/user/getProjectById`, data)
//   },

// //通过比赛名称获取有成绩的比赛列表
//   getGradeProjectByName(data){
//     return axios.get(`/api/v1/user/getGradeProjectByName`, data)
//   }
}
