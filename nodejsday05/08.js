var express = require('express');
var formidable = require('formidable');
var session = require("express-session");
var md5 = require("./model/md5");
var db = require("./model/db");
var app = express();
app.use(express.static("./public"));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	// 	secure: true
	// }
}))
app.set("view engine", "ejs");

app.get('/register', function(req, res) {
	res.render('register')
})
app.post('/doRegister', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var username = fields.username;
		var password = md5(md5(fields.password).substr(4, 7) + md5(fields.password))
		var data = {
			"username": username,
			"password": password
		}
		db.insertOne('user', data, function(err, result) {
			if (err) {
				res.send({
					"code": -1,
					"msg": "注册失败"
				})
			}
			res.send({
				"code": 0,
				"msg": "成功注册"
			})

		})
	});
})
app.get('/login02', function(req, res) {
	res.render('login02')
})
app.post('/doLogin02', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var username = fields.username;
		var yonghumima = md5(md5(fields.password).substr(4, 7) + md5(fields.password))
		var data = {
			"username": username
		}
		db.find('user', data, function(err, result) {
			console.log(result)
			if (result.length == 0) {
				res.send({
					"code": -1,
					"msg": '用户名错误'
				})
				return;
			}
			var shujukupassword = result[0].password;
			if (yonghumima == shujukupassword) {
				req.session.login = true;
				req.session.username = result[0].username;
				res.send({
					"code": 0,
					"msg": '登录成功'
				})
			} else {
				res.send({
					"code": -1,
					"msg": '用户名密码错误'
				})
			}
		})
	});


})

app.get('/', function(req, res) {
	if (req.session.login) {
		res.send("您已经成功登陆" + req.session.username)
	} else {
		res.send("没有登陆")
	}
})

app.listen(5454)