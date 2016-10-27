var i_log = require("i-log")("i-bet365");
var config = require("i-config");
var http = require('http');

var start = function(){
	i_log.debug("crawler wake up.")
	do_crawling(function(){
		i_log.debug("crawler is going to sleep for: "+config.time_to_wai)
		setTimeout(start, config.time_to_wait);
	})
	
}
var httpGetSoccer = function(callback){

	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'

	httpGetSoccerHandler = function(response) {
	  var str = '';

	  response.on('data', function (chunk) {
		    str += chunk;
		  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('uncaughtException', function (err) {
	    console.log(err);
	    callback(err);
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    callback(null, str);
	  });
	}
	 i_log.debug("connecting to:");
	 i_log.debug( config.remote);
	http.request(config.remote, httpGetSoccerHandler).end();
}
var do_crawling = function(callback){
	httpGetSoccer(function(err, stringData){
		if(err) console.log(err)
		else i_log.debug(stringData);
		
	    callback();
	})
}

module.exports={
		start:start
}