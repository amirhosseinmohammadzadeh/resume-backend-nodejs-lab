var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/phone
	POST
		exp:{
			con:{id : 1},
			set: {
				number: '9124443254',
				cityCode: '1',
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
	if(req.body.set.number)data.set.number = req.body.set.number;
	if(req.body.set.cityCode)data.set.cityCode = req.body.set.cityCode;
	var funcState = dbLayer.lab.user.update.phone(data,function(err,resp,field){
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