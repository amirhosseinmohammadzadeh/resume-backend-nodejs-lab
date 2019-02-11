var conn = require('../dbConn/lab.js');
var whereCreator = require('../dbLayerWhereCreator.js');
var objectToArray = require('../dbLayerObjectToArray.js');

/*INTERFACE usersSelect{
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
		con.city [String] Equal
		con.street [String] Equal
		con.alley [String] Equal
		con.plaque [INT] Equal
		con.postCode [String] Like
		con.registerStart [INT] Between
		con.registerEnd [INT] Between
}*/

var selectTechnecian = {
	mediumInfo : function(con,callbackFunction){
		let sql = `SELECT * FROM user
						INNER JOIN userGroup USING (userGroupId)
						LEFT JOIN userInfo USING (userId)
						LEFT JOIN userPhone USING (userId)`;
		let datas = [
			[
				'userGroup.userGroupName = ?',
				'technecian',
			],
			[
				'userPhone.userPhoneNumber LIKE ?',
				(con.phoneNumber == undefined) ? undefined : con.phoneNumber.toString(),
			],
			[
				'userPhone.userPhoneCityCode = ?',
				(con.phoneCityCode == undefined) ? undefined : con.phoneNumber.toString(),
			],
			[
				'user.userUsername = ?',
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
};

module.exports = selectTechnecian;
