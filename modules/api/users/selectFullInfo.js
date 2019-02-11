var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/select/fullInfo
	POST
		con.username [String] Equal
		con.userId [INT] Equal	
	RETERNS
		{error:'database',message:err}
		{JSON}
*/

var main = function(req,res,next){
	let error = [];
	let data = {};
	if(req.body.username)data.username = req.body.username;
	if(req.body.userId)data.userId = req.body.userId;
	dbLayer.lab.user.select.fullInfo(data,function(err,resp,filed){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		resp.forEach( function(element, index) {
			delete resp[index].userPassword;
		});
		res.json(resp);
	})
};

module.exports = main;