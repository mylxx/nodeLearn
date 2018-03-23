var express = require('express');
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser())
app.get('/', function(req, res) {
	res.cookie('name', '吕布', {
		maxAge: 900000,
		httpOnly: true
	})
	res.cookie('hobby', '貂蝉', {
		maxAge: 900000,
		httpOnly: true
	})
	res.send(req.cookies)
})
app.get('/gonglue', function(req, res) {
	var mudidi = req.query.mudidi;
	var cookieArry = req.cookies.mudidi || [];
	cookieArry.push(mudidi)
	res.cookie('mudidi', cookieArry, {
		maxAge: 900000,
		httpOnly: true
	})
	res.send(req.cookies)

})

app.listen(5454)