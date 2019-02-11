 var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/technecianUser
	POST
		exp:{username:'reza222',
			password:'123455'}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.username == undefined)error.push('username');
	if(req.body.password == undefined)error.push('password');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		username:req.body.username,
		password:req.body.password,
	};
	dbLayer.lab.user.insert.technecianUser(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;