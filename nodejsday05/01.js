var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
app.get('/', function(req, res) {
	// url 是数据库地址假如数据库不存在会自动创建一个
	var url = 'mongodb://localhost:27017/lvbu';
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log("数据库链接失败")
			return;
		}
		// 插入数据
		db.collection('teacher').insertOne({
			"name": "老师一",
			"age": parseInt(Math.random() * 100 + 10)
		}, function(err, result) {
			// result 插入结果
			res.send(result)
			db.close()
		})
	});
})
app.listen(5454)