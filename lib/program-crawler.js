var parseRow = function(item){
	var ret={};
	//make map from input data
	var a = item.split(";");
	for (var j=0;j<a.length;j++) {
		var b = a[j].split("=");
		if(b[0] && b[1]) ret[b[0]]=b[1];
	}
	return ret;
}

var parse = function(stringData , callback){
	var program=[], league = "";	
	var row = stringData.split("|")
	
	//create an array with the keys which must be concatenate to the URL_ODDS.
	for ( var i = 0; i < row.length; i++ ){
		var item = parseRow(row[i]);
		if(item.PD ) program.push(item.PD);
	}
	callback (null, program)
};
module.exports={
		parse: parse
}