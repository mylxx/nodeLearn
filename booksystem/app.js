var express = require('express');
var app = express();
var router = require('./router/router');
app.set("view engine", "ejs")
app.get("/", router.showIndex);
app.get("/addbook", router.addBook);
app.get("/doadd", router.doAdd)
app.get("/edit", router.edit)
app.get("/doedit", router.doEdit)
app.listen("3000")