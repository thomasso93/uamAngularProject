var pizzaApp = angular.module('pizzaApp', ['ngRoute']);

    pizzaApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/contact', {
                    templateUrl: 'pages/contact.html',
                    controller: 'mainController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);


    pizzaApp.controller('mainController', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/contact').success(function (res) {
                $scope.contactRes = res;
            });
        };
        
        $scope.getMenu = function () {
            $http.get('/menu').success(function (res) {
                $scope.menuRes = res;
            });
            
        };
         
    });
