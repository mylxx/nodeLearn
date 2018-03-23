var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
http.createServer(function(req, res) {
	console.log(req.url)
		// if (req.url = 'aaa') {
	fs.readFile('./02test/index.ejs', function(err, data) {
			// 模板
			var template = data.toString();
			// 数据
			var dictionary = {
				a: 16,
				news: ['1', '2', '3', '4']
			};
			// 数据绑定
			var html = ejs.render(template, dictionary);
			res.writeHead(200, {
				'Content-Type': 'text/html;charset=UTF8'
			});
			// 输出
			res.end(html)
		})
		// } else {
		// 	res.writeHead(404)
		// }


}).listen(5858, '127.0.0.1');