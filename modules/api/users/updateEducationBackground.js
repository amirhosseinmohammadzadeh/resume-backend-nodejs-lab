var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/educationBackground
	POST
		exp:{
			con: {id : 7},
			set: {
				average: 15,
				endDate: 64766765,
				univercity: 'تهران مرکز',
			},
		},
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
	if(req.body.set.average)data.set.average = req.body.set.average;
	if(req.body.set.endDate)data.set.endDate = req.body.set.endDate;
	if(req.body.set.univercity)data.set.univercity = req.body.set.univercity;
	var funcState = dbLayer.lab.user.update.educationBackground(data,function(err,resp,field){
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