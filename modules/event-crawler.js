var i_log = require ("../../i-log")("i-bet365");

var splitItem = function(item){
	var ret={};
	//get betradarId
	var pos=item.indexOf("matchid");
	var pos2=item.indexOf("&language");
	if(pos>0){
		var matchid = item.substring(pos + "matchid=".length,pos2)
		ret.betradarId = matchid;
	}
	//iterate on the data
	var a = item.split(";");
	for (var j=0;j<a.length;j++) {
		var b = a[j].split("=");
		if(b[0] && b[1]) ret[b[0]]=b[1];
	}
	return ret;
}

var parse = function(stringData){
	i_log.info("Start parse event: ");
	var eventsMap={};	
	var arr=stringData.split("|")
	//iterate the rows
	for (var i=0;i<arr.length;i++){
		var item = splitItem(arr[i]);

		if(item["PD"] && item["FI"] && ! eventsMap[item["FI"]]) {
			eventsMap[item["FI"]] = item;
		}
		if(item["OD"] && eventsMap[item["FI"]]) {
			var t=item["OD"].split("/");
			var decimalOdd =  t[0]/t[1];
			

			if(item["IT"].indexOf("P2")>=0) eventsMap[item["FI"]]["1"] = decimalOdd;
			else if(item["IT"].indexOf("P3")>=0) eventsMap[item["FI"]]["X"] = decimalOdd;
			else if(item["IT"].indexOf("P4")>=0) eventsMap[item["FI"]]["2"] = decimalOdd;
		}
	}
	i_log.debug(eventsMap);

	i_log.info("End parse event: ");
}
module.exports={
		parse: parse
}