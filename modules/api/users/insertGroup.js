var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/group
	POST
		{name: 'smapleGroup1'}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.name == undefined)error.push('name');
	if(error[0] != undefined){
		res.json({error:'empty',field:error});
		return;
	}
	let data = {
		name:req.body.name,
	};
	dbLayer.lab.user.insert.group(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;