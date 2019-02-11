var conn = require('../dbConn/lab.js');
var whereCreator = require('../dbLayerWhereCreator.js');

/*INTERFACE usersInsert{
	group(con,callbackFunction);
		con >>
			{id: 4}
	user(con,callbackFunction);
		con >>
			{id: 2}
	phone(con,callbackFunction);
		con >>
			{id: 2}
	educationBackground(con,callbackFunction);
		con >>
			{id: 2}
	child(con,callbackFunction);
		con >>
			{id: 2}
	resume(con,callbackFunction);
		con >>
			{id: 2}
}
*/

var usersDelete = {
	group : function(con,callbackFunction){
		let sql = 'DELETE FROM userGroup WHERE userGroupId = ?';
		if(!con.id)return;
		conn.query(sql,con.id,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	user : function(con,callbackFunction){
		let sql = 'UPDATE user SET userStatus = 2 WHERE userId = ?';
		let data = [
			con.id,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	phone: function(con,callbackFunction){
		let sql = 'DELETE FROM userPhone WHERE userPhoneId = ?';
		let data = [
			con.id,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	educationBackground: function(con,callbackFunction){
		let sql = 'DELETE FROM userEducationBackground WHERE userEducationBackgroundId = ?';
		let data = [
			con.id,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	child: function(con,callbackFunction){
		let sql = 'DELETE FROM userChild WHERE userChildId = ?';
		let data = [
			con.id,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	resume: function(input,callbackFunction){
		let sql = 'DELETE FROM userResume WHERE userResumeId = ?';
		let data = [
			con.id,
		];
		conn.query(sql,data,callbackFunction);
	},
};

module.exports = usersDelete;