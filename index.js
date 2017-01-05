
var http =  require("http");
var oddCrawler =  require("./lib/odds-crawler");
var programCrawler =  require("./lib/program-crawler");
var Irest =  require("./lib/interfaces/rest");
var Iamqp =  require("./lib/interfaces/amqp");

var config = require("i-config");
var i_log = require("i-log")("i-bet365");
var program;

var programHandler = function(err, data){
	if(err) i_log.error("unhandled error: ",err);
  else programCrawler.parse(data, function(err, parsedObject){
    if(err) i_log.error("unhandled error: ",err);
    else{
      //Store parsed object for 
      program = parsedObject;
      i_log.info("Exit programHandler");
      i_log.debug("Program: ", program);

      var logMessage = [ "",
      "Attention: Program is empty.",
      "Some troubles with http endpoint occurs.",
      "Check that your config.URL_PROGRAM is propertly set or",
      "verify the url:" + config.URL_PROGRAM.host +config.URL_PROGRAM.path +" is currently reacheable from browser."
      ];
      
      if (program.length===0) i_log.error("", logMessage);
      else scheduleNext();
    }
  });
};	

var oddsHandler = function(err, data){
 	if(err) i_log.error("unhandled error: ",err);
  else oddCrawler.parse(data, function(err, parsedObject){
    if(err) i_log.error("unhandled error: ",err);
    else{
       i_log.debug("Odds Handler get parsedObject: ",parsedObject);
     //call the interfaces enabled 
      if(config.interfaces.rest)  {
        i_log.debug("emit on rest interface: ", parsedObject);
        Irest.dispatchMessage(parsedObject);
      }
      if(config.interfaces.amqp) {
        i_log.debug("emit on amqp interface: ", parsedObject);
        Iamqp.dispatchMessage(parsedObject);
      }
      if(!config.interfaces.amqp && config.interfaces.rest)
        i_log.info("oddsHandler: No API interface founded");
 
      i_log.info("Exit oddsHandler.");
      console.log("DEMO bet365 exit");
      // #  for demo purpose. uncomment below for enable loop
      // scheduleNext();
    }
  });
};	

var scheduleNext = function(){
  i_log.info("schedule next step into next ms:", config.time_to_wait);
  if (program.length > 0) {
    //pop up the first item in the queque;
    var pd = program.splice(0, 1);
    //prepare the dynamic options 
    var optitions = {
      host: config.URL_ODDS.host,
      path: config.URL_ODDS.path + encodeURIComponent(pd),
      headers:config.URL_ODDS.headers,
    };

    setTimeout(function() {
      doGet(optitions, oddsHandler);
    }, config.time_to_wait);
  }else {
    //start new round
    setTimeout(function() {
       doGet(optitions, programHandler);
    }, config.time_to_wait);
  }
   
};

var doGet = function( options, callback ){
    var requestProgramHandler = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
          });
        response.on("error", function(err){
          i_log.error("http response unhandled error", err );
        });
        response.on('end', function () {
          callback(null, str);
        });
      };
      
    var proxyProgram = http.request(options,requestProgramHandler);

    proxyProgram.on("error", function(err){
          i_log.error("proxyProgram unhandled error", err );
          i_log.error("http error on ", options);
      });

    proxyProgram.end();
};

//do first call with http client.
i_log.info("i-Bet365 start in environment ", process.env.NODE_ENV);
i_log.info("start service with options ", config.URL_PROGRAM);
doGet(config.URL_PROGRAM, programHandler);

process.on('uncaughtException', function (err) {
	  i_log.error("Unhandled error", err);
	});