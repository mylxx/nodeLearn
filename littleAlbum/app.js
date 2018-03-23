var express = require("express");
var router = require("./controller/router.js");
var app = express()
	//模板
app.set("view engine", "ejs")
	// l路由中间件 呈递静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get('/:albumName', router.showAlbum)
app.get('/up', router.showUp)
app.post('/up', router.doPost)
app.get('/', router.showIndex)
app.use(function(req, res) {
	res.render('err', {
		'baseurl': req.pathname
	})
})
app.listen(5959)