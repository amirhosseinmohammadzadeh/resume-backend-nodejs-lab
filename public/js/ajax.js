var ajax = {
	process :{},
	loading: templateDatas.loading,
	post : function(url,send,loadingPosition,callbackFunction){
		var xmlhttp = new XMLHttpRequest();
		var id = 'id'+parseInt(Math.random()*100000000);
		xmlhttp.onreadystatechange = function() {
	    	if(ajax.process[id] == undefined)return;
		    if (this.readyState == 4){
				var obj = this;
				setTimeout(function(){
					if(ajax.process[id].loadingPosition)document.getElementById(ajax.process[id].loadingPosition).innerHTML = '';
			    	delete ajax.process[id];
			        if(obj.status == 200)callbackFunction(JSON.parse(obj.responseText));
			        else alert('process id:'+id+' error! state:'+obj.readyState+' ,status:'+obj.status);
				},2000);
		    }	    	
		};
		setTimeout(function(){
			if(ajax.process[id] != undefined){
				if(ajax.process[id].loadingPosition)document.getElementById(ajax.process[id].loadingPosition).innerHTML = '';
				delete ajax.process[id];
				alert('process id:'+id+' is time out.');
			}
		},10000);
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type", "application/json");
		send = JSON.stringify(send);
		xmlhttp.send(send);
		this.process[id] = {};
		this.process[id].loadingPosition = loadingPosition;
		this.process[id].url = url;
		if(loadingPosition)document.getElementById(loadingPosition).innerHTML = this.loading;
	},
}

