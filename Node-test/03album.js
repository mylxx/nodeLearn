var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
	if(req.url == '/favicon.ico'){
		return;
	}

}).listen(5858, '127.0.0.1');