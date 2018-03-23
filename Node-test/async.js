 //重要的 异步变同步；
 // var http = require("http");
 // var fs = require("fs");

 // var server = http.createServer(function(req, res) {
 // 	if (req.url == '/favicon.ico') {
 // 		return;
 // 	}
 // 	// readdir 读取文件里的文件
 // 	fs.readdir('./album', function(err, files) {
 // 		// files 一个数组album中的所有东西 []
 // 		var wenjianjia = [];
 // 		(function iterator(i) {
 // 			if (i == files.length) {
 // 				console.log(wenjianjia)
 // 				return;
 // 			}
 // 			fs.stat("./album/" + files[i], function(err, stats) {
 // 				// stats.isDirectory() 检测这个路径 是不是文件夹 true false
 // 				if (stats.isDirectory()) {
 // 					wenjianjia.push(files[i]);
 // 				}
 // 				iterator(i + 1);

 // 			});

 // 		})(0);
 // 	});
 // 	res.end('结束')
 // });
 // server.listen(5858, '127.0.0.1')


 //重要的 异步变同步；
 var http = require("http");
 var fs = require("fs");

 var server = http.createServer(function(req, res) {
 	if (req.url == '/favicon.ico') {
 		return;
 	}
 	// readdir 读取文件里的文件
 	fs.readdir('./album', function(err, files) {
 		// files 一个数组album中的所有东西 []
 		var wenjianjia = [];

 		if (files.length > 0) {
 			read(0, files)
 		}

 		function read(i, files) {
 			fs.stat("./album/" + files[i], function(err, stats) {
 				if (stats.isDirectory()) {
 					wenjianjia.push(files[i]);

 				}
 				if (i < files.length - 1) {
 					read(++i, files)
 				} else {
 					console.log(wenjianjia + "__")
 				}
 			})
 		}

 	});
 	res.end('结束')
 });
 server.listen(5858, '127.0.0.1')