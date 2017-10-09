angular.module('appManager')
	.constant('config', {
		url: 'http://54.255.179.165:8080', //54.255.179.165
    vicare: 'http://vicare.vn',
    api: {
		  question: '/api/questions/',
      calendar: '/api/calendars/',
      professional: '/api/v1/professional/',
      order: '/api/orders/',
      searchPro: '/api/professionals/',
      report: '/api/reports/',
      setting: '/api/settings/',
      reportChat: '/api/report-daily/',
    }
	});
