var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
	if (req.url = '/') {
		fs.readFile('./index.html', function(err, data) {
			res.end(data)
		})
	}
});
// 创建一个io对象
var io = require('socket.io')(server);
// 监听io; 监听连接事件 服务端的这个 socket是每一个链接的都有一个 socket;
//所以指的是每一个客户端的 socket
io.on("connection", function(socket) {
	console.log("yige客户端lianjiele")
	socket.on('tiwen', function(msg) {
		// socket.emit('huida', '我shi哈ha')
		io.emit('huida', '我shi哈ha') //广播 给所有当前链接的
	})

})



server.listen(3000, '127.0.0.1')