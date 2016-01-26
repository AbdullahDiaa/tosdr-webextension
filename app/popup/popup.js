function isEmpty(map) {
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

$(document).ready(function(){
	var serviceName = window.location.hash.substr(1);
	var service = localStorage.getItem(serviceName);
	
	var NOT_RATED_TEXT = "We haven't sufficiently reviewed the terms yet. Please contribute to our group: ";
	var RATING_TEXT = {
	  0:NOT_RATED_TEXT,
	  "false":NOT_RATED_TEXT,
	  "A":"The terms of service treat you fairly, respect your rights and follows the best practices.",
	  "B":"The terms of services are fair towards the user but they could be improved.",
	  "C":"The terms of service are okay but some issues need your consideration.",
	  "D":"The terms of service are very uneven or there are some important issues that need your attention.",
	  "E":"The terms of service raise very serious concerns."
	};
	
	$('#page').empty();
	
	// If serviceName is undefined
	if(!serviceName){
		// NOT-RATED-YET
	    //Modal-header
	    $('#page').append(
	      $("<div>", { class: 'modal-header' })
	      .append($("<h4>", {class : 'modal-title'})
	        .append($("<a>", { href: 'https://tosdr.org', target: '_blank' })
	          .append($("<img>", { src: '../images/tosdr-logo-32.png'}))
	        )
	      )
	    );
		
	    //Modal-body
	    $('#page').append($("<div>", {class : 'modal-body'})
	      .append($("<div>", {class : 'tosdr-rating' })
	      .append($("<h4>", { text : 'Not rated, yet.'}))
	      .append($("<p>",{ text : 'Write an email to tosdr@googlegroups.com with a link to the terms, a small quote from the terms about the point you‘re making and let us know if you think it‘s a good or a bad point. It‘s better to do one email thread by topic, rather than one email per service. For more details, read on!' , class : 'lbldesc'})))
	    );
	}else{
		
	  //Modal-header
	    $('#page').append(
	      $("<div>", { class: 'modal-header' })
	      .append($("<h4>", {class : 'modal-title'})
	        .append($("<a>", { href: 'https://tosdr.org/#' + serviceName , target: '_blank' })
	          .append($("<img>", { src: '../images/tosdr-logo-32.png'}))
	        )
	      )
	    );
		
		//Modal-body
		$('#page').append($("<div>", {class : 'modal-body'})
		  .append($("<div>", {class : 'tosdr-rating' })
		  .append($("<label>", { class : 'label ' + service.class , text : (service.class ? 'Class ' + service.class : 'No Class Yet')}))
		  .append($("<p>",{ text : RATING_TEXT[service.class] , class : 'lbldesc'})))
		);
		
		//Links
	    if (isEmpty(service.links)) {
	       $('.modal-body').append($("<section>")
	         .append($("<a>", { href:'https://tosdr.org/get-involved.html' , target: '_blank' , class: 'btn'})
	         .append($("<i>", {class: 'icon  icon-list-alt'}))
	         .append("Get Involved"))
	       );
	     } else {
	       $('.modal-body').append($("<section>")
	       .append($("<h4>", { text : 'Read the Terms'}))
	       .append($("<ul>", {class: 'tosback2'})));

	       for (var i in service.links) {
	         $('.tosback2').append($("<li>")
	         .append($("<a>", { href:service.links[i].url , target: '_blank' , text :(service.links[i].name ? service.links[i].name : i)})));
	       }
	     }
		 
	}
	
});