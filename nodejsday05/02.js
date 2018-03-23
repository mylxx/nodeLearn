var express = require('express');
var app = express();
var db = require("./model/db");
app.get('/', function(req, res) {
		var teacherJson = {
			"name": "吕布",
			"age": 1800
		}
		db.insertOne('teacher', teacherJson, function(err, result) {
			if (err) {
				return;

			}
			res.send(result)
		})

	})
	// 分页的错误示例 每次都读取全部数据
	// app.get('/du', function(req, res) {
	// 	// 此页面 接受page 参数
	// 	var page = parseInt(req.query.page)
	// 	var teacherJson = {}
	// 	var arr = []
	// 	db.find('teacher', teacherJson, function(err, result) {
	// 		for (var i = 5 * page; i < 5 * (page + 1); i++) {
	// 			arr.push(result[i])
	// 		}
	// 		res.json(arr)
	// 	})
	// })
	// 分页 函数 limit() skip() _connectDB 读取时候 限制读取条数
app.get('/du', function(req, res) {
		// 此页面 接受page 参数
		var page = parseInt(req.query.page)
		var teacherJson = {}
		db.find('student', teacherJson, {
			'pageamount': 2,
			'page': page
		}, function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			res.json(result)
		})

	})
	// del
app.get('/del', function(req, res) {
		var id = req.query.id
		db.deleteMany('student', {
			"id": id
		}, function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			res.json(result)
		})
	})
	// 修改
app.get('/xiugai', function(req, res) {
	db.updateMany('student', {
		"user_name": "天"
	}, {
		$set: {
			"username": "天"
		}
	}, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(result)
	})
})

app.listen(5454)