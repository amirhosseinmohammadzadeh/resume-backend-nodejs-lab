var conn = require('../dbConn/lab.js');

/*INTERFACE usersInsert{
	user(input,callbackFunction);
		input>>
			exp:{username:'reza222',
				password:'123455'}
	info(input,callbackFunction);
		input>>
			exp:{userId:6,
			firstname:'amir sasan',
			lastname:'amini',
			birtday:1328498494,
			email:'test@yahooo.com',
			nationalCode:'32244297989',
			city:'teh',
			area:'aref',
			alley:'hasti',
			plaque:99,
			addrMoreInfo:'more..',
			postCode:'429489289284',
			registrationDate:42984292842,}
	phone(input,callbackFunction);
		input>>
			exp:{userId:2,
			phoneNumber:'9122345689',
			cityCode: '98',}
	educationBakhground(input,callbackFunction);
		input>>
			exp:{userId:2,
			avarage:12.50,
			endDate: 429892842084,
			univercity: 'tehran markaz'}
	child(input,callbackFunction);
		input>>
			exp:{userId:4,
			firstname:'ali',
			lastname: 'mahmodi',
			gender: true,
			birtday: 23424244242}
	resume(input,callbackFunction);
		input>>
			exp:{userId:4,
			placeName:'mellat',
			startTime: 1111222244,
			endTime: 1112214211,
			description: 'khob bode dg'}
}
*/

var usersInsert = {
	user : function(input,callbackFunction){
		conn.query('SELECT userGroupId FROM userGroup WHERE userGroupName = "technecian"',function(err,res,fields){
			if(err){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO user 
								(userUsername,userPassword,userStatus,userGroupId)
						VALUES 	(?,PASSWORD(?),?,?)`;
			let data = [
				input.username,
				input.password,
				1,
				res.userGroupId,
			];
			conn.query(sql,data,callbackFunction);
		})
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	info: function(input,callbackFunction){
		conn.query('SELECT userId FROM user INNER JOIN userGroup USING (userGroupId) WHERE userGroup.userGroupName = "technecian" AND user.userId = ?',input.userId,function(err,res,fields){
			if(err || !res || res[0].userId == undefined){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO userInfo
				(userId,userInfoFirstName,userInfoLastName,
				userInfoBirtday,userInfoEmail,userInfoNationalCode,
				userAddrCity,userAddrArea,userAddrAlley,
				userAddrPlaque,userAddrMoreInfo,userPostCode,
				userRegistrationDate)
			VALUES 		
				(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
			let data = [
				res.userId,
				input.firstname,
				input.lastname,
				input.birtday,
				input.email,
				input.nationalCode,
				input.city,
				input.area,
				input.alley,
				input.plaque,
				input.addrMoreInfo,
				input.postCode,
				input.registrationDate,
			];
			conn.query(sql,data,callbackFunction);
		});
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	phone: function(input,callbackFunction){
		conn.query('SELECT userId FROM user INNER JOIN userGroup USING (userGroupId) WHERE userGroup.userGroupName = "technecian" AND user.userId = ?',input.userId,function(err,res,fields){
			if(err || !res || res[0].userId == undefined){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO userPhone
				(userId,userPhoneNumber,userPhoneCityCode)
			VALUES
				(?,?,?)`;
			let data = [
				input.userId,
				input.phoneNumber,
				input.cityCode,
			];
			conn.query(sql,data,callbackFunction);	
		});
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	educationBackground: function(input,callbackFunction){
		conn.query('SELECT userId FROM user INNER JOIN userGroup USING (userGroupId) WHERE userGroup.userGroupName = "technecian" AND user.userId = ?',input.userId,function(err,res,fields){
			if(err || !res || res[0].userId == undefined){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO userEducationBackground
				(userId,
				userEducationBackgroundAverage,
				userEducationBackgroundEndDate,
				userEducationBackgroundUniversity)
			VALUES
				(?,?,?,?)`;
			let data = [
				input.userId,
				input.avarage,
				input.endDate,
				input.univercity,
			];
			conn.query(sql,data,callbackFunction);	
		});
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	child: function(input,callbackFunction){
		conn.query('SELECT userId FROM user INNER JOIN userGroup USING (userGroupId) WHERE userGroup.userGroupName = "technecian" AND user.userId = ?',input.userId,function(err,res,fields){
			if(err || !res || res[0].userId == undefined){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO userChild
				(userId,
				userChildFirstName,
				userChildLastName,
				userChildGender,
				UserChildBirtday)
			VALUES
				(?,?,?,?,?)`;
			let data = [
				input.userId,
				input.firstname,
				input.lastname,
				input.gender,
				input.birtday,
			];
			conn.query(sql,data,callbackFunction);
		});	
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	resume: function(input,callbackFunction){
		conn.query('SELECT userId FROM user INNER JOIN userGroup USING (userGroupId) WHERE userGroup.userGroupName = "technecian" AND user.userId = ?',input.userId,function(err,res,fields){
			if(err || !res || res[0].userId == undefined){
				callbackFunction(err,res,fields);
				return;
			}
			let sql = `INSERT INTO userResume
				(userId,
				userResumePlaceName,
				userResumeStartTime,
				userResumeEndTime,
				userResumeDiscription)
			VALUES
				(?,?,?,?,?)`;
			let data = [
				input.userId,
				input.placeName,
				input.startTime,
				input.endTime,
				input.description,
			];
			conn.query(sql,data,callbackFunction);
		});	
	},
};

module.exports = usersInsert;