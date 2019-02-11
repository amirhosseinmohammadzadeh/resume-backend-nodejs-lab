var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/insert/info
	POST
		input>>
			exp:{userId:6,
			firstname:'amir sasan',
			lastname:'amini',
			birtday:1328498494,
			email:'test@yahooo.com',
			nationalCode:'32244297989',
			city:'teh',
			street:'eftekharian',
			area:'aref',
			alley:'hasti',
			plaque:99,
			addrMoreInfo:'more..',
			postCode:'429489289284'}
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
	if(req.body.birtday == undefined)error.push('birtday');
	if(req.body.email == undefined)error.push('email');
	if(req.body.nationalCode == undefined)error.push('nationalCode');
	if(req.body.city == undefined)error.push('city');
	if(req.body.street == undefined)req.body.street = null;
	if(req.body.area == undefined)req.body.area = null;
	if(req.body.alley == undefined)req.body.alley = null;
	if(req.body.plaque == undefined)req.body.plaque = null;
	if(req.body.addrMoreInfo == undefined)req.body.addrMoreInfo = null;
	if(req.body.postCode == undefined)error.push('postCode');
	if(error[0] != undefined){
		res.json({error:'empty',field:error})
		return;
	}
	let data = {
		userId:req.body.userId,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		birtday:req.body.birtday,
		email:req.body.email,
		nationalCode:req.body.nationalCode,
		city:req.body.city,
		street:req.body.street,
		area:req.body.area,
		alley:req.body.alley,
		plaque:req.body.plaque,
		addrMoreInfo:req.body.addrMoreInfo,
		postCode:req.body.postCode,
		registrationDate:Date.now(),
	};
	dbLayer.lab.user.insert.info(data,function(err,resp,field){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		if(resp.affectedRows > 0)res.json({success:"don"});
		else res.json({error:"noEffected"});
	});
};

module.exports = main;