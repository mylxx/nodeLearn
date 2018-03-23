var express = require("express");
var app = express();
app.get('/', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF8'
	});
	res.end("你好g2")

})
app.get(/^\/student\/([\d]{10})$/, function(req, res) {

	res.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF8'
	});
	res.end('学生信息' + req.params[0])
})
app.get("/teacher/:gonghao/:name", function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF8'
	});
	res.write(JSON.stringify(req.params))
	res.write('老师工号' + req.params.gonghao)
	res.write('老师工号' + req.params.name)

})
app.listen(5858)