var i_log = require ("i-log")("i-bet365:odds-crawler");

var parseRow = function(item){
	var ret={};
	//get betradarId
	var pos=item.indexOf("matchid");
	var pos2=item.indexOf("&language");
	if(pos>0){
		var matchid = item.substring(pos + "matchid=".length,pos2)
		ret.betradarId = matchid;
	}
	//make map from input data
	var a = item.split(";");
	for (var j=0;j<a.length;j++) {
		var b = a[j].split("=");
		if(b[0] && b[1]) ret[b[0]]=b[1];
	}
	return ret;
}

var parse = function(stringData , callback){
	var eventsMap={};	
	var row = stringData.split("|")
	var league = "";
	//iterate the rows
	for ( var i = 0; i < row.length; i++ ){
		var item = parseRow(row[i]);
		var obj = {data:{},odds:{}}
		if(row[i].indexOf("MG;")>=0){
			league = item.NA;
		}
		if(item["PD"] && item["FI"] && ! eventsMap[item["FI"]]) {
			obj.data.id= item["ID"];
			obj.data.name= item["NA"];
			obj.data.league = league
			eventsMap[item["FI"]] = obj;
		}
		if(item["OD"] && eventsMap[item["FI"]]) {
			var t=item["OD"].split("/");
			var decimalOdd = 1 + t[0]/t[1];
			
			if(item["IT"].indexOf("P2")>=0) eventsMap[item["FI"]].odds["1"] = decimalOdd;
			else if(item["IT"].indexOf("P3")>=0) eventsMap[item["FI"]].odds["X"] = decimalOdd;
			else if(item["IT"].indexOf("P4")>=0) eventsMap[item["FI"]].odds["2"] = decimalOdd;
		}
	}
	i_log.debug("parsed: ", eventsMap);
	i_log.info("exit parse.");
	callback ();
}
module.exports={
		parse: parse
}