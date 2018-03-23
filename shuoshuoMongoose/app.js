var Student = require('./models/Student');
// 一种方法
// var xiaoming = new Student({
// 	"name": "小明",
// 	"gender": "男",
// 	"age": 88
// })
// xiaoming.save(function(callback) {
// 	console.log("存储成功")
// })
// 另一种方法
// Student.create({
// 	"name": "小龙",
// 	"gender": "女",
// 	"age": 99
// }, function(err) {
// 	// 	console.log("存储成功")

// })
// Student.zhaoren("小明", function(err, result) {
// 	console.log(result)

// })
// 修改
Student.xiugai({
	"name": "小明"
}, {
	$set: {
		"age": 100
	}
}, {}, function() {
	console.log("修改——————")
})