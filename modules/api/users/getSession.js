/*INTERFACE /users/get/session
	RETURNS	{JSON}
*/

var main = function(req,res,next){
	let output = {};
	output.userId = req.session.userId;
	output.username = req.session.userUsername;
	output.groupId = req.session.userGroupId;
	output.groupName = req.session.userGroupName;
	res.json(output);
};

module.exports = main;