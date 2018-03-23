var formidable = require('formidable');
var md5 = require("../models/md5");
var db = require("../models/db");
var path = require("path");
var fs = require('fs');
var gm = require('gm');

// exports.showIndex = function(req, res, next) {
// 		// 当 login==true时候 检索数据库 查找此人头像 
// 		if (req.session.login) {
// 			var username = req.session.username
// 		} else {
// 			var username = '';

// 		}

// 		db.find('user', {
// 			"username": username
// 		}, function(err, result) {
// 			if (result.length == 0) {
// 				var avatar = "mrtx.jpg"
// 			} else {
// 				var avatar = result[0].avatar
// 			}
// 			db.find('userPost', {}, {
// 					"sort": {
// 						"datetime": 1
// 					}
// 				},
// 				function(err, result2) {
// 					var shuoshuo = result2
// 					res.render('index', {
// 						"login": req.session.login,
// 						"username": username,
// 						"active": "首页",
// 						"avatar": avatar, //登录人的头像
// 						"shuoshuo": shuoshuo
// 					})
// 				})

// 		})
// 	}
//不用两次查询 用前台ajax来写
exports.showIndex = function(req, res, next) {
		// 当 login==true时候 检索数据库 查找此人头像 
		if (req.session.login) {
			var username = req.session.username
		} else {
			var username = '';

		}

		db.find('user', {
			"username": username
		}, function(err, result) {
			if (result.length == 0) {
				var avatar = "mrtx.jpg"
			} else {
				var avatar = result[0].avatar
			}

			res.render('index', {
				"login": req.session.login,
				"username": username,
				"active": "首页",
				"avatar": avatar, //登录人的头像
			})

		})
	}
	// 注册页面
exports.showRegist = function(req, res, next) {
		res.render('regist', {
			"login": req.session.login,
			"username": req.session.login ? req.session.username : '',
			"active": "注册"
		})
	}
	// 登录页面
exports.showLogin = function(req, res, next) {
		res.render('login', {
			"login": req.session.login,
			"username": req.session.login ? req.session.username : '',
			"active": "登录"
		})
	}
	// 注册
exports.doRegist = function(req, res, next) {
		// 得到用户 查询数据库
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			var username = fields.username;
			var password = md5(md5(fields.password).substr(4, 7) + md5(fields.password))
			var data = {
					"username": username,
					"password": password,
					// 存入数据库一个默认的值 头像
					"avatar": "mrtx.jpg"

				}
				// 查看用户名有没有被占用
			db.find("user", {
				'username': username
			}, function(err, result) {
				if (err) {
					res.send({
						"code": -3,
						"msg": "服务器错误"
					})
					return;
				}
				if (result.length != 0) {
					res.send({
						"code": -1,
						"msg": "用户名被占用"
					})
					return;
				}
				if (result.length == 0) {
					db.insertOne('user', data, function(err, result) {
						if (err) {
							res.send({
								"code": -2,
								"msg": "注册失败"
							})
						}
						// 写入 session
						req.session.login = true;
						req.session.username = username;
						res.send({
							"code": 0,
							"msg": "成功注册"
						})


					})
				}
			})

		});
	}
	// 登录 查询数据库看 用户密码是否匹配
exports.doLogin = function(req, res, next) {
		// 得到用户 查询数据库
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			var username = fields.username;
			var password = md5(md5(fields.password).substr(4, 7) + md5(fields.password))
				// 查看用户名有没有
			db.find("user", {
				'username': username
			}, function(err, result) {
				if (err) {
					res.send({
						"code": -3,
						"msg": "服务器错误"
					})
					return;
				}
				if (result.length == 0) {
					res.send({
						"code": -1,
						"msg": "用户名错误"
					})
					return;
				} else {
					var shujikumima = result[0].password;
					if (password == shujikumima) {
						req.session.login = true;
						req.session.username = result[0].username;
						res.send({
							"code": 0,
							"msg": "登录成功"
						})
					} else {
						res.send({
							"code": -2,
							"msg": "密码错误"
						})
					}
				}

			})

		})
	}
	// 上传头像页
exports.showSetavatar = function(req, res, next) {
		// 必须保证是登录状态
		if (!req.session.login) {
			res.send('必须保证是登录状态')
			return;
		}
		res.render('setavatar', {
			"login": req.session.login,
			"username": req.session.username,
			"active": "修改头像"
		})
	}
	// 设置头像
exports.doSetavatar = function(req, res, next) {
		var form = new formidable.IncomingForm();
		form.uploadDir = path.normalize(__dirname + "/../avatar")
		form.parse(req, function(err, fields, files) {
			var extname = path.extname(files.touxiang.name);
			var oldpath = files.touxiang.path;
			var newpath = form.uploadDir + '/' + req.session.username + extname;
			fs.rename(oldpath, newpath, function(err) {
				if (err) {
					throw Error('改名失败')
					return
				}
				// 缓存一个头像图片
				req.session.avatar = req.session.username + extname
					// 成功后跳转到剪裁页面业务
				res.redirect("/cut")

			})

		})
	}
	// 显示剪裁头像页面
exports.showCut = function(req, res, next) {
		res.render('cropping', {
			"avatar": req.session.avatar
		})
	}
	// 执行裁剪
exports.doCut = function(req, res, next) {
		var filename = req.session.avatar
		var w = req.query.w;
		var h = req.query.h;
		var x = req.query.x;
		var y = req.query.y;
		gm('./avatar/' + filename)
			.crop(w, h, x, y)
			.resize(100, 100, "!")
			.write('./avatar/' + filename, function(err) {
				if (err) {
					res.send({
						"code": -1,
						"msg": 'fail'
					})
				} else {
					// 剪裁成功 存入数据库 修改avatar
					db.updateMany('user', {
							"username": req.session.username
						}, {
							$set: {
								"avatar": req.session.avatar
							}
						},
						function(err, result) {
							res.send({
								"code": 0,
								"msg": 'ok'
							})
						}
					)

				}
			})
	}
	// 发表说说
exports.doPost = function(req, res, next) {
		// 必须办证登录
		if (!req.session.login) {
			res.end("这个页面必须登录")
			return;
		}
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			var username = req.session.username;
			var content = fields.content;
			var data = {
				"content": content,
				"username": username,
				"datetime": new Date()
			}
			db.insertOne('userPost', data, function(err, result) {
				if (err) {
					res.send({
						"code": -3,
						"msg": "服务器错误"
					})
				}
				res.send({
					"code": 0,
					"msg": "成功发表"
				})
			})
		});
	}
	// 获取所有的说说
exports.getAllShuoshuo = function(req, res, next) {
		var page = parseInt(req.query.page)
		console.log(page)
		db.find("userPost", {}, {
				"pageamount": 10,
				"page": page,
				"sort": {
					"datetime": -1
				}
			},
			function(err, result) {
				res.json({
					"code": 0,
					"data": result
				})
			})
	}
	// shuoshuo中的 发表说说的 用户
exports.getUserInfo = function(req, res, next) {
		var username = req.query.username;
		db.find("user", {
				"username": username
			},
			function(err, result) {
				res.json({
					"code": 0,
					"data": {
						"username": result[0].username,
						"avatar": result[0].avatar,
						"_id": result[0]._id,
					}

				})
			})
	}
	// shuohsuo总数
exports.shuoshuoAmount = function(req, res, next) {
		db.getAllCount("userPost", function(err, count) {
			res.send(count.toString())

		})
	}
	// 我的说说
exports.showUser = function(req, res, next) {
		if (!req.session.login) {
			res.end("这个页面必须登录")
			return;
		}
		var user = req.params['user']
		db.find('user', {
			"username": user
		}, function(err, result1) {
			db.find('userPost', {
				"username": user
			}, function(err, result) {
				res.render('user', {
					"login": req.session.login,
					"username": req.session.login ? req.session.username : '',
					"user": user,
					'active': '我的说说',
					"cirenshuoshuo": result,
					"avatar": result1[0].avatar
				})
			})
		})
	}
	// 成员列表 所有注册用户
exports.showUserList = function(req, res, next) {
	db.find('user', {}, function(err, result) {
		res.render('userlist', {
			"login": req.session.login,
			"username": req.session.login ? req.session.username : '',
			'active': '成员列表',
			"chengyuan": result,
		})
	})


}