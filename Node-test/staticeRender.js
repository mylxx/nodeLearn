var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
http.createServer(function(req, res) {
	//路径；/images/mv.jpg
	var pathname = url.parse(req.url).pathname;
	if (pathname.indexOf('.') == -1) {
		pathname += '/index.html'
	}
	var fileURL = './' + path.normalize('./static' + pathname)
		//扩展名
	var extname = path.extname(pathname)
	fs.readFile(fileURL, function(err, data) {
		if (err) {
			fs.readFile('./static/404.html', function(err, data) {
				//MIME类型
				res.writeHead(404, {
					"Content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
			return;
		};
		getMime(extname, function(mime) {
			res.writeHead(200, {
				'Content-type': mime
			});
		});
		res.end(data)
	});
}).listen(5858, '127.0.0.1');

function getMime(extname, callback) {
	fs.readFile('./static/mime.json', function(err, data) {
		if (err) {
			throw Error('找不到mime.json文件');
			return;
		}
		var mimeJSON = JSON.parse(data);
		var mime = mimeJSON[extname] || 'text/plain';
		callback(mime);
	})
};