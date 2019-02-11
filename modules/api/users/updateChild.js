var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/child
	POST
		exp:{
			con: {id : 6},<<userChildId
			set: {
				firstname: 'امیر علی',
				lastname: 'حقیقی',
				gender: false,
				birtday: 1393424972,
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
	if(req.body.set.firstname)data.set.firstname = req.body.set.firstname;
	if(req.body.set.lastname)data.set.lastname = req.body.set.lastname;
	if(req.body.set.gender)data.set.gender = req.body.set.gender;
	if(req.body.set.birtday)data.set.birtday = req.body.set.birtday;
	var funcState = dbLayer.lab.user.update.child(data,function(err,resp,field){
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