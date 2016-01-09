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
                when('/', {
                    templateUrl: 'pages/main.html',
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

        
    pizzaApp.controller('mainController', function($scope, $http, orders, $location) {
        
        $scope.orders = orders;
        
        $scope.totalPrice = function () {
            var total = 0;
      
            for (var i=0; i < $scope.orders.length; i++) {
                var price = $scope.orders[i].price;
                total += price; 
            }
            return total.toFixed(2);
        }; 
        
        $scope.getMenu = function () {
            $http.get('/menu').success(function (res) {
                $scope.menuRes = res;
            });
            
        };
        
        $scope.addPizzaToBasket = function (pizza) {        
            var order = {};
        
            order.name = pizza.name;
           
            if (typeof pizza.quantity === 'undefined') {
                order.quantity = 1;
            } 
            else {
                order.quantity = pizza.quantity;
            }
            
            order.price = pizza.price * order.quantity;
    
            if (order.price != 0) {
                $scope.orders.push(order);
            }

        };

         $scope.deletePizzaFromBasket = function (order) {  
            var index = 0;         
 
            for (var i = 0; i < $scope.orders.length; i++){
                if (order.name === $scope.orders[i].name ) {
                    index = i;
                    break;
                }    
              }  
    
            $scope.orders.splice(index, 1);
        };

         $scope.finalizeOrder = function () {
            $location.path("/order");
        };

         
    });

    pizzaApp.controller('contactController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/contact').success(function (res) {
                $scope.contactRes = res;
            });
        };
         
    });

    pizzaApp.controller('orderController', function($scope, $http, orders) {
        
        $scope.orders = orders;
        
        $scope.getContact = function () {
            $http.get('/order').success(function (res) {
                $scope.orderRes = res;
            });
        };
        
        $scope.doTheBack = function() {
          window.history.back();
        };

    });

    pizzaApp.controller('statusController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/status').success(function (res) {
                $scope.statusRes = res;
            });
        };
         
    });
