/*
 * @Author: your name
 * @Date: 2020-10-31 17:24:08
 * @LastEditTime: 2021-03-06 17:49:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sportapp\server\connect.js
 */
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
const { resolve } = require("mongodb/lib/core/topologies/read_preference");

// Replace the uri string with your MongoDB deployment's connection string.



//本地连接
const uri =
  "mongodb://127.0.0.1:27017/?authSource=sports&useUnifiedTopology=true ";


//远程服务器地址、
// const uri =
//   "mongodb://sports11:123456@106.14.117.35:27017/?authSource=sports&useUnifiedTopology=true ";

  
const client = new MongoClient(uri);
let database=null

async function run() {
    try {
      await client.connect();
      database= await client.db('sports');
      return {database,client}
    } catch(error){
      console.log(error)
    }
  
    finally {
      
    }
  }



run().then(res=>{

    console.log("66664")
    // console.log(res);
    // getGameList(res)
    database=res


})

module.exports = run



