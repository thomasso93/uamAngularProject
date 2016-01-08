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
                otherwise({
                    redirectTo: '/'
                });
        }]);


    pizzaApp.controller('mainController', function($scope, $http) {
        
        $scope.orders = [];
        
        $scope.getMenu = function () {
            $http.get('/menu').success(function (res) {
                $scope.menuRes = res;
            });
            
        };
        
        $scope.addPizzaToBasket = function (pizza) {        
            var order;
            
            order.name = pizza.name;
            order.price = pizza.price;
            order.quantity = pizza.quantity;
    
            orders.append(order);
        }
         
    });

    pizzaApp.controller('contactController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/contact').success(function (res) {
                $scope.contactRes = res;
            });
        };
         
    });
