 var http = require("http");
 var querystring = require('querystring')
 var formidable = require('formidable') //第三方模块
 var fs = require("fs")
 var path = require("path")
 http.createServer(function(req, res) {
 	if (req.url == '/dopost' && req.method.toLowerCase() == 'post') {
 		var form = new formidable.IncomingForm();
 		//设置文件上传存放地址
 		form.uploadDir = "./uploads";
 		// 表单已经接受完成  fields 存放文本域 files 存放文件域 
 		form.parse(req, function(err, fields, files) {
 			if (err) {
 				throw err;
 			}
 			console.log(files)
 			var extname = path.extname(files.image.name)
 			var ran = parseInt(Math.random() * 89999 + 10000);
 			var oldpath = __dirname + "/" + files.image.path;
 			var newpath = __dirname + "/uploads/" + ran + extname;
 			fs.rename(oldpath, newpath, function(err) {
 				if (err) {
 					throw Error('改名失败')
 				}
 			})


 			res.writeHead(200, {
 				'content-type': 'text/plain'
 			});
 			res.end('success');
 		});
 	} else if (req.url == '/') {
 		fs.readFile(__dirname + '/posttest.html', function(err, data) {

 			res.writeHead(200, {
 				'content-type': 'text/html'
 			});
 			res.end(data);

 		})
 	} else {
 		res.writeHead(404, {
 			'content-type': 'text/plain'
 		});
 		res.end('404');

 	}
 }).listen(5858, '127.0.0.1');