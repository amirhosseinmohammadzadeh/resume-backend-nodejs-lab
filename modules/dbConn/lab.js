var mysql = require('mysql');

var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'lab',
});

conn.connect(function(err,con){
	if(err)throw err;
	console.log('mysql is connected...');
});

module.exports = conn;