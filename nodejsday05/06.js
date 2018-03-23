var express = require('express');
var session = require("express-session");
var db = require("./model/db");
var app = express();
app.set("view engine", "ejs");
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	// 	secure: true
	// }
}))
app.get('/login', function(req, res) {
	res.render('login')
	res.send("成功denglu")
})
app.get('/checklogin', function(req, res) {
	var tianxiedeusername = req.query.username;
	var tianxiedepassword = req.query.password;
	// 根据用户填写的用户名字 去数据库读取密码 来判断密码是否一致
	db.find("user", {
		"username": tianxiedeusername
	}, function(err, result) {
		if (result.length == 0) {
			res.send('用户名错误')
			return;
		}
		var shujukupassword = result[0].password;
		if (tianxiedepassword == shujukupassword) {
			req.session.login = true;
			req.session.username = result[0].username;
			res.send("登录成功" + tianxiedeusername)
		} else {
			res.send("用户名密码错误")
		}
	})

})

app.get('/', function(req, res) {
	if (req.session.login) {
		res.send("您已经成功登陆" + req.session.username)
	} else {
		res.send("没有登陆")
	}
})

app.listen(5454)