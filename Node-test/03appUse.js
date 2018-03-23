var express = require('express');
var fs = require('fs');
var app = express()

// app.use(page)
// function page(req, res, next) {
// 	var filePath = req.originalUrl;
// 	// 根据 static 是否有来文件来路由页面
// 	fs.readFile("./static/" + filePath, function(err, data) {
// 		if (err) {
// 			next();
// 			return;
// 		} else {
// 			res.send(data.toString())
// 		}
// 	});

// }
// express 静态服务
// app.use(express.static('./static'));
app.use('jt', express.static('./static'));
// 自己的路由 注意位置
// app.get('/', function(req, res) {
// 		res.send("哈哈")
// 	})
// 自动识别err 404页面 有问题待解决
app.use(function(req, res, next) {
	res.status(404).send("没有这个页面")
})
app.listen(5858)