var pizzaApp = angular.module('pizzaApp', ['ngRoute','ngMap', 'ngDialog','ngCookies', 'ngStorage']);

	 pizzaApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/main', {
                    templateUrl: 'build/views/main.html',
                    controller: 'mainController'
                }).
                when('/contact', {
                    templateUrl: 'build/views/contact.html',
                    controller: 'contactController'
                }).
                when('/order', {
                    templateUrl: 'build/views/order.html',
                    controller: 'orderController'
                }).
                when('/status/:id', {
                    templateUrl: 'build/views/status.html',
                    controller: 'statusController'
                }).
                when('/', {
                    templateUrl: 'build/views/main.html',
                    controller: 'mainController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
	
     pizzaApp.factory('orders', function() {
        var orders = [];
        return orders;
    });

