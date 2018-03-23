var express = require("express");
var router = require("./router/router");
var session = require("express-session");
var app = express()
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	// 	secure: true
	// }
}))
app.set("view engine", "ejs")
app.use(express.static("./public"));
app.use('/avatar', express.static("./avatar"));
// 路由表
app.get("/", router.showIndex)
	// 注册
app.get("/regist", router.showRegist)
app.post("/doregist", router.doRegist)
	// 登录
app.get("/login", router.showLogin)
app.post("/dologin", router.doLogin)
	// 头像上传
app.get("/setavatar", router.showSetavatar)
	// 头像设置
app.post("/dosetavatar", router.doSetavatar)
	// 剪裁
app.get("/cut", router.showCut)
app.get("/docut", router.doCut)
	// 发表说说
app.post("/post", router.doPost)
	// 获取所有的所说
app.get("/getallshuoshuo", router.getAllShuoshuo) //ajax 服务
app.get("/getuserinfo", router.getUserInfo) //ajax 用户信息
	// 说说总数
app.get("/shuoshuoamount", router.shuoshuoAmount)
	// 展示用户的说说
app.get("/user/:user", router.showUser)
	// 
app.get("/userlist", router.showUserList)


app.listen(5959)