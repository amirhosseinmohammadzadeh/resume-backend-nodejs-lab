var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/technecianChild
	POST
		{userId:4,
 		firstname:'ali',
 		lastname: 'mahmodi',
 		gender: true,
 		birtday: 23424244242}
	RETERNS
		{error:'empty',field:error}
		{error:'database',message:err}
		{error:"noEffected"}
		{success:"don"}
*/

var main = function(req,res,next){
	let error = [];
	if(req.body.userId == undefined)error.push('userId');
	if(req.body.firstname == undefined)error.push('firstname');
	if(req.body.lastname == undefined)error.push('lastname');
	if(req.body.gender == undefined)error.push('gender');
	if(req.body.birtday == undefined)error.push('birtday');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		userId:req.body.userId,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		gender:req.body.gender,
		birtday:req.body.birtday,
	}
	dbLayer.lab.user.insert.technecianChild(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;