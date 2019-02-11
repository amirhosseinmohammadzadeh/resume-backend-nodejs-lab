var conn = require('../dbConn/lab.js');

/*INTERFACE usersInsert{
	group(input,callbackFunction);
		input>>
			exp:{name: 'smapleGroup1'}
	user(input,callbackFunction);
		input>>
			exp:{username:'reza222',
				password:'123455',
				status: 1,
				userGroupId: 3}
	info(input,callbackFunction);
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
	inOut(input,callbackFunction);
		input>>
			exp:{userId:4,
			time:904292024902,
			mode: true}
}
*/

var usersInsert = {
	group : function(input,callbackFunction){
		let sql = `INSERT INTO userGroup (userGroupName) VALUES (?)`;
		let userGroupName = input.name;
		conn.query(sql,userGroupName,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	user : function(input,callbackFunction){
		let sql = `INSERT INTO user 
							(userUsername,userPassword,userStatus,userGroupId)
					VALUES 	(?,PASSWORD(?),?,?)`;
		let data = [
			input.username,
			input.password,
			input.status,
			input.userGroupId,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	info: function(input,callbackFunction){
		let sql = `INSERT INTO userInfo
			(userId,userInfoFirstName,userInfoLastName,
			userInfoBirtday,userInfoEmail,userInfoNationalCode,
			userAddrCity,userAddrStreet,userAddrArea,userAddrAlley,
			userAddrPlaque,userAddrMoreInfo,userPostCode,
			userRegistrationDate)
		VALUES 		
			(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
		let data = [
			input.userId,
			input.firstname,
			input.lastname,
			input.birtday,
			input.email,
			input.nationalCode,
			input.city,
			input.street,
			input.area,
			input.alley,
			input.plaque,
			input.addrMoreInfo,
			input.postCode,
			input.registrationDate,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	phone: function(input,callbackFunction){
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
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	educationBackground: function(input,callbackFunction){
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
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	child: function(input,callbackFunction){
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
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	resume: function(input,callbackFunction){
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
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	
	inOut: function(input,callbackFunction){
		let sql = `INSERT INTO userInOut
			(userId,
			userInOutTime,
			userInOutMode)
		VALUES
			(?,?,?)`;
		let data = [
			input.userId,
			input.time,
			input.mode,
		];
		conn.query(sql,data,callbackFunction);			
	}
};

module.exports = usersInsert;