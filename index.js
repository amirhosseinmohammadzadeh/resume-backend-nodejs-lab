var express = require('express');
var cookieSession = require('cookie-session');
var Keygrip = require('keygrip');
var app = express();
var api = require('./modules/api.js');
var fs = require('fs');
var bodyParser = require('body-parser');

var option = {
	extentions: ['html','js','jpg','gif','png','css','ttf','otf'],
	index: 'index.html',
}

app.use('/public/',express.static('./public',option));

app.use(bodyParser.json());

app.use(cookieSession({
	name : 'vn-sys-session',
	secret: 'sufhofueoqu',
	CookieOptions : {
		secure  : false,
	},
	maxAge : 30*60*1000,
}));

app.use(function(req,res,next){
	req.session.maxAge = 30*60*1000;
	req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
	next();
});

app.all('/',function(req,res,next){
 	fs.readFile('./public/index.html',{encoding:'UTF-8'},function(err,data){
 		res.send(data);
 	});
});

app.use(api);


app.listen(8888);
console.log('run http server on port 8888...');