var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/select/smallInfo
	POST
		username,
		password,	
	RETERNS
		{error:'database',message:err}
		{JSON}
*/


var main = function(req,res,next){
	let data = {};
	if(req.body.username)data.username = req.body.username;
	dbLayer.lab.user.select.smallInfo(data,function(err,resp,filed){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		resp.forEach( function(element, index) {
			delete resp[index].userPassword;
		});
		res.json(resp);
	});
};

module.exports = main;