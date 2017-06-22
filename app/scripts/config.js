angular.module('appManager')
	.constant('config', {
		url: 'http://54.255.225.82:8080', //54.255.225.82
    vicare: 'http://vicare.vn',
    api: {
		  question: '/api/questions/',
      calendar: '/api/calendars/',
      professional: '/api/v1/professional/',
      order: '/api/orders/',
      searchPro: '/api/professionals/'
    }
	});
