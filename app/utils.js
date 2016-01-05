"use strict";

const debug = true;
const tosdr_log = "tosdr: ";

//Overrides console method to be able to filer tosdr logs
var console = (function(originalConsole){
    return {
        log: function(){
		    var args = Array.slice(arguments);
		    args.unshift(tosdr_log);
			debug && originalConsole.log && originalConsole.log.apply(originalConsole, args);
        },
        info: function () {
		    var args = Array.slice(arguments);
		    args.unshift(tosdr_log);
			debug && originalConsole.info && originalConsole.info.apply(originalConsole, args);
        },
        warn: function () {
		    var args = Array.slice(arguments);
		    args.unshift(tosdr_log);
			debug && originalConsole.warn && originalConsole.warn.apply(originalConsole, args);
        },
        error: function () {
		    var args = Array.slice(arguments);
		    args.unshift(tosdr_log);
			debug && originalConsole.error && originalConsole.error.apply(originalConsole, args);
        }
    };
}(console));

//This function creates regex to match the url of tabs:
//serviceURL: 500px.com
//creatred Regex: /https?:\/\/[^:/]*\b500px.com.*/
function createRegExpForServiceUrl(serviceUrl) {
	if (/^http/.exec(serviceUrl)) {
		return new RegExp(serviceUrl + '.*');
	} else {
		return new RegExp('https?://[^:/]*\\b' + serviceUrl + '.*');
	}
}