var ebay = angular.module('ebay', ['ui.router']);

ebay.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$stateProvider.state('ebay', {	
		url : '/',
		views: {
			'header': {
				templateUrl : 'templates/header.html',
			},
			'footer': {
				templateUrl : 'templates/footer.html',
			},
			'login': {
				templateUrl : 'templates/login.html',
			}
		}
	})
	$urlRouterProvider.otherwise('/');
});