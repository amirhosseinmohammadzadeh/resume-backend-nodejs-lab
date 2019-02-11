var dbLayer = require('../../dbLayer.js');

/* INTERFACE /users/delete/phone
	POST
		{id : 2}
	RETERNS
		{error:'database',message:err}
		{success:'don'}
		{error:'noEffected'}
		{error:'empty',field:'id'}
*/

var main = function(req,res,next){
	if(req.body.id == undefined){
		res.json({error:'empty',field:'id'});
		return;
	}
	let id = req.body.id;
	dbLayer.lab.user.delete.phone(
		{id: id},
		function(err,resp,field){
			if(err){
				res.json({error:'database',message:err});
				return;
			}
			if(resp.affectedRows > 0)res.json({success:"don"});
			else res.json({error:"noEffected"});
		}
	);
};

module.exports = main;