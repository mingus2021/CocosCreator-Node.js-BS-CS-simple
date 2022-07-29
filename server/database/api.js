const connection = require('./db')

//查询所有用户
const getAllAccount = () =>{
    return new Promise((resolve,reject)=>{
        connection.query("select * from userinfo",(err,data)=>{
            console.log("getAllAccount:"+err+",data:"+data)
            resolve(data)
        })
    })
}

//查询指定用户
const getAccount = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("select * from userinfo where name = ?",param,(err,data)=>{
            console.log("getAccount:"+err+",data:"+data)
            resolve(data)
        })
    })
}

//注册用户
const registerAccount = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("insert into userinfo (name,age) value(?,?)",param,(err,data)=>{
            console.log("registerAccount:"+err+",data:"+data)
            resolve(data)
        })
    })
}

//删除指定用户
const deleteAccount = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("delete from userinfo where name = ?",param,(err,data)=>{
            console.log("deleteAccount:"+err+",data:"+data)
            resolve(data)
        })
    })
}

//更新指定用户
const updateAccount = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("update userinfo set age=? where name = ?",param,(err,data)=>{
            console.log("updateAccount:"+err+",data:"+data)
            resolve(data)
        })
    })
}

//导出方法，在需要用到的模块中导入
module.exports = {
    getAllAccount,
    getAccount,
    registerAccount,
    deleteAccount,
    updateAccount
}