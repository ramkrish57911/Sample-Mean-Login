angular.module('ems', ['ngRoute','ng-file-model'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/',{
		
		templateUrl:'login.html',
		controller:'loginController'
		})
		
		 .when('/managePublisherNew',{
		templateUrl:'managePublisherNew.html',
		
		}) 
		 
		 .when('/createPublisher',{
		templateUrl:'createPublisher.html',
		controller:'RegController'
		})   
	 
	.otherwise({
       redirectTo: '/'
    });
	
}]);