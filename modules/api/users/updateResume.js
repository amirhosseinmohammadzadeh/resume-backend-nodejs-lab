var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/resume
	POST
		exp:{
			con: {id : 6},
			set: {
				placeName: 'خیابون',
				startTime: 233339393,
				endTime: 533339393,
				description: 'گل میفروختم',
			},
		}	
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{error:'database',message:'return false!'}
		{success:"don"}		
*/

var main = function(req,res,next){
	let error = [];
	let data = {set:{},con:{}};
	if(req.body.con.id == undefined)error.push('con.id');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	data.con.id = req.body.con.id;
	if(req.body.set.placeName)data.set.placeName = req.body.set.placeName;
	if(req.body.set.startTime)data.set.startTime = req.body.set.startTime;
	if(req.body.set.endTime)data.set.endTime = req.body.set.endTime;
	if(req.body.set.description)data.set.description = req.body.set.description;
	var funcState = dbLayer.lab.user.update.resume(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
	if(funcState === false){
		res.json({error:'database',message:'return false!'});
	}
};

module.exports = main;