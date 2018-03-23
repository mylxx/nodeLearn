var mongoose = require('mongoose');
var db = require('./db');
// 学生 课程类
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
});
var StudentModel = mongoose.model('Student', studentSchema);
// var kechengSchema = new mongoose.Schema({
// 	name: {
// 		type: String
// 	},
// 	info: {
// 		type: Number
// 	},
// student: {
// 	type: Array,
// 	default: [studentSchema]
// }
// });
// kechengSchema.methods.tianjiaxuesheng = function(studentObj, callback) {
// 	this.student.push(studentObj)
// 	this.save(function() {
// 		callback()
// 	})
// }
// var Kecheng = mongoose.model('Kecheng', kechengSchema);

var xqiang = new StudentModel({
	'name': 'xqiang',
	'age': 132,
	'gender': '女'
})
xqiang.save(function() {
	console.log(999)
})

// var shuxue = new Kecheng({
// 	'name': '数学课',
// 	'info': '数学'
// })
// shuxue.save(function() {
// 	console.log(8889089898988)
// })

// shuxue.tianjiaxuesheng(xqiang, function() {
// 	console.log("添加成功")
// })