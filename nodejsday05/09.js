var express = require('express');
var gm = require('gm')
var fs = require('fs');
// // nodejs缩略图
// gm('./public/images/xiuzhi.png')
// 	.resize(240, 240, "!")
// 	.noProfile()
// 	.write('./public/images/xiuzhi_1.png', function(err) {
// 		if (err) console.log(err);
// 	});
// crazytown 裁剪 (宽 高 x y)
gm('./public/images/xz.jpg')
	.crop(512, 546, 265, 164)
	// .flip()
	// .magnify()
	// .rotate('green', 45)
	// .blur(7, 3)
	// .edge(3)
	.write('./public/images/xz_1.jpg', function(err) {
		if (err) console.log(err);
	})