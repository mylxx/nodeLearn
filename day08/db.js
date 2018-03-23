var mongoose = require('mongoose');
mongoose.Promise = global.Promise = require('bluebird');
var db = mongoose.createConnection('mongodb://localhost:27017/lvbuMongoose');
db.on('open', function() {
	console.log("数据库连接成功")
})
module.exports = db;