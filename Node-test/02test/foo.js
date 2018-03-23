exports.showIndex = showIndex;

function showIndex(req, res) {
	res.writeHead(404, {
		"Content-type": "text/html;charset=utf8"
	});
	res.end('阿朵是二狗')

}