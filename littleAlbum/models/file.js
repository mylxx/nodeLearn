var fs = require('fs');
exports.getAllAlbums = function(callback) {
	fs.readdir('./uploads', function(err, files) {
		if (err) {
			callback('没有找到upload文件夹', null)
			return;
		}
		var allAlbums = [];
		(function iterator(i) {
			if (i == files.length) {
				// return allAlbums;
				callback(null, allAlbums);
				return;
			}
			fs.stat('./uploads/' + files[i], function(err, stats) {
				// if (err) {
				// 	callback('没有找到文件' + files[i], null)
				// }

				if (stats.isDirectory()) {
					allAlbums.push(files[i])
				}
				iterator(i + 1);

			})
		})(0)
	})
}
exports.getImagesByAlbumName = function(albumName, callback) {
	fs.readdir('./uploads/' + albumName, function(err, files) {
		if (err) {
			callback('没有找到' + albumName, null)
			return;
		}
		var imageArr = [];
		(function iterator(i) {
			if (i == files.length) {
				callback(null, imageArr);
				return;
			}
			fs.stat('./uploads/' + albumName + '/' + files[i], function(err, stats) {
				if (err) {
					callback('没有找到图片', null)
					return;
				}
				if (stats.isFile()) {
					imageArr.push(files[i])
				}
				iterator(i + 1);
			})

		})(0)

	})

}