var dbLayer = require('../../dbLayer.js');

/*
	INTERFACE domain.com/users/login
	POSTS:
		username,
		password,
	RETURNS:
		{error:'empty',field:''} >> error
		{error:'usrpss'} >> success
*/

var main = function(req,res,next){
	let username,password;
	if(req.body.username == undefined)username = undefined;
	else username = req.body.username;
	if(req.body.password == undefined)password = undefined;
	else password = req.body.password;
	if(!username){
		res.json({error:'empty',field:'username'});
		return;
	};
	if(!password){
		res.json({error:'empty',field:'password'});
		return
	}
	dbLayer.lab.user.select.smallInfo(
		{
			username:username,
			password:password,
		},
		function(err,resp,fields){
			if(resp[0] == undefined){
				res.json({error:'usrpss'});
				return;
			}
			req.session.userId = resp[0].userId;
			req.session.userUsername = resp[0].userUsername;
			req.session.userGroupId = resp[0].userGroupId;
			req.session.userGroupName = resp[0].userGroupName;
			let output = {};
			output.userId = resp[0].userId;
			output.username = resp[0].userUsername;
			output.groupId = resp[0].userGroupId;
			output.groupName = resp[0].userGroupName;
			res.json(output);
		}
	)
};

module.exports = main;