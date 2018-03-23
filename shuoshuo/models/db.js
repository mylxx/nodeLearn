// 这个模块内封装了所有对数据库的所有操作
// 不管数据库的什么操作 都要链接数据库 所以吧链接数据库封装成函数
var MongoClient = require('mongodb').MongoClient;
var setting = require('../setting');

function _connectDB(callback) {
	var url = setting.dbUrl;
	MongoClient.connect(url, (err, db) => {
		if (err) {
			callback(err, null)
			db.close()
			return;
		}
		callback(err, db)
	});

}
// 初始化
init()

function init() {
	_connectDB(function(err, db) {
		if (err) {
			console.log(err)
			return;
		}
		db.collection("user")
			.createIndex({
				"username": 1
			}, function(err, result) {
				console.log("建立索引成功");
			});
	})
}
// 插入
exports.insertOne = function(collectionName, json, callback) {
		_connectDB(function(err, db) {
			db.collection(collectionName).insertOne(json, function(err, result) {
				callback(err, result)
				db.close()
			})
		})
	}
	// 查找 找到所有
exports.find = function(collectionName, json, args, callback) {
		var json = json || {};
		var result = []
		if (arguments.length == 3) {
			var callback = args;
			var skipNumber = 0
			var limitNumber = 0
		} else if (arguments.length == 4) {
			var skipNumber = args.pageamount * args.page || 0; //略过的数量
			var limitNumber = args.pageamount || 0; //每页数量
			var sort = args.sort || {} //排序
		} else {
			throw new Error("find函数参数3或4呀")
		}

		_connectDB(function(err, db) {
			var cursor = db.collection(collectionName).find(json).limit(limitNumber).skip(skipNumber).sort(sort);
			cursor.each(function(err, doc) {
				if (doc != null) {
					result.push(doc)
				} else {
					callback(null, result)
					db.close()
				}
			})

		})
	}
	// 删除
exports.deleteMany = function(collectionName, json, callback) {
		_connectDB(function(err, db) {
			db.collection(collectionName).removeMany(json, function(err, result) {
				if (err) {
					console.log('Error:' + err);
					db.close()
					return;
				}
				callback(null, result);
				db.close()

			});
		})
	}
	//修改
exports.updateMany = function(collectionName, json1, json2, callback) {
		_connectDB(function(err, db) {
			db.collection(collectionName).updateMany(json1, json2, function(err, result) {
				callback(err, result)
				db.close()
			})
		})
	}
	// 得到总数
exports.getAllCount = function(collectionName, callback) {
	_connectDB(function(err, db) {
		// db.collection(collectionName).find({}).count()
		db.collection(collectionName).count({}, function(err, count) {
			callback(null, count)
			db.close();
		});
	})
}