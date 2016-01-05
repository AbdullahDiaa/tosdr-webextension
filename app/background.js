'use strict';

/*global chrome:false */

var services = [];

function createRegExpForServiceUrl(serviceUrl) {
	if (/^http/.exec(serviceUrl)) {
		return new RegExp(serviceUrl + '.*');
	} else {
		return new RegExp('https?://[^:/]*\\b' + serviceUrl + '.*');
	}
}

function storeService(serviceName, serviceIndexData) {
	$.ajax('https://tosdr.org/services/' + serviceName + '.json')
	.done(function(service) {
		if (!service.url) {
			log(serviceName+' has no service url');
			return;
		}
		service.urlRegExp = createRegExpForServiceUrl(service.url);
		service.points = serviceIndexData.points;
		service.links = serviceIndexData.links;
		if (!service.tosdr) {
			service.tosdr = { rated: false };
		}
		services.push(service);
		localStorage.setItem(serviceName, JSON.stringify(service));
		log(localStorage);
	})
	.fail(function() {
		log( "Couldn't load service:" + serviceName );
	});
}

$.ajax('https://tosdr.org/index/services.json')
.done(function(servicesIndex) {
	for (var serviceName in servicesIndex) {
		storeService(serviceName, servicesIndex[serviceName]);
	}
})
.fail(function() {
	log( "error" );
});

function onUrlChanged(tabId, changeInfo, tab) {
	
}

chrome.tabs.onUpdated.addListener(onUrlChanged);