var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/select/technecianMediumInfo
	POST
		con.phoneNumber [String] Like
		con.phoneCityCode [String] Equal
		con.username [Stirng] Like
		con.firstname [String] Like
		con.lastname [String] Like
		con.birtdayStart [INT] Between
		con.birtdayEnd [INT] Between
		con.email [String] Like
		con.nationalCode [String] Like
		con.city [String] Equal
		con.street [String] Equal
		con.alley [String] Equal
		con.plaque [INT] Equal
		con.postCode [String] Like
		con.registerStart [INT] Between
		con.registerEnd [INT] Between		
	RETERNS
		{error:'database',message:err}
		{JSON}
*/

var main = function(req,res,next){
	let error = [];
	let data = {};
	if(req.body.phoneNumber)data.phoneNumber = req.body.phoneNumber;
	if(req.body.phoneCityCode)data.phoneCityCode = req.body.phoneCityCode;
	if(req.body.username)data.username = req.body.username;
	if(req.body.firstname)data.firstname = req.body.firstname;
	if(req.body.lastname)data.lastname = req.body.lastname;
	if(req.body.birtdayStart)data.birtdayStart = req.body.birtdayStart;
	if(req.body.birtdayEnd)data.birtdayEnd = req.body.birtdayEnd;
	if(req.body.email)data.email = req.body.email;
	if(req.body.nationalCode)data.nationalCode = req.body.nationalCode;
	if(req.body.city)data.city = req.body.city;
	if(req.body.street)data.street = req.body.street;
	if(req.body.alley)data.alley = req.body.alley;
	if(req.body.plaque)data.plaque = req.body.plaque;
	if(req.body.postCode)data.postCode = req.body.postCode;
	if(req.body.registerStart)data.registerStart = req.body.registerStart;
	if(req.body.registerEnd)data.registerEnd = req.body.registerEnd;
	dbLayer.lab.user.select.technecianMediumInfo(data,function(err,resp,filed){
		if(err){
			res.json({error:'database',message:err});
			return;
		}
		resp.forEach( function(element, index) {
			delete resp[index].userPassword;
		});
		res.json(resp);
	})
};

module.exports = main;