/*
	datas: [
		'0' => sql where condition
		'1' => data1
		'2' => data2
	]

	>> exp: [
		'userInfo.userInfoRegistrationDate BETWEEN ? AND ?',
		(con.registerStart == undefined && con.registerEnd == undefined) ? undefined : parseInt(con.registerStart),
		(con.registerEnd == undefined && con.registerStart == undefined) ? undefined : parseInt(con.registerEnd),
	],
*/

var creator = function(datas){
	var inputSqlDatas = [];
	var where = '';
	datas.forEach(function(element, index) {
		if(element[1] == undefined)return;
		if(where) where += ' AND \n';
		where += element[0];
		inputSqlDatas.push(element[1]);
		if(element[2] == undefined)return;
		inputSqlDatas.push(element[2]);
	});
	if(where)where = '\n WHERE '+where;
	return {
				query:	where,
				data:	inputSqlDatas
			};
}

module.exports = creator;