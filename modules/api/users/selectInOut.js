var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/select/inOut
	POST
		con.userId [INT] Equal
		con.username [Stirng] Equal
		con.mode [Boolean] Equal
		con.startTime [INT] Between
		con.endTime [INT] Between		
	RETERNS
		{error:'database',message:err}
		{JSON}	
*/

var main = function(req,res,next){
	let error = [];
	let data = {};
	if(req.body.username)data.username = req.body.username;
	if(req.body.userId)data.userId = req.body.userId;
	if(req.body.mode)data.mode = req.body.mode;
	if(req.body.startTime)data.startTime = req.body.startTime;
	if(req.body.endTime)data.endTime = req.body.endTime;
	dbLayer.lab.user.select.inOut(data,function(err,resp,filed){
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