var pizzaApp = angular.module('pizzaApp', ['ngRoute','ngMap', 'ngDialog']);

	 pizzaApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/main', {
                    templateUrl: '/views/main.html',
                    controller: 'mainController'
                }).
                when('/contact', {
                    templateUrl: '/views/contact.html',
                    controller: 'contactController'
                }).
                when('/order', {
                    templateUrl: '/views/order.html',
                    controller: 'orderController'
                }).
                when('/status/:id', {
                    templateUrl: '/views/status.html',
                    controller: 'statusController'
                }).
                when('/', {
                    templateUrl: '/views/main.html',
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

