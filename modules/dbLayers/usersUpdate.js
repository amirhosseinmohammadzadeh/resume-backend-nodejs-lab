var conn = require('../dbConn/lab.js');
var setCreator = require('../dbLayerUpdateSetCreator.js');

/*INTERFACE usersInsert{
	group(input,callbackFunction);
		input>>
		exp:{
			con: {id: 1},
			set: {name: 'sample'},
		}
	user(input,callbackFunction);
		input>>
		exp:{
			con: {id : 5},
			set: {
				username: 'saman222',
				password: '431134',
				status: 2,
				groupId: 1,
			},
		}
	info(input,callbackFunction);
		input>>
		exp:{
			con: {id : 6}, << userId*
			set: {
				firstname : 'amin',
				lastname : 'amini',
				birtday: 31198918989,
				email: 'test3@gmail.com',
				nationalCode: '3131938193',
				city: 'teh',
				area: 'azadi',
				alley: 'irani',
				plaque: 34,
				addrMoreInfo: 'hamine dg..',
				postCode: '4208429849' ,
			},
		},
	phone(input,callbackFunction);
		input>>
		exp:{
				con:{id : 1},
				set: {
					number: '9124443254',
					cityCode: '1',
				},
			}

	educationBackground(input,callbackFunction);
		input>>
		exp:{
			con: {id : 7},
			set: {
				average: 15,
				endDate: 64766765,
				univercity: 'تهران مرکز',
			},
		},
	child(input,callbackFunction);
		input>>
		exp:{
			con: {id : 6},
			set: {
				firstname: 'امیر علی',
				lastname: 'حقیقی',
				gender: false,
				birtday: 1393424972,
			},
		},	

	resume(input,callbackFunction);
		input>>
		exp:{
			con: {id : 6},
			set: {
				placeName: 'خیابون',
				startTime: 233339393,
				endTime: 533339393,
				description: 'گل میفروختم',
			},
		}
}
*/

var usersInsert = {
	group : function(input,callbackFunction){
		let sql = `UPDATE userGroup SET userGroupName= ? WHERE userGroupId = ?`;
		if(!input.set.name)return false;
		let data = [
			input.set.name,
			input.con.id,
		];
		conn.query(sql,data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	user : function(input,callbackFunction){
		let data = [
			['userUsername = ?',input.set.username],
			['userPassword = PASSWORD(?)',input.set.password],
			['userStatus = ?',input.set.status],
			['userGroupId = ?',input.set.groupId],
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `UPDATE user `+data.query+` WHERE userId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	info: function(input,callbackFunction){
		let data = [
			['userInfoFirstName = ?',input.set.firstname],
			['userInfoLastName = ?',input.set.lastname],
			['userInfoBirtday = ?',input.set.birtday],
			['userInfoEmail = ?',input.set.email],
			['userInfoNationalCode = ?',input.set.nationalCode],
			['userAddrCity = ?',input.set.city],
			['userAddrArea = ?',input.set.area],
			['userAddrAlley = ?',input.set.alley],
			['userAddrPlaque = ?',input.set.plaque],
			['userAddrMoreInfo = ?',input.set.addrMoreInfo],
			['userPostCode = ?',input.set.postCode],
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `Update userInfo `+data.query+` WHERE userId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	phone: function(input,callbackFunction){
		let data = [
			['userPhoneNumber = ?',input.set.number],
			['userPhoneCityCode = ?',input.set.cityCode],
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `UPDATE userPhone `+data.query+` WHERE userPhoneId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	educationBackground: function(input,callbackFunction){
		let data = [
			['userEducationBackgroundAverage = ?',input.set.average],
			['userEducationBackgroundEndDate = ?',input.set.endDate],
			['userEducationBackgroundUniversity = ?',input.set.univercity]
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `UPDATE userEducationBackground `+data.query+` WHERE userEducationBackgroundId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	child: function(input,callbackFunction){
		let data = [
			['userChildFirstName = ?',input.set.firstname],
			['userChildLastName = ?',input.set.lastname],
			['userChildGender = ?',input.set.gender],
			['UserChildBirtday = ?',input.set.birtday],
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `UPDATE userChild `+data.query+` WHERE userChildId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},

	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------
	//-------------------------------------------------------------------

	resume: function(input,callbackFunction){
		let data = [
			['userResumePlaceName = ?',input.set.placeName],
			['userResumeStartTime = ?',input.set.startTime],
			['userResumeEndTime = ?',input.set.endTime],
			['userResumeDiscription = ?',input.set.description],
		];
		data = setCreator(data);
		if(!data)return false;
		let sql = `UPDATE userResume `+data.query+` WHERE userResumeId = ?`;
		data.data.push(input.con.id);
		conn.query(sql,data.data,callbackFunction);
	},
};

module.exports = usersInsert;