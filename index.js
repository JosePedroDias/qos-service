var http = require('http');
var url  = require('url');



var IN_PORT  = 3333;

var RED   = '\033[31m',
    BLUE  = '\033[34m',
    RESET = '\033[0m';



var pad0 = function(n) { return (n < 10) ? '0'+n : n; }

var now = function() {
	var d = new Date();
	return [
		d.getHours(),
		pad0( d.getMinutes() ),
		pad0( d.getSeconds() )
	].join(':');
};



// removed 'data:image/png;base64,' prefix from 1x1 canvas to base64
var imgB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=';
var imgBin = new Buffer(imgB64, 'base64');
var imgLen = imgBin.length;


var lines = [];
	

var inSrv = http.createServer(function(req, res) {
	var u = req.url;
	
	if (u === '/favicon.ico') {
		res.writeHead(404);
		return res.end();
	}
	
	var o = url.parse(u, true);
	
	var p = o.pathname;
	
	var q0 = o.query;
	var q = {};
	var k, v;
	for (k in q0) {
		v = q0[k];
		if      (v === 'false') { v = false; }
		else if (v === 'true') {  v = true; }
		else if (isFinite(v)) {   v = parseFloat(v); }
		q[k] = v;
	}
	
	var t = (new Date()).valueOf();
	var ua = req.headers['user-agent'];
	
	
	
	var resp;
	if (p[1] === '_') {
		var pp = p.split('/');
		pp.shift();
	
		var d = lines.filter(function(l) {
			var i, k2;
			for (var k in q) {
				i = k.indexOf('.');
				if (i === -1) {
					if (q[k] !== l[k]) { return false; }
				}
				else {
					k2 = k.substring(i+1);
					if (q[k] !== l.q[k2]) { return false; }
				}
				
			}
			return true;
		});
		
		if (pp[0] === '_list') {
			resp = d;
		}
		else if (pp[0] === '_count') {
			resp = d.length;
		}
		else if (pp[0] === '_extract') {
			var prop = pp[1];
			d = d.map(function(l) {
				return l.q[prop];
			});
			resp = d;
		}
		else {
			resp = 'unsupported operation: "' + pp[0] + '"!';
		}
	
		console.log([BLUE, now(), RESET, ' ', p, ' ', JSON.stringify(q), '\n', JSON.stringify(lines, null, '  ')].join(''));
	}
	else {
		lines.push({
			p: p,
			q: q,
			t: t,
			ua: ua
		});
		
		console.log([BLUE, now(), RESET, ' ', p, ' ', JSON.stringify(q), ' ', ua].join(''));
	}
	
	
	
	res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	
	if (resp) {
		resp = JSON.stringify(resp);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Length', resp.length);
		res.writeHead(200);
		res.end(resp);
	}
	else {
		res.setHeader('Content-Type', 'image/png');
		res.setHeader('Content-Length', imgLen);
		res.writeHead(200);
		res.end(imgBin, 'binary');
	}
});



console.log('LISTENING ON PORT ' + IN_PORT + '...');
inSrv.listen(IN_PORT);
