var express = require('express');
var gm = require('gm')
var app = express()
var formidable = require('formidable');
app.set("view engine", "ejs");
app.use(express.static("./jcropTest"))

app.get('/', function(req, res, next) {
	res.render('crop')
})
app.post('/caijian', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var filename = fields.filename
		var w = fields.w;
		var h = fields.h;
		var x = fields.x;
		var y = fields.y;
		gm('./jcropTest/image/' + filename)
			.crop(w, h, x, y)
			.resize(240, 240, "!")
			.write('./jcropTest/cut/' + filename, function(err) {
				if (err) {
					res.send({
						"code": -1,
						"msg": 'fail'
					})
				} else {
					res.send({
						"code": 0,
						"msg": 'ok'
					})
				}
			})
	});
})

app.listen(5454)