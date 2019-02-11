var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/user
	POST
		exp:{
			con: {id : 5},
			set: {
				username: 'saman222',
				password: '431134',
				status: 2,
				groupId: 1,
			},
		}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{error:'database',message:'return false!'}
		{error:'exist',message:'username exist!'}	
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
	if(req.body.set.username)data.set.username = req.body.set.username;
	if(req.body.set.password)data.set.password = req.body.set.password;
	if(req.body.set.status)data.set.status = req.body.set.status;
	if(req.body.set.groupId)data.set.groupId = req.body.set.groupId;
	var funcState;
	if(req.body.set.username){
		dbLayer.lab.user.select.smallInfo({username:req.body.set.username},function(err,resp,field){
			if(resp[0]){
				res.json({error:'exist',message:'username exist!'});
				return;
			}
			var funcState = dbLayer.lab.user.update.user(data,function(err,resp,field){
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
		})
	}else{
		funcState = dbLayer.lab.user.update.user(data,function(err,resp,field){
			if(err){
				res.json({error:'database',message:err});
				return;
			}
			if(resp.affectedRows > 0)res.json({success:"don"});
			else res.json({error:"noEffected"});
		});
	}
	if(funcState === false){
		res.json({error:'database',message:'return false!'});
	}
};

module.exports = main;