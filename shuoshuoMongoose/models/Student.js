var mongoose = require('mongoose');
var db = require('./db');
//一 Schema 结构
var studentSchema = new mongoose.Schema({
	name: {
		type: String
	},
	age: {
		type: Number
	},
	gender: {
		type: String
	}
	// time     : {type : Date, default: Date.now},
});
//二 创建静态方法
// 找人
studentSchema.statics.zhaoren = function(name, callback) {
		return this.model('Student').find({
			name: name
		}, callback);
	}
	// 修改
studentSchema.statics.xiugai = function(conditions, update, options, callback) {
	// conditions 哪条
	// update 改成啥
	this.model('Student').update(conditions, update, options, callback);
}


//三 创建Student类
var studentModel = db.model('Student', studentSchema);
module.exports = studentModel;