var conn = require('../dbConn/lab.js');
var whereCreator = require('../dbLayerWhereCreator.js');
var objectToArray = require('../dbLayerObjectToArray.js');

/*INTERFACE usersSelect{
	smallInfo(object con,function callbackFunction);
		con.username [String] Equal

	mediumInfo(object con,function callbackFunction);
		con.phoneNumber [String] Like
		con.phoneCityCode [String] Equal
		con.username [Stirng] Like
		con.firstname [String] Like
		con.lastname [String] Like
		con.birtdayStart [INT] Between
		con.birtdayEnd [INT] Between
		con.email [String] Like
		con.nationalCode [String] Like
		con.groupName [String] equal
		con.city [String] Equal
		con.street [String] Equal
		con.alley [String] Equal
		con.plaque [INT] Equal
		con.postCode [String] Like
		con.registerStart [INT] Between
		con.registerEnd [INT] Between

	fullInfo(object con,function callbackFunction);
		con.username [String] Equal
		con.userId [INT] Equal

	inOut(object con,function callbackFunction);
		con.userId [INT] equal
		con.username [Stirng] Equal
		con.mode [Boolean] Equal
		con.startTime [INT] Between
		con.endTime [INT] Between

}*/

var usersSelect = {
	smallInfo : function(con,callbackFunction){
		let sql = `SELECT userId,userUsername,userPassword,userStatus,userGroupId,userGroupName FROM user INNER JOIN userGroup USING (userGroupId)`;
		let where = '';
		let password = null;
		if(!con)con = {};
		let datas = [
			[
				'user.userUsername = ?',
				(con.username == undefined) ? undefined : con.username.toString(),
			],
			[
				'user.userPassword = PASSWORD(?)',
				(con.password == undefined) ? undefined : con.password.toString(),
			],
		];	
		datas = whereCreator(datas);
		sql += datas.query;
		conn.query(sql,datas.data,callbackFunction)
	},


	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------


	mediumInfo : function(con,callbackFunction){
		let sql = `SELECT * FROM user
						INNER JOIN userGroup USING (userGroupId)
						LEFT JOIN userInfo USING (userId)
						LEFT JOIN userPhone USING (userId)`;
		let datas = [
			[
				'userGroup.userGroupName LIKE ?',
				(con.groupName == undefined) ? undefined : con.groupName.toString().toLowerCase(),
			],
			[
				'userPhone.userPhoneNumber LIKE ?',
				(con.phoneNumber == undefined) ? undefined : con.phoneNumber.toString(),
			],
			[
				'userPhone.userPhoneCityCode = ?',
				(con.phoneCityCode == undefined) ? undefined : con.phoneCityCode.toString(),
			],
			[
				'user.userUsername LIKE ?',
				(con.username == undefined) ? undefined : con.username.toString(),
			],
			[
				'userInfo.userInfoFirstname LIKE ?',
				(con.firstname == undefined) ? undefined : con.firstname.toString(),
			],
			[
				'userInfo.userInfoLastname LIKE ?',
				(con.lastname == undefined) ? undefined : con.lastname.toString(),
			],
			[
				'userInfo.userInfoBirtday BETWEEN ? AND ?',
				(con.birtdayStart == undefined && con.birtdayEnd == undefined) ? undefined : parseInt(con.birtdayStart),
				(con.birtdayEnd == undefined && con.birtdayStart == undefined) ? undefined : parseInt(con.birtdayEnd),
			],
			[
				'userInfo.userInfoEmail LIKE ?',
				(con.email == undefined) ? undefined : con.email.toString(),
			],
			[
				'userInfo.userInfoNationalCode LIKE ?',
				(con.nationalCode == undefined) ? undefined : con.nationalCode.toString(),
			],
			[
				'userInfo.userInfoAddrCity = ?',
				(con.city == undefined) ? undefined : con.city.toString(),
			],
			[
				'userInfo.userInfoAddrStreet = ?',
				(con.street == undefined) ? undefined : con.street.toString(),
			],
			[
				'userInfo.userInfoAddrAlley = ?',
				(con.alley == undefined) ? undefined : con.alley.toString(),
			],
			[
				'userInfo.userInfoAddrPlaque = ?',
				(con.plaque == undefined) ? undefined : parseInt(con.plaque),
			],
			[
				'userInfo.userInfoPostCode LIKE ?',
				(con.postCode == undefined) ? undefined : con.postCode.toString(),
			],
			[
				'userInfo.userInfoRegistrationDate BETWEEN ? AND ?',
				(con.registerStart == undefined && con.registerEnd == undefined) ? undefined : parseInt(con.registerStart),
				(con.registerEnd == undefined && con.registerStart == undefined) ? undefined : parseInt(con.registerEnd),
			],
		];
		datas = whereCreator(datas);
		if(datas.query)sql += datas.query;
		conn.query(sql,datas.data,function (err,res,fields){
			var result = {};
			res.forEach(function(element, index){
				let phone = {
					userPhoneNumber: element.userPhoneNumber,
					userPhoneId: element.userPhoneId,
					userPhonrCityCode: element.userPhoneCityCode,
				}
				if(result[element.userId] == undefined){
					delete element.userPhoneCityCode;
					delete element.userPhoneNumber;
					delete element.userPhoneId;
					element.userPhone = [phone];
					result[element.userId] = element;
				}else{
					result[element.userId].userPhone.push(phone);
				};
			});
			res = objectToArray([{}],result);
			callbackFunction(err,res,fields);
		});
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	inOut : function(con,callbackFunction){
		let sql = `SELECT * FROM userInOut
						INNER JOIN user USING (userId)`;
		let datas = [
			[
				'user.userId = ?',
				(con.userId == undefined) ? undefined : parseInt(con.userId),
			],
			[
				'user.userUsername = ?',
				(con.username == undefined) ? undefined : con.username.toString(),
			],
			[
				'userInOut.userInOutMode = ?',
				(con.mode == undefined) ? undefined : Boolean(con.mode),
			],
			[
				'userInOut.userInOutTime BETWEEN ? AND ?',
				(con.startTime == undefined && con.endTime == undefined) ? undefined : parseInt(con.startTime),
				(con.endTime == undefined && con.startTime == undefined) ? undefined : parseInt(con.endTime),
			],
		];	
		datas = whereCreator(datas);
		if(datas.query)sql += datas.query;
		conn.query(sql,datas.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	fullInfo : function(con,callbackFunction){
		let sql = `SELECT * FROM user
						INNER JOIN userGroup USING (userGroupId)
						LEFT JOIN userInfo USING (userId)
						LEFT JOIN userPhone USING (userId)
						LEFT JOIN userEducationBackground USING (userId)
						LEFT JOIN userChild USING (userId)
						LEFT JOIN userResume USING (userId)`;
		let datas = [
			[
				'user.userUsername = ?',
				(con.username == undefined) ? undefined : con.username.toString(),
			],
			[
				'user.userId = ?',
				(con.userId== undefined) ? undefined : parseInt(con.userId),
			],
		];
		datas = whereCreator(datas);
		if(datas.query)sql += datas.query;
		conn.query(sql,datas.data,function(err,res,fields){
			var result = {};
			res.forEach(function(element, index){
				let phone = {
					userPhoneNumber: element.userPhoneNumber,
					userPhoneId: element.userPhoneId,
					userPhonrCityCode: element.userPhoneCityCode,
				};
				let educationBackground = {
					userEducationBackgroundId: element.userEducationBackgroundId,
					userEducationBackgroundAverage: element.userEducationBackgroundAverage,
					userEducationBackgroundEndDate: element.userEducationBackgroundEndDate,
					userEducationBackgroundUniversity: element.userEducationBackgroundUniversity,
				};
				let child = {
					userChildId: element.userChildId,
					userChildFirstName: element.userChildFirstName,
					userChildLastName: element.userChildLastName,
					userChildGender: element.userChildGender,
					UserChildBirtday: element.UserChildBirtday,
				};
				let resume = {
					userResumeId: element.userResumeId,
					userResumePlaceName: element.userResumePlaceName,
					userResumeStartTime: element.userResumeStartTime,
					userResumeEndTime: element.userResumeEndTime,
					userResumeDiscription: element.userResumeDiscription,
				};
				if(result[element.userId] == undefined){
					delete element.userPhoneCityCode;
					delete element.userPhoneNumber;
					delete element.userPhoneId;
					delete element.userEducationBackgroundId;
					delete element.userEducationBackgroundAverage;
					delete element.userEducationBackgroundEndDate;
					delete element.userEducationBackgroundUniversity;
					delete element.userChildId;
					delete element.userChildFirstName;
					delete element.userChildLastName;
					delete element.userChildGender;
					delete element.UserChildBirtday;
					delete element.userResumeId;
					delete element.userResumePlaceName;
					delete element.userResumeStartTime;
					delete element.userResumeEndTime;
					delete element.userResumeDiscription;
					element.userPhone = {};
					element.educationBackground = {};
					element.child = {};
					element.resume = {};
					if(phone.userPhoneId)element.userPhone[phone.userPhoneId] = phone;
					if(educationBackground.userEducationBackgroundId)element.educationBackground[educationBackground.userEducationBackgroundId] = educationBackground;
					if(child.userChildId)element.child[child.userChildId] = child;
					if(resume.userResumeId)element.resume[resume.userResumeId] = resume;
					result[element.userId] = element;
				}else{
					if(phone.userPhoneId)result[element.userId].userPhone[phone.userPhoneId] = phone;
					if(educationBackground.userEducationBackgroundId)result[element.userId].educationBackground[educationBackground.userEducationBackgroundId] = educationBackground;
					if(child.userChildId)result[element.userId].child[child.userChild] = child;
					if(resume.userResumeId)result[element.userId].resume[resume.userResumeId] = resume;
				}
			});
			let info = [{property : [{name : 'resume'},
									 {name : 'userPhone'},
									 {name : 'educationBackground'},
									 {name : 'child'},],}];
			res = objectToArray(info,result);
			callbackFunction(err,res,fields);	
		});
	},
};

module.exports = usersSelect;