var express = require('express');
var app = express()
app.use(express.static('./public'))
var session = require("express-session");
app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		// cookie: {
		// 	secure: true
		// }
	}))
	// 固定的写法 公式
var http = require('http').Server(app);
var io = require('socket.io')(http)
app.set('view engine', 'ejs');
var alluser = []
	// 中间件
app.get('/', function(req, res, next) {
		res.render('index')
	})
	// 确认登录 检查此人是否有用户名 并且昵称不重复；
app.get('/check', function(req, res, next) {
		var name = req.query.name
		if (!name) {
			res.send('必须填写用户名')
		}
		if (alluser.indexOf(name) != -1) {
			res.send('用户名被占用')
		}
		alluser.push(name)
		req.session.name = name;
		// chat 页面
		res.redirect('/chat')
	})
	// 聊天室
app.get('/chat', function(req, res, next) {
		if (!req.session.name) {
			res.redirect('/')
			return;
		}
		res.render('chat', {
			'name': req.session.name
		})
	})
	// 
io.on('connection', function(socket) {
	socket.on('liaotian', function(msg) {
		io.emit('liaotian', msg)
	})
})

// 监听
http.listen(3000)