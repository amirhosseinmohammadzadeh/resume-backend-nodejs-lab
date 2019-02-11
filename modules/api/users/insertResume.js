var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/resume
	POST
		exp:{userId:4,
			placeName:'mellat',
			startTime: 1111222244,
			endTime: 1112214211,
			description: 'khob bode dg'}	
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.userId == undefined)error.push('userId');
	if(req.body.placeName == undefined)error.push('placeName');
	if(req.body.startTime == undefined)error.push('startTime');
	if(req.body.endTime == undefined)error.push('endTime');
	if(req.body.description == undefined)error.push('description');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		userId:req.body.userId,
		placeName:req.body.placeName,
		startTime:req.body.startTime,
		endTime:req.body.endTime,
		description:req.body.description,
	};
	dbLayer.lab.user.insert.resume(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;