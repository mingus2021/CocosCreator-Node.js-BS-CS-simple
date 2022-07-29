//导包
var express = require('express');
var app = express();
const {response} = require('express');
const { createConnection } = require('mysql');
const {getAccount,getAllAccount,registerAccount,deleteAccount,updateAccount} = require("./database/api")
const cors = require('cors')
app.use(cors())
//端口号设置
//解析application/x-www-form-urlencoded格式的表单数据中间件
// app.use(express.urlencoded({extended:false}))
//解析json
// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
//端口号设置
app.listen(8080,function(){
    console.log('8080端口监听中');
})

//注册请求
//  app.get('/',function(req,res){
//      res.send('无参数');
//  })

//注册用户信息请求
app.get('/person',function(req,res){
    res.send({
        name:'霧影隨風',
        age:18
    })
})

//注册用户信息请求用json格式输出
app.get('/userinfo',function(req,res){
    console.log('get userinfo');

    let response = {
        id:1,
        name:'霧影隨風',
        age:28
    };
    res.send(JSON.stringify(response));
});

//从数据库中获取所有用户信息
app.get("/get_allaccount",(req,res,next)=>{
    getAllAccount()
    .then(response =>{
        res.send(response)
    })
})

//从数据库中获取指定用户信息
app.get("/get_account",(req,res,next)=>{
    let param = req.query.name;
    getAccount(param)
    .then(response=>{
        res.send(response)
    })
})

//注册用户到数据库
app.get("/register_account",(req,res,next)=>{
    let param = [req.query.name,req.query.age];
    registerAccount(param)
    .then(response=>{
        res.send(response)
    })
})

//从数据库中删除指定用户信息
app.get("/delete_account",(req,res,next)=>{
    let param = req.query.name;
    deleteAccount(param)
    .then(response=>{
        res.send(response)
    })
})

//向数据库中更新指定用户信息
app.get("/update_account",(req,res,next)=>{
    let param = [req.query.age,req.query.name];
    updateAccount(param)
    .then(response=>{
        res.send(response)
    })
})
//express中间件访问静态网页
app.use(express.static(__dirname+'/static'))

module.exports = app