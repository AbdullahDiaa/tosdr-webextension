'use strict';

/*global chrome:false */

var services = [];

function storeService(serviceName, serviceIndexData) {
	$.ajax('https://tosdr.org/services/' + serviceName + '.json')
	.done(function(service) {
		if (!service.url) {
			console.warn(serviceName+' has no service url.');
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
		console.info(localStorage.getItem(serviceName));
	})
	.fail(function() {
		console.error( "Couldn't load service:" + serviceName );
	});
}

$.ajax('https://tosdr.org/index/services.json')
.done(function(servicesIndex) {
	for (var serviceName in servicesIndex) {
		storeService(serviceName, servicesIndex[serviceName]);
	}
})
.fail(function() {
	console.error( "error" );
});

function onUrlChanged(tabId, changeInfo, tab) {
	
}

chrome.tabs.onUpdated.addListener(onUrlChanged);