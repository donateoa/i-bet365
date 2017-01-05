var config = require("i-config");
var i_log = require("i-log")("REST_INTERFACE");

var dispatchMessage = function(data, callback){
    i_log.debug("dispatch data", data);
};

module.exports ={
    dispatchMessage: dispatchMessage
};