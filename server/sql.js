const run = require('./connect')
const { ObjectId } = require("mongodb");
// let global.database=global.global.database;
// let client=global.client;
//连接数据库客户端

//报名页面数据
async function getGameList() {
    // ////let { global.database, client } = await run()
    let getGameList = []
    let msg={}
    if (global.database) {
        try {
            const collection = global.database.collection('match');
            const gameList = await collection.find().toArray()
            gameList.map(item => {
                let game = {}
                game.project_name = item.project_name
                game.time = item.event_time
                game.site = item.site
                game.id = ObjectId(item._id).toString()
                //转成字符串，查询的时候可以转回来
                game.content = item.content
                getGameList.push(game)

            })
        
        } catch (error) {
            console.log(error)
        }
        finally {
            // //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    msg['code']=200
    msg['data']=getGameList
    return msg
}


//状态查询列表
async function getMycompetitionList(wxid) {
    //let { global.database, client } = await run()
    let getGameList = []
    let msg={}
    console.log(global.database);
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            let ha = false
            console.log(wxid);
            // console.log(userList,"userList");
            userList.some((item, index) => {
                if (wxid == item.wxId) {
                    console.log("我是id");
                    let projectLists = item.project
                    projectLists.map((item2, index) => {
                        console.log(projectLists);
                        let itemList = item2['item']||[]
                        let fingrade = 0
                        itemList.map((item2, index) => {
                            if (item2.grade != "") {
                                fingrade = parseInt(item2.grade) + fingrade
                            }
                        })
                        let obj = {}
                        obj['status'] = ""
                        obj['project_name'] = item2['project_name']
                        obj['registration_time'] = item2['registration_time']
                        //说明这个比赛有些项目已经有成绩可以查询

                        if (fingrade == 0) {
                            obj['status'] = "完成报名"
                        } else if (fingrade < itemList.length * 100) {
                            obj['status'] = "考试中"
                        }
                        else {
                            obj['status'] = "完成考试"
                        }
                        getGameList.push(obj)


                    })
                    return true
                }
                
            })

            if(getGameList.length){
                console.log(getGameList,"getGameList");
                msg['code']=200
                msg['gamelist']=getGameList
            }else{
                msg['code']=201
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            // //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    return msg


}










//成绩查询列表
async function getMyGradeList(wxid) {
    //let { global.database, client } = await run()
    let getGameList = []
    let msg={}
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            let ha = false
            userList.some((item, index) => {
                if (wxid == item.wxId) {
                    let projectLists = item.project
                    projectLists.map((item, index) => {
                        console.log(projectLists,"成绩查询projectList");
                        let itemList = item['item']||[]
                        let fingrade = 0
                        itemList.map((item2, index) => {
                            if (item2.grade && item2.grade != "") {
                                fingrade = parseInt(item2['fingrade']) + fingrade
                            }
                        })
                        //说明这个比赛有些项目已经有成绩可以查询
                        if (fingrade != 0) {

                            let obj = {}
                            obj['fingrade'] = fingrade
                            obj['project_name'] = item['project_name']
                            obj['registration_time'] = item['registration_time']
                            getGameList.push(obj)

                        }
                    })
                    return true
                }
                
            })

            if(getGameList.length>0){
                console.log("getGameList",getGameList);
                msg['code']=200
                msg['project']=getGameList
            }else{
                //暂无可以查询成绩的比赛
                console.log("无考试记录",getGameList);

                msg['code']=201
                console.log("无考试记录",msg);

            }
        } catch (error) {
            console.log(error)
        }
        finally {
            // //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    console.log(msg,"msg");
    return msg
}



// async function getMyGradeList(wxid){
//     let {global.database,client}=await run()
//     let getGameList=[]
//     if(global.database){
//         try{
//             const collection = global.database.collection('match');
//             const gameList = await collection.find().toArray()
//             let ha=false
//             gameList.map((item,index)=>{
//                 let prolist=item["项目"]
//                 for(let key in prolist){
//                     users=prolist[key]
//                     ha=users.some((user,index)=>{
//                         return user.wxid==wxid&&user.fingrade!=''
//                     })
//                     if(ha){
//                     //如果说用户报名了某一个项目，那么就是参加了这次比赛，立马结束循环
//                         break
//                     }
//                 }
//                 if(ha){
//                     let game={}
//                     game.project_name=item.project_name
//                     game.time=item.event_time
//                     game.site=item.site
//                     game.id=ObjectId(item._id).toString()
//                     //转成字符串，查询的时候可以转回来
//                     game.content=item.content
//                     getGameList.push(game)

//                 }

//             })

//         } catch(error){
//             console.log(error)
//         }
//         finally{
//             //client.close()
//         }

// }else{
//     console.log("数据库连接失败")

// }
// return  getGameList
// }


// 通过比赛id查询该比赛各个项目的详细信息（报名详情）
async function gameDetail(projectname) {
    //let { global.database, client } = await run()
    let project = {}
    let msg={}
    if (global.database) {
        try {
            const collection = global.database.collection('match');
            const gameList = await collection.find().toArray()
            let ha = false
            gameList.some((item, index) => {
                if (projectname ==item.project_name) {
                    project['project_name'] = item.project_name
                    project['time'] = item.event_time
                    project['site'] = item.site
                    project['content'] = item.content
                    project['itemlist'] = []

                    let item2 = item["item"]
                    //item2,具体项目对象,
                    //100米:{}
                    for (let itemname in item2) {
                        // item是一个对象，name是项目名称
                        let itemobj = {}
                        itemobj['item_name'] = itemname
                        // itemobj['detail_site'] = item2[itemname].competition_site
                        itemobj['item_time'] = item2[itemname].competition_time
                        itemobj['item_cost'] = item2[itemname].cost
                        project['itemlist'].push(itemobj)
                    }
                    return true;
                }
            })

        } catch (error) {
            console.log(error)
        }
        finally {
            // //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    msg['code']=200
    msg['data']=project
    return msg
}

//成绩详情
async function projectGradeList(projectname, wxid) {
    //let { global.database, client } = await run()
    let mygamegradelist = []
    let msg={}
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            userList.some((item, index) => {
                if (wxid == item.wxId) {
                    let projectlist = item.project
                    projectlist.some((project, index) => {
                        if (projectname == project.project_name) {
                            console.log(project)
                            let proitems = project.item
                            proitems.map((item2, index) => {
                                let itemobj = {...item2}
                                // itemobj['item_name'] = item.item_name
                                // itemobj['item_site'] = item.item_site
                                // itemobj['item_time'] = item.item_time
                                // item['group'] = project.group
                                // itemobj['grouping'] = item.grouping
                                // itemobj['serialNumber'] = item.serialNumber
                                // itemobj['wayNumber'] = item.wayNumber
                                // itemobj['grade'] = item.grade
                                // itemobj['session'] = item.session
                                // itemobj['identifier'] = item.identifier
                                mygamegradelist.push(itemobj)

                            })
                            return true
                        }
                    })
                }
            })
            if(mygamegradelist.length){
                msg['code']=200
                msg['itemlist']=mygamegradelist
            }else{
                msg['code']=201
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    return msg


}


// 通过比赛id查询该用户参加此项比赛的各个项目报名状态
async function myGameDetail(projectname, wxid) {
    //let { global.database, client } = await run()
    let myproject = {}
    let msg={}
    myproject['itemlist'] = []
    // let mygamegradelist=[]
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            userList.some((item, index) => {
                if (wxid == item.wxId) {
                    let projectlist = item.project
                    projectlist.some((project, index) => {
                        if (projectname == project.project_name) {
                            // console.log(project)
                            myproject['project_name'] = project.project_name
                            myproject['site'] = project.site
                            myproject['registration_time'] = project.registration_time
                            let proitems = project.item||[]
                            proitems.map((item, index) => {
                                let itemobj = {...item}
                                // itemobj['item_name'] = item.item_name
                                // // itemobj['detail_site'] = item.item_site
                                // itemobj['item_time'] = item.item_time
                                // item['divideGround'] = project.group
                                // itemobj['grouping'] = item.grouping
                                // itemobj['number'] = item.serialNumber
                                // itemobj['paodao'] = item.wayNumber
                                // itemobj['grade'] = item.grade
                                // itemobj['session'] = item.session
                                // itemobj['identifier'] = item.identifier

                                itemobj['item_status'] = item.grade ? "完成考试" : "完成报名"
                                myproject.itemlist.push(itemobj)

                            })
                            return true
                        }
                    })
                    return true
                }
            })

            if(myproject.project_name){
                 msg['code']=200
                msg['project']=myproject
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    return msg


}
//同步数据到match集合
async function insertRecordToMatch(data, wxid) {
    //let { global.database, client } = await run()
    let msg = {}
    let hassameitem = []
    //code200插入成功，201失败，203插入重复
    // myproject['projectlist']=[]
    // let mygamegradelist=[]
    if (global.database) {
        try {
            const collection = global.database.collection('match');
            const projectList = await collection.find().toArray()
            let proitem = []
            projectList.some((item, index) => {
                if (item.project_name == data.project_name) {
                    // item['item']['100米']
                    proitem = item['item']
                    data['itemList'].map((item2, index) => {
                        let itemname = item2['item_name']
                        let userList = item['item'][itemname]['specific_personnel']
                        //判断有没有报名了
                        userList.some(user => {
                            if (user['wxid'] == wxid) {
                                hassameitem.push(item2['item_name'])

                            }
                        })

                    })

                    if (hassameitem.length > 0) {
                        console.log(hassameitem[0], "重复了")
                        msg['code'] = 203
                        msg['hassameitem'] = hassameitem

                    } else {
                        //没有重复
                        data['itemList'].map((item2, index) => {
                            let itemname = item2['item_name']
                            let userList = item['item'][itemname]['specific_personnel']
                            delete item2['checked']
                            userList.push({
                                wxid,
                                name: data.name,
                                sex: data.sex,
                                school: data.school,
                                phone: data.phone,
                                idNumber: data.idNumber,
                                divGroup:"",
                                group:"",
                                games: "",
                                gameSession: "",
                                serialNumber: "",
                                rank:"",
                                wayNumber: "",
                                grade:"",
                                fingrade:"",
                                remark:"",
                                unit:"",
                                identifier:"",
                                ...item2
                            })
                            console.log(userList)

                        })
                    }
                    return true
                }
            })

            try {
                //没有重复才能插入
                if (hassameitem.length == 0) {
                    let a = await collection.updateOne({ 'project_name': data['project_name'] }, { $set: { 'item': proitem } })
                    if (a.result.nModified) { msg['code'] = 200; } else { msg['code'] = 201 }
                }


            } catch {
                console.log("更新失败")
                msg['code'] = 201

            }

        } catch (error) {
            console.log(error)
            //client.close()

        }
    }
    return msg
}





async function sign(data, wxid) {
    //let { global.database, client } = await run()
    let msg = {}
    let hassameitem = []
    //code200插入成功，201失败，203插入重复
    // myproject['projectlist']=[]
    // let mygamegradelist=[]
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            let projectlist = []
    
            userList.some((item, index) => {
                projectlist = item.project
                if (wxid == item.wxId) {
                    data['name'] = item.name
                    data['sex'] = item.sex
                    data['phone'] = item.phone
                    data['idNumber'] = item.idNumber
                    data['school'] = item.school

                    let project = {}
                    let nowdate = new Date()
                    let stringnow = nowdate.getFullYear() + '-' + (nowdate.getMonth()+1) + "-" + nowdate.getDate() + " " + nowdate.getHours() + ":" + nowdate.getMinutes() + ":" + nowdate.getSeconds()
                    project["project_name"] = data.project_name
                    project["time"] = data.time
                    project["site"] = data.site
                    project["group"] = ""
                    project["company"] = ""
                    project["remarks"] = ""
                  

                    project["registration_time"] = stringnow
                    project["paid"] = data.paid.toString()

                    data.itemList.map((i)=>{
                        delete i['checked']
                        i["games"]= ""
                        i["session"]= ""
                        i["serialNumber"]= ""
                        i["rank"]= ""
                        i["wayNumber"]= ""
                        i['grade']=""
                        i['fingrade']=""

                    })
                    project["item"] = data.itemList







                    //判断该会员是否之前报名过该比赛，现在补报，
                    if (projectlist.length == 0 ) {
                        //还没有报名过任何比赛
    
                        projectlist.push(project)
                    } else {

                        let time=projectlist.some((project, index2) => {
                        //已经报名过该比赛

                            if (data.project_name == project.project_name) {
                                // console.log(project)
                                let proitems = project.item||[]
                                // console.log(data);
                                let dataitemlen = data.itemList.length
                                if(dataitemlen&&proitems&&proitems.length){
                                    proitems.map((item, index) => {
                                        for (let i = 0; i < dataitemlen; i++) {
                                            if (item.item_name == data.itemList[i].item_name) {
                                                hassameitem.push(item.item_name)
                                            }
                                        }
                                    })

                                }
                                
                                if (hassameitem.length > 0) {
                                    //返回错误，提示哪个重复报名了，让用户重新选择报名
                                    console.log(hassameitem[0], "重复了")
                                    msg['code'] = 203
                                    msg['hassameitem'] = hassameitem

                                } else {
                                    //没有重复
                                    proitems=proitems.concat(data.itemList)
                                    projectlist[index2].paid = (Number.parseInt(projectlist[index2].paid) + Number.parseInt(data.paid)).toString()
                                    projectlist[index2].item = proitems


                                }
                                return true

                            }
                        })

                        //未报名过该比赛

                        if(!time){
                            projectlist.push(project)

                        }



                        

                    }
                    return true
                }

            })
            //提交更新
            try {
                if (hassameitem.length == 0) {
                    let a = await collection.updateOne({ 'wxId': wxid }, { $set: { 'project': projectlist } })
                    console.log("user表插入结果",a);
                    let b = await insertRecordToMatch(data, wxid)
                    if (a.result.nModified && b.code == "200") { msg['code'] = 200 } else { msg['code'] = 201 }
                }
            } catch {
                console.log("更新失败")
                msg['code'] = 201

            }

        } catch (error) {
            console.log(error)
            //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    return msg
}

async function register(data) {
    //let { global.database, client } = await run()
    let msg = {}
    let hassameitem = []
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            // let projectlist=[]
            userList.some((item, index) => {
                if (data.wxId == item.wxId) {
                    hassameitem.push(item)
                    return true
                }
            })

            if (hassameitem.length > 0) {
                //会员信息重复，以注册

                msg['code'] = 203
                msg['hassameitem'] = hassameitem


            } else {
                //会员尚未注册
                try {
                    // db.COLLECTION_NAME.(document
                    data['sex']=data['sex']
                    let a = await collection.insertOne(data)

                    if (a.result.ok) { msg['code'] = 200 } else { msg['code'] = 201 }

                } catch {
                    console.log("注册失败")
                    msg['code'] = 201

                }

            }


        } catch (error) {
            console.log(error)
            msg['code'] = 201
            //client.close()
        }

    } else {
        console.log("数据库连接失败")
        msg['code'] = 205

    }
    return msg
}
async function modifyUserInfo(data) {
    //let { global.database, client } = await run()
    let msg = {}
    let hassameitem = []
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            // let projectlist=[]
            userList.some((item, index) => {
                if (data.openid == item.wxId) {
                    hassameitem.push(item)
                    return true
                }
            })

            if (hassameitem.length > 0) {

                //会员信息存在，修改
                let stu = hassameitem[0]
                stu["name"] = data.name
                stu['sex'] = data.sex
                stu["idNumber"] = data.idNumber
                stu["phone"] = data.phone
                stu["school"] = data.school

                try {
                    // db.COLLECTION_NAME.(document
                    let a = await collection.updateOne({ 'wxId': data.openid },
                        { $set: { name: stu["name"], idNumber: stu['idNumber'], phone: stu['phone'], school: stu['school'], sex: stu['sex'] } })
                
                    if (a.result.ok) { msg['code'] = 200 } else { msg['code'] = 201 }

                } catch {
                    console.log("注册失败")
                    msg['code'] = 201

                }



            } else {
                //会员尚未注册
                msg['code'] = 201



            }


        } catch (error) {
            console.log(error)
            msg['code'] = 201
            //client.close()
        }

    } else {
        console.log("数据库连接失败")
        msg['code'] = 205

    }
    return msg
}



async function get_user_infoIndb(wxid) {
    //let { global.database, client } = await run()
    let msg = {}
    let hasitem = []
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            // let projectlist=[]
            userList.some((item, index) => {
                if (wxid == item.wxId) {
                    let user = {}
                    // console.log(item,"查询到的用户");
                    user['name'] = item.name
                    user['phone'] = item.phone
                    user['sex'] = item.sex
                    user['idNumber'] = item.idNumber
                    user['school'] = item.school
                    msg['data'] = user
                    hasitem.push(user)
                    return true
                }
            })

            if (hasitem.length > 0) {
                msg['code'] = 200

            } else {
                //会员尚未注册
                msg['code'] = 201
                msg['data']={}


            }


        } catch (error) {
            console.log(error)
            msg['code'] = 201
            //client.close()
        }

    } else {
        console.log("数据库连接失败")
        msg['code'] = 205

    }
    return msg
}





async function getProjectByName(data) {
    //let { global.database, client } = await run()
    let getGameList = []
    if (global.database) {
        try {
            const collection = global.database.collection('match');
            const gameList = await collection.find().toArray()
            gameList.map(item => {
                if (data['project_name'] == item.project_name) {
                    let game = {}
                    game.project_name = item.project_name
                    game.time = item.event_time
                    game.site = item.site
                    game.id = ObjectId(item._id).toString()
                    //转成字符串，查询的时候可以转回来
                    game.content = item.content
                    getGameList.push(game)

                }
            })

        } catch (error) {
            console.log(error)
        }
        finally {
            //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }

    return getGameList
}

async function getProjectById(data) {
    //let { global.database, client } = await run()
    let getGameList = []
    if (global.database) {
        try {
            const collection = global.database.collection('users_copy1');
            const userList = await collection.find().toArray()
            userList.some((item, index) => {
                if (data['idNumber'] == item.idNumber || data['phone'] == item.phone) {
                    let projectLists = item.project
                    projectLists.map((item, index) => {
                        let itemList = item['item']
                        let fingrade = 0
                        itemList.map((item2, index) => {
                            if (item2.grade != "") {
                                fingrade = parseInt(item2.grade) + fingrade
                            }
                        })
                        let obj = {}
                        obj['status'] = ""
                        obj['project_name'] = item['project_name']
                        obj['registration_time'] = item['registration_time']
                        //说明这个比赛有些项目已经有成绩可以查询

                        if (fingrade == 0) {
                            obj['status'] = "完成报名"
                        } else if (fingrade < itemList.length * 100) {
                            obj['status'] = "考试中"
                        }
                        else {
                            obj['status'] = "完成考试"
                        }
                        getGameList.push(obj)

                    })
                }
                return true
            })
        } catch (error) {
            console.log(error)
        }
        finally {
            //client.close()
        }

    } else {
        console.log("数据库连接失败")

    }
    return getGameList


}

module.exports = {
    insertRecordToMatch,
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
}



