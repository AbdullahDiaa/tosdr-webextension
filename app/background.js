'use strict';

/*global chrome:false */

var services = [];

// Store service in localStorage
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

// Extract list of services
$.ajax('https://tosdr.org/index/services.json')
.done(function(servicesIndex) {
	for (var serviceName in servicesIndex) {
		storeService(serviceName, servicesIndex[serviceName]);
	}
})
.fail(function() {
	console.error( "error" );
});

// Get service from localStorage
function getService(tab) {
	var matchingServices = services.filter(function (service) {
		return service.urlRegExp.exec(tab.url);
	});
	return matchingServices.length > 0 ? matchingServices[0] : null;
}

// Get service icon
function getIconForService(service) {
	var rated = service.tosdr.rated;
	var imageName = rated ? rated.toLowerCase() : 'false';
	return '/images/class/' + imageName + '.png';
}

function checkNotification(service) {

	var last = localStorage.getItem('notification/' + service.name + '/last/update');
	var lastRate = localStorage.getItem('notification/' + service.name + '/last/rate');
	var shouldShow = false;

	if (!service.tosdr.rated) { return; }

	var rate = service.tosdr.rated;
	console.log(rate);
	if (rate === 'D' || rate === 'E') {

		if (last) {
			var lastModified = parseInt(Date.parse(last));
			log(lastModified);
			var daysSinceLast = (new Date().getTime() - lastModified) / (1000 * 60 * 60 * 24);
			log(daysSinceLast);

			if (daysSinceLast > 7) {
				shouldShow = true;
			}
		} else {
			shouldShow = true;
		}

	} else if (lastRate === 'D' || lastRate === 'E') {
		shouldShow = true;
	}
	
	if (shouldShow) {

		localStorage.setItem('notification/' + service.name + '/last/update', new Date().toDateString());
		localStorage.setItem('notification/' + service.name + '/last/rate', rate);

		var opt = {
			type: "basic",
			title: service.id,
			message: RATING_TEXT[rate],
			iconUrl: './images/icon-128.png'
		}

		var notification = chrome.notifications.create('tosdr-notify', opt, function(event){
			console.log(event)
		});

		chrome.notifications.onButtonClicked.addListener(function(){
			chrome.tabs.create({
				url: 'http://tosdr.org/#' + service.id
			});
		});

	}

}

function onUrlChanged(tabId, changeInfo, tab) {
	var service = getService(tab);
	
	if (service) {		
		// Update icon with service rating
		chrome.browserAction.setIcon({
			tabId: tabId,
			path: getIconForService(service)
		});
		
		// Update popup data using service.id
		chrome.browserAction.setPopup({
			tabId: tabId,
			popup: 'popup/popup.html#' + service.id
		});
		
		// Check for notification
		checkNotification(service);
	}
}

chrome.tabs.onUpdated.addListener(onUrlChanged);