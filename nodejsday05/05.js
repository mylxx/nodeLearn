var express = require('express');
var session = require("express-session");
var app = express();
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	// 	secure: true
	// }
}))
app.get('/', function(req, res) {
	if (req.session.login) {
		res.send("您已经成功登陆" + req.session.username)
	} else {
		res.send("没有登陆")
	}
})
app.get('/login', function(req, res) {
	req.session.login = true;
	req.session.username = '吕布';
	res.send("成功denglu")
})

app.listen(5454)