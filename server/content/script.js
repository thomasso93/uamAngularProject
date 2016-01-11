var pizzaApp = angular.module('pizzaApp', ['ngRoute','ngMap']);

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
                when('/order/:id', {
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
                order.quantity = parseFloat(pizza.quantity);
            }
            
            order.price = parseFloat(pizza.price * order.quantity);
            
            order.id = pizza.id;
    
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

    pizzaApp.controller('orderController', function($scope, $http, orders, $location) {
        
        $scope.orders = orders;
        
        $scope.sendOrder = function () {
            $http({
              method  : 'POST',
              url     : '/order',
              data    : $scope.orders, 
              headers : {'Content-Type': 'application/json'} 
             }).success(function (data, status) {
                    $location.path('/order/'+data.id);
                }).error(function (data, status) {
                    $scope.orderId = 'Request failed';
                    $scope.orderStatus = status;
                });
            
            
        };
                
        $scope.getContact = function () {
            $http.get('/order').success(function (res) {
                $scope.orderRes = res;
            });
        };
        
        $scope.doTheBack = function() {
          window.history.back();
        };

        $scope.isInvalid = function(field){
            return $scope.myForm[field].$invalid && $scope.myForm[field].$dirty;
        };
        
    });

    pizzaApp.controller('statusController', function($scope, $http, $routeParams) {
        
        $scope.orderId = $routeParams.id;
        
        $scope.getOrderStatus = function () {
            $http.get('/order/' + $scope.orderId).success(function (res) {
                $scope.status = res;
            });     
        };
                     
    });