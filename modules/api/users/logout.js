/*	INTERFACE /users/logout
	RETURN
		{success:'don'}
*/

var main = function(req,res,next){
	let key;
	for(key in req.session){
		if(key == 'save')continue;
		delete req.session[key];
	}
	res.json({success:'don'});
}

module.exports = main;