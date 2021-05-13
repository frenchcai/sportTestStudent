/*
 * @Author: caifawen 
 * @Date: 2020-10-31 23:19:16
 * @LastEditTime: 2020-12-14 14:40:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\server\test.js
 */

const {get_user_infoIndb,getMyGradeList,getMycompetitionList
,getProjectById,sign,insertRecordToMatch,gameDetail
} = require('./sql')

let data={"project_name": "测试联合插入",
"time": "比赛时间",
"site": "比赛地点",
"group": "组别",
"company": "单位 ",
"remarks": "备注",
"registration_time": "报名时间",
"paid": "10",
"itemList": [
    {
        "item_name": "跳远",
        "item_time": "项目比赛时间",
        "item_site": "项目比赛详细地点",
        "item_rank": "项目名次",
        "item_paid": "项目报名已交费用",
        "games": "赛次",
        "session": "场次",
        "grouping": "分组",
        "serialNumber": "序号",
        "identifier": "编号",
        "wayNumber": "道次",
        "grade": "成绩",
        "cost": "10"
    },
    {
        "item_name": "足球",
        "item_time": "项目比赛时间",
        "item_site": "项目比赛详细地点",
        "item_rank": "项目名次",
        "item_paid": "项目报名已交费用",
        "games": "赛次",
        "session": "场次",
        "grouping": "分组",
        "serialNumber": "序号",
        "identifier": "编号",
        "wayNumber": "道次",
        "grade": "成绩",
        "cost": "10"
    }
]
}

let stu={"name": "更新",
    "sex": "nan",
    "wxId": "oXIaz5gLrgPU51l8jGpQ7whyKc-4",
    "idNumber": "身份证号2",
    "phone": "电话号码2",
    "school": "学校2",
}
// da={idNumber:'44092319980801231'}
// data={phone:"1234567890"}

getMycompetitionList('oXIaz5gLrgPU51l8jGpQ7whyKc-4').then(res=>{
    console.log(res)
})

function f(4){
	console.log("#1",n)
	if(n<4){f(n+1)};
    console.log("#2",n)
}


f(3){
    console.log("#1",3)
	if(n<4){f(4)};
	console.log("#2",3)
    
}


f(2){
    console.log("#1",2)
	if(n<4){f(3)};
	console.log("#2",2)
}

f(1){
    console.log("#1",1)
	if(n<4){f(2)};
	console.log("#2",1)
}