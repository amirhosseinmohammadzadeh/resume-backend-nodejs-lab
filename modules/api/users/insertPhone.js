var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/phone
	POST
		exp:{userId:2,
			phoneNumber:'9122345689',
			cityCode: '98',}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.userId == undefined)error.push('userId');
	if(req.body.phoneNumber == undefined)error.push('phoneNumber');
	if(req.body.cityCode == undefined)error.push('cityCode');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		userId:req.body.userId,
		phoneNumber:req.body.phoneNumber,
		cityCode:req.body.cityCode,
	};
	dbLayer.lab.user.insert.phone(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;