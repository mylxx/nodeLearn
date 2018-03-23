var express = require("express");
var app = express()
app.set("view engine", "ejs");
app.get('/', function(req, res) {
	console.log(req.query)
	res.render('03form')

})
// app.post('/', function(req, res) {

// })
app.listen(5858)