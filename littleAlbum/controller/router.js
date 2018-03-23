var file = require('../models/file.js');
var fs = require('fs');
var formidable = require('formidable');
var path = require("path")



exports.showIndex = function(req, res, next) {
		// 错误写法 会先执行file.getAllAlbums() files.js使用 回调
		// res.render('index', {
		// 	'albums': file.getAllAlbums()
		// });
		// nodejs 内层函数不是 return回来的  而是调用高层函数提供的回调 数据当做回调函数的参数来用
		file.getAllAlbums(function(err, allAlbums) {
			if (err) {
				// res.send(err);
				next()
				return;
			}
			res.render('index', {
				"albums": allAlbums
			})

		})

	}
	// 相册页面
exports.showAlbum = function(req, res, next) {
		// 便利文件所有图片
		var albumName = req.params.albumName
			//业务交给 models
			// res.render("album", {
			// 	"albumName": albumName,
			// 	"images": [

		// 	]
		// })
		file.getImagesByAlbumName(albumName, function(err, imageArr) {
			if (err) {
				// res.send(err);
				next()
				return;
			}
			res.render('album', {
				"albumName": albumName,
				"images": imageArr,
				'baseurl': req.pathname
			})
		})
	}
	// 上传图片
exports.showUp = function(req, res, next) {
		file.getAllAlbums(function(err, allAlbums) {
			if (err) {
				// res.send(err);
				next()
				return;
			}
			res.render('up', {
				"albums": allAlbums,
				'baseurl': req.pathname

			})

		})
	}
	// 上传
exports.doPost = function(req, res, next) {
	var form = new formidable.IncomingForm();
	//设置文件上传存放地址
	form.uploadDir = path.normalize(__dirname + "/../uploads");
	console.log(path.normalize(__dirname + "/../uploads"))
		// 表单已经接受完成  fields 存放文本域 files 存放文件域 
	form.parse(req, function(err, fields, files) {
		if (err) {
			next()
			return;
		}
		var size = parseInt(files.tupian.size);
		if (size > 1024) {
			res.send("tupian过大应该小于1M");
			// 删除这个文件
			fs.unlink(files.tupian.path)
			return;
		}

		var wenjianjia = fields.wenjianjia;
		var extname = path.extname(files.tupian.name);
		var ran = parseInt(Math.random() * 89999 + 10000);
		var oldpath = files.tupian.path;
		var newpath = form.uploadDir + '/' + wenjianjia + '/' + ran + extname;
		console.log(newpath)
		fs.rename(oldpath, newpath, function(err) {
			if (err) {
				throw Error('改名失败')
				return
			}
			res.send("cheng共")

		})
	});

}