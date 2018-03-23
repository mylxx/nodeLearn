var express = require('express');
var app = express();
// 如果要改变默认的 views 文件名字 用 app.set()
app.set("views", 'static')
app.set("view engine", "ejs");
app.get('/test', function(req, res) {
	res.render('index', {
		a: 16,
		news: ['1', '2', '3', '4']
	})
})

// app.use(express.static('./static'));
// app.get('/test', function(req, res) {
// 	res.end('testtest是')
// })
app.listen(5858)