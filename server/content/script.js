var pizzaApp = angular.module('pizzaApp', ['ngRoute']);

    pizzaApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/main', {
                    templateUrl: 'pages/main.html',
                    controller: 'mainController'
                }).
                when('/contact', {
                    templateUrl: 'pages/contact.html',
                    controller: 'contactController'
                }).
                when('/order', {
                    templateUrl: 'pages/order.html',
                    controller: 'orderController'
                }).
                when('/status', {
                    templateUrl: 'pages/status.html',
                    controller: 'statusController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
        
    pizzaApp.controller('mainController', function($scope, $http) {
        
        $scope.orders = [];
        
        $scope.totalPrice = function () {
            var total = 0;
      
            for (var i=0; i < $scope.orders.length; i++) {
                var price = $scope.orders[i].price;
                total += price; 
            }
            return total;
        }; 
        
        $scope.getMenu = function () {
            $http.get('/menu').success(function (res) {
                $scope.menuRes = res;
            });
            
        };
        
        $scope.addPizzaToBasket = function (pizza) {        
            var order = {};
            
            order.name = pizza.name;
            order.price = pizza.price * pizza.quantity;
            order.quantity = pizza.quantity;
    
            $scope.orders.push(order);
        }
         
    });

    pizzaApp.controller('contactController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/contact').success(function (res) {
                $scope.contactRes = res;
            });
        };
         
    });

    pizzaApp.controller('orderController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/order').success(function (res) {
                $scope.orderRes = res;
            });
        };
         
    });

    pizzaApp.controller('statusController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/status').success(function (res) {
                $scope.statusRes = res;
            });
        };
         
    });