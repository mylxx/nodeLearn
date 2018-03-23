Book = require("../models/Book")
	// 显示所有图书列表
exports.showIndex = function(req, res, next) {
		Book.bookList(function(err, result) {
			res.render('index', {
				'tushu': result
			})
		})

	}
	// 添加图书
exports.addBook = function(req, res, next) {
	res.render('addBook')
}
exports.doAdd = function(req, res, next) {
		var bookInfo = req.query
		Book.create(bookInfo, function(err) {
			res.send("存储成功")
		})
	}
	// 修改
exports.edit = function(req, res, next) {
	Book.findBookByName(req.query.name, function(err, result) {
		res.render('edit', {
			'tushu': result
		})
	})

}
exports.doEdit = function(req, res, next) {
	Book.update(req.query.name, function(err, result) {
		res.render('edit', {
			'tushu': result
		})
	})

}