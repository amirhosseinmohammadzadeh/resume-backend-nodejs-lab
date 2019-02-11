var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/educationBackground
	POST
		exp:{userId:2,
			avarage:12.50,
			endDate: 429892842084,
			univercity: 'tehran markaz'}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.userId == undefined)error.push('userId');
	if(req.body.avarage == undefined)error.push('avarage');
	if(req.body.endDate == undefined)error.push('endDate');
	if(req.body.univercity == undefined)error.push('univercity');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		userId:req.body.userId,
		avarage:req.body.avarage,
		endDate:req.body.endDate,
		univercity:req.body.univercity
	};
	dbLayer.lab.user.insert.educationBackground(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;