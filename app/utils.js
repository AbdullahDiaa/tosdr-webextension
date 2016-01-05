"use strict";

const debug = true;

//tosdr Logger
function log(){
	if(debug){
	    var args = Array.slice(arguments);
	    args.unshift("tosdr: ");
	    console.log.apply(console, args);
	}
}
