var perm = require('../../datas/perm.json');

var files = perm.api.users;
perm = perm.perms;
var users = {};
var perms = {};

let key;
for(key in files){
	users[key.toLowerCase()] = {};
	perms[key.toLowerCase()] = {};
	users[key.toLowerCase()] = require(files[key].addr);
	perms[key.toLowerCase()] = files[key].perms;
}

delete files;

var main = function(req,res,next){
	let mode = req.params.mode.toLowerCase();
	let func = (mode == 'login' || mode == 'logout') ? '' : (req.params.func == undefined) ? undefined : req.params.func.toLowerCase();
	if(func === undefined){
		res.json({error:'404',message:'not found!'});
		return;
	}
	var userGroupId = (req.session.userGroupId == undefined) ? '0' : req.session.userGroupId;
	let access = (perms[mode+func] === undefined) ? false : perms[mode+func].find(function(value){
		if(value == userGroupId)return true;
		else return false;
	});
	if(access === false)res.json({error:'404',message:'not found!'});
	if(access === undefined)res.json({error:'403',message:'permission denied!'});
	else users[mode+func](req,res,next);
}

module.exports = main;