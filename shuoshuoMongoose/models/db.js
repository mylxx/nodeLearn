var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/lvbuMongoose');
db.on('open', function() {
	console.log("数据库连接成功")
})
module.exports = db;