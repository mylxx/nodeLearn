var mongoose = require('mongoose');
var db = require('./db');
// var objectId = require('mongodb').objectId
//一 Schema 结构
var bookSchema = new mongoose.Schema({
	name: {
		type: String
	},
	author: {
		type: String
	},
	price: {
		type: Number
	},
	type: {
		type: Array,
		default: []
	}
	// time     : {type : Date, default: Date.now},
});
// 列出图书
bookSchema.statics.bookList = function(callback) {
	return this.model('tushu').find({}, callback);
}

// 	// 查找图书 ——od
bookSchema.statics.findBookByName = function(name, callback) {
	return this.model('tushu').find({
		'name': name
	}, callback);
}



//三 创建Student类
var bookModel = db.model('tushu', bookSchema);
module.exports = bookModel;