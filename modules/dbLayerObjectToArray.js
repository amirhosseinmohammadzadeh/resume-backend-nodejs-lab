// exp > infos > [{
// 	change : true,
// 	property : [
// 		{name : 'resume',change : true,},
// 		{name : 'userPhone',change : true,},
// 		{name : 'educationBackground',change : true,},
// 		{name : 'child',change : true,},
// 	],
// }]

function converter(infos,data){
	var datas = [];
	var key;
	var objc;
	var output;
	infos.forEach( function(element, index) {
		var obj = data;
		var name = element.name;
		var change = element.change === false ? false : true;
		var property = element.property;
		if(change){
			key = null;
			objc = name ? obj[name] : obj;
			output = [];
			for(key in objc){
				if(property)output.push(converter(property,objc[key]));
				else output.push(objc[key]);
			};
			if(name)data[name] = output;
			else data = output;
		}
	});
	return data;
}

module.exports = converter;
