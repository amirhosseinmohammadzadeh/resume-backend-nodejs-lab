/*
	datas: [
		'0' => query
		'1' => data1
	]

	>> exp: [
				[
					'columnName = ?',
					value,
				],
				[..],
				[..],
				..
			]

*/

var creator = function(datas){
	var inputSqlDatas = [];
	var query = '';
	datas.forEach(function(element, index) {
		if(element[1] == undefined)return;
		if(query) query += ' , \n';
		query += element[0];
		inputSqlDatas.push(element[1]);
	});
	if(query)query = '\n SET '+query;
	else return false;
	return {
				query:	query,
				data:	inputSqlDatas
			};
}

module.exports = creator;