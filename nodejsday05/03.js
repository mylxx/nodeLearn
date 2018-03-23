var express = require('express');
var db = require("./model/db");
var formidable = require('formidable');
var app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
// 增加留言
app.get('/', function(req, res, next) {
	db.getAllCount('liuyanben', function(err, count) {
		res.render("index", {
			"pageAmount": Math.ceil(count / 3)
		})
	})
})
app.post('/doPost', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) {
			next()
			return;
		}
		fields.shijian = new Date()
			// 写入数据库
		db.insertOne("liuyanben", fields, function(err, result) {
			if (err) {
				res.json({
					'result': '-1'
				})
				return;
			}
			res.json({
				'result': '1'
			})
		})

	});

})
app.get('/readMsg', function(req, res, next) {
	var pageSize = 3;
	var page = parseInt(req.query.page);
	db.find("liuyanben", {}, {
		"sort": {
			"shijian": -1
		},
		'pageamount': pageSize,
		'page': page,
	}, function(err, result) {
		if (err) {

		}
		res.json({
			"result": result
		})

	})
})
app.listen(5454)