var express = require("express");
var app = express();
app.use(express.static("./static"));
var user = [{
	'id': '1',
	'name': '111'
}, {
	'id': '2',
	'name': '222'
}, {
	'id': '3',
	'name': '333'
}, {
	'id': '4',
	'name': '444'
}, ]
app.get('/user', function(req, res) {
	res.json(user)


})

app.listen(5858)