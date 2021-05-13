/* eslint-disable */
var express = require('express')
var https = require('https')
// 引入cors
var cors = require('cors')
//  引入jwt-simple https://github.com/hokaccha/node-jwt-simple
var jwt = require('jwt-simple')
//  引入模块
var bodyParser = require('body-parser')

var app = express()
const {
    getGameList,//报名页面
    getMycompetitionList,//状态查询
    getMyGradeList,//成绩查询页面
    gameDetail,//比赛项目细节
    projectGradeList,//项目成绩列表
    myGameDetail,//通过比赛名称查询该用户参加此项比赛的各个项目报名状态
    sign,//报名缴费
    register,//会员注册
    modifyUserInfo,//修改会员信息
    get_user_infoIndb,//获取个人信息
    getProjectByName,//报名检索
    getProjectById,//电话或id检索状态
} = require('../sql')

const run = require("../connect")
let database, client;
//连接数据库



// import { database } from "./databse"

// 解决跨域
app.use(cors())
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))


function parseToken(token) {
    const JWT_SECRET = 'yubing' // 秘钥
    // decode
    var decoded = jwt.decode(token, JWT_SECRET)
    console.log(decoded) //=> payload
    return decoded
}

app.get('/get_wxauth', function (req, res) {
    res.json({
        status: 200,
        url: authorizeUrl
    })
})



//注册
app.post('/api/v1/user/register', function (req, res) {
    console.log(req.body.token)
    if (req.body.token) {
        const payload = parseToken(req.body.token)
        console.log(payload);
        if (payload['openid'] == req.body.openid) {
            console.log(req.body);
            data = JSON.parse(req.body.user)
            let user = {
                ...data,
                wxId: req.body.openid,
                project: []
            }
            register(user).then(res1 => {
                res.json({
                    status: 200,
                    data: res1
                })
            }).catch(error => {
                res.send("请求个人信息失败")
            })

        }


    } else {
        res.send('缺少token')
    }
})


app.get('/api/v1/user/get_user_info', function (req, res) {
    // console.log(req.get("Authorization"));
    if (req.get('Authorization')) {
        //解密
        const payload = parseToken(req.get('Authorization'))
        console.log(payload['openid']);
        if (payload['openid']) {
            get_user_infoIndb(payload['openid']).then(data => {
                
                data['data']['headimgurl'] = payload['headimgurl']
                data['data']['openid'] = payload['openid']
                console.log("获取个人信息,", data);
                res.json({
                    ...data
                })
            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "请求个人信息失败"
                })
            })


        }


    } else {
        res.send('缺少token')
    }
})

app.post('/api/v1/user/modifyUserInfo', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        if (payload['openid'] == req.body.openid) {
            let user = JSON.parse(req.body.user)
            modifyUserInfo(user).then(data => {
                res.json({
                    ...data
                })

            }).catch(error => {
                res.json({
                    msg: "修改个人信息失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }
})


app.get('/api/v1/user/getCompetitionList', function (req, res) {
    console.log(req.query)
    getGameList().then(data => {
        if (data.code ==200) {
            res.json({

                ...data

            })
        }
    }).catch(error => {
        res.json({
            code: 201,
            msg: "获取信息失败"
        })
    })


})


app.post('/api/v1/user/getMycompetitionList', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        if (payload['openid'] == req.body.openid) {
            getMycompetitionList(payload['openid']).then(data => {
                if (data.code ==200) {
                    res.json({
                        ...data
                    })
                }
            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "获取信息失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }



})


app.post('/api/v1/user/getMyGradeList', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        // const name=req.body.project_name
        if (payload['openid'] == req.body.openid) {
            getMyGradeList(payload['openid']).then(data => {
                if (data.code ==200) {
                    res.json({
                        ...data
                    })
                }else if(data.code==201){
                    res.json({
                        code:201,
                        msg:"暂无考试记录"
                    })
                }
            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "获取信息失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }
})

app.post('/api/v1/user/projectGradeList', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        const name=req.body.project_name
        if (payload['openid'] == req.body.openid) {
            projectGradeList(name,payload['openid']).then(data => {
                if (data.code ==200) {
                    res.json({
                        ...data
                    })
                }
            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "获取信息失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }
})

app.post('/api/v1/user/myGameDetail', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        const name=req.body.project_name
        if (payload['openid'] == req.body.openid) {
            myGameDetail(name,payload['openid']).then(data => {
                if (data.code ==200) {
                    res.json({
                        ...data
                    })
                }
            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "获取信息失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }

})

app.get('/api/v1/user/gameDetail', function (req, res) {
    console.log(req.query)
    try {
        gameDetail(req.query["name"]).then(data => {
            if (data.code == 200) {
                res.json({
                    ...data
                })
            }
        }).catch(error => {
            res.json({ code: 201, msg: "获取失败" })
        })
    } catch (error) {
        console.log(error);
    }

})

app.post('/api/v1/user/sign', function (req, res) {
    if (req.body.token) {
        //解密
        const payload = parseToken(req.body.token)
        if (payload['openid'] == req.body.openid) {
            let project = JSON.parse(req.body.project)
            sign(project, payload['openid']).then(data => {
                res.json({
                    ...data
                })

            }).catch(error => {
                res.json({
                    code: 201,
                    msg: "报名失败"
                })
            })
        }

    } else {
        res.send('缺少token')
    }
})

app.get('/api/v1/user/getProjectByName', function (req, res) {
    res.json({
        status: 200,
    })
})

app.get('/api/v1/user/getProjectById', function (req, res) {
    res.json({
        status: 200,

    })
})

app.get('/api/v1/user/getGradeProjectByName', function (req, res) {
    res.json({
        status: 200,
    })
})

try {
    run().then(res => {
        global.database = res.database
        global.client = res.client
        console.log("数据库连接成功");
        // console.log(res);
        //数据库连接成功才启动服务
        app.listen(3333, () => console.log('server listening is running at http://localhost:3333'))

    })
} catch (error) {
    if (global.client) {
        global.client.close()
    }
    console.log(error);
}

