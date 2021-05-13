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

// const appID = 'wx4711d6a8aee6654a'
// const appSecret = 'f4c4feabc71413b45b2b7d4f03d1c152'
const appID = 'wx3018871a01076940'
const appSecret = 'c15d0fb87c8be0a2a3505899f432c95b'

// const appID = 'wx3018871a01076940'
// const appSecret = 'c15d0fb87c8be0a2a3505899f432c95b '

// 授权回调域名
let host = `http://139.9.93.62:3333`
// 授权后重定向url地址 注意是编码后url，不编码#后面的参数会消失
let redirectUrl = encodeURIComponent(`${host}/wechat_login`)

// 微信授权url地址,点击授权后跳转到重定向地址并带上code参数
let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
    `${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`


// 前端请求该接口返回微信授权的地址
app.get('/get_wxauth', function (req, res) {
    res.json({
        status: 200,
        url: authorizeUrl
    })
})




// 微信授权回调的接口
app.get('/wechat_login', async function (req, res) {
    // 解析querystring获取URL中的code值
    const code = req.query.code
    // 通过拿到的code和appID、appSerect获取返回信息
    const result = await getAccessToken(code)
    // 解析得到access_token和openid
    const {
        access_token,
        openid
    } = result
    // 通过上一步获取的access_token和open_id获取userInfo即用户信息
    const userInfo = await getUserInfo(access_token, openid)

    console.log(userInfo)

    
    // localStorage.setItem('user', userInfo)
        // 获取beforeLoginUrl 页面地址
    //  const url = window.localStorage.getItem('beforeLoginUrl')
    const token = createToken(userInfo.openid, userInfo.nickname,userInfo.headimgurl,userInfo.sex)
    const msg = 200
    
    const redirectUrl = `http://127.0.0.1:8080/author?token=${token}&msg=${msg}`
    res.writeHead(302, {
        'Location': redirectUrl
    })
    res.end()
})



// // 拿到用户的openid，和token做对比，防止恶意劫持token
// app.get('/wechat_login', async function (req, res) {
    
//    // 解析querystring获取URL中的code值
//    const code = req.query.code
//    // 通过拿到的code和appID、appSerect获取返回信息
//    const result = await getAccessToken(code)
//    // 解析得到access_token和openid
//    const {
//        access_token,
//        openid
//    } = result
//    console.log(result);
//    res.send({
//        code:200,
//        openid
//    })
//    // 通过上一步获取的access_token和open_id获取userInfo即用户信息
// //    const userInfo = await getUserInfo(access_token, openid)

// //    console.log(userInfo)


// })




// 通过拿到的code和appID、app_serect获取access_token和open_id
function getAccessToken(code) {
    return new Promise((resolve, reject) => {
        const getAccessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSecret}&code=${code}&grant_type=authorization_code`
        https.get(getAccessUrl, (res) => {
            res.setEncoding('utf8') // 设置编码为 utf8
            let rawData = '' // 二进制原始数据
            res.on('data', (chunk) => {
                rawData += chunk
            })
            res.on('end', () => {
                let result = JSON.parse(rawData)
                resolve(result)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 通过上一步获取的access_token和open_id获取userInfo即用户信息
function getUserInfo(access_token, openid) {
    return new Promise((resolve, reject) => {
        const getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        https.get(getUserUrl, (res) => {
            let rawData = ''
            res.on('data', (chunk) => {
                rawData += chunk
            })
            res.on('end', () => {
                let userInfo = JSON.parse(rawData)
                resolve(userInfo)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}

app.post('/get_user_info', function (req, res) {
    if(req.get('Authorization')){
        const payload = parseToken(req.get('Authorization'))
        res.json(payload)
    }else{
        res.send('缺少token')
    }
})

// 模拟生成用户token & 解析token
function createToken(openid,nickname,headimgurl,sex) {
    const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7 // 7天过期时间
    const JWT_SECRET = 'yubing' // 秘钥
    // 需要加密的对象
    const payload = {
        openid: openid,
        username:nickname,
        headimgurl:headimgurl,
        sex:sex,
        environment: 'web',
        expires: Date.now() + tokenExpiresTime
    }
    // encode
    const token = jwt.encode(payload, JWT_SECRET)
    return token
}

function parseToken(token) {
    const JWT_SECRET = 'yubing' // 秘钥
    // decode
    var decoded = jwt.decode(token, JWT_SECRET)
    console.log(decoded) //=> payload
    return decoded
}

// TODO 静默授权下判断用户是否关注过公众号
app.get('/test', async function (req, res) {
    const code = req.query.code
    if (code) {
        // code存在 直接验证
        const result = await getAccessToken(code)
        const {
            openid
        } = result
        // 获取公众号的access_token，此access_token不是用户授权后的access_token
        const retToken = await getToken(appID, appSecret)
        const {
            access_token
        } = retToken
        const subscribeInfo = await getSubscribeMsg(access_token, openid)
        console.log(subscribeInfo)
    } else {
        // 进行微信授权
        let callbackUrl = encodeURIComponent('http://127.0.0.1:3000/test')
        let getCodeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
            `${callbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        res.redirect(getCodeUrl)
    }
})

// 获取基础token，注意：获取公众号的access_token，此access_token不是用户授权后的access_token
// 文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
function getToken(appid, appsecret) {
    return new Promise((resolve, reject) => {
        const get_token_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
        https.get(get_token_url, (res) => {
            res.setEncoding('utf8') // 设置编码为 utf8
            let rawData = '' // 原始数据
            res.on('data', (chunk) => {
                rawData += chunk
            })
            res.on('end', () => {
                let jsonData = JSON.parse(rawData)
                resolve(jsonData)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}


// 获取用户基本信息 判断是否关注该公众号
function getSubscribeMsg(access_token, openid) {
    return new Promise((resolve, reject) => {
        // 文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839
        const get_subscribe_url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        https.get(get_subscribe_url, (res) => {
            res.setEncoding('utf8') // 设置编码为 utf8
            let rawData = '' // 原始数据
            res.on('data', (chunk) => {
                rawData += chunk
            })
            res.on('end', () => {
                let jsonData = JSON.parse(rawData)
                resolve(jsonData)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}


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

