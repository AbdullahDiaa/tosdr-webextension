$(document).ready(function(){
	var serviceName = window.location.hash.substr(1);

	var RATING_TEXT = {
	  0: "Write an email to tosdr@googlegroups.com with a link to the terms, a small quote from the terms about the point you‘re making and let us know if you think it‘s a good or a bad point. It‘s better to do one email thread by topic, rather than one email per service. For more details, read on!",
	  "false":"We haven't sufficiently reviewed the terms yet. Please contribute to our group: tosdr@googlegroups.com",
	  "A":"The terms of service treat you fairly, respect your rights and follows the best practices.",
	  "B":"The terms of services are fair towards the user but they could be improved.",
	  "C":"The terms of service are okay but some issues need your consideration.",
	  "D":"The terms of service are very uneven or there are some important issues that need your attention.",
	  "E":"The terms of service raise very serious concerns."
	};
	
	var service = JSON.parse(localStorage.getItem(serviceName));
	if(service){
		var class_code = (service.tosdr.rated)? service.tosdr.rated : false;
		var renderService = {
			'id'	: serviceName,
			'class'	: (class_code) ? "Class " + class_code : "No Class Yet",
			'classCode' : class_code,
			'ratingText' : RATING_TEXT[class_code],
			'links'	: service.links
		}
	}else{
		var renderService = {
			'class'	: "Not rated, yet",
			'ratingText' : RATING_TEXT[0]
		}
	}
	
	var tmpl = $.templates("#template");
	var rendered = tmpl.render(renderService);
	$('#target').html(rendered);
});