var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
	if (req.url = '/') {
		fs.readFile('./huaban.html', function(err, data) {
			res.end(data)
		})
	}
});
// 创建一个io对象
var io = require('socket.io')(server);
io.on("connection", function(socket) {
	socket.on('hua', function(msg) {
		io.emit('huida', msg) //广播 给所有当前链接的
	})

})
server.listen(3000, '127.0.0.1')