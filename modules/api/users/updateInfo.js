var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/update/info
	POST
		exp:{
			con: {id : 6}, << userId*
			set: {
				firstname : 'amin',
				lastname : 'amini',
				birtday: 31198918989,
				email: 'test3@gmail.com',
				nationalCode: '3131938193',
				city: 'teh',
				area: 'azadi',
				alley: 'irani',
				plaque: 34,
				addrMoreInfo: 'hamine dg..',
				postCode: '4208429849' ,
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
	if(req.body.set.birtday)data.set.birtday = req.body.set.birtday;
	if(req.body.set.email)data.set.email = req.body.set.email;
	if(req.body.set.nationalCode)data.set.nationalCode = req.body.set.nationalCode;
	if(req.body.set.city)data.set.city = req.body.set.city;
	if(req.body.set.area)data.set.area = req.body.set.area;
	if(req.body.set.alley)data.set.alley = req.body.set.alley;
	if(req.body.set.plaque)data.set.plaque = req.body.set.plaque;
	if(req.body.set.addrMoreInfo)data.set.addrMoreInfo = req.body.set.addrMoreInfo;
	if(req.body.set.postCode)data.set.postCode = req.body.set.postCode;
	var funcState = dbLayer.lab.user.update.info(data,function(err,resp,field){
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