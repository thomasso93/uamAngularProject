var pizzaApp = angular.module('pizzaApp', []);

    pizzaApp.controller('mainController', function($scope, $http) {
        
        $scope.getContact = function () {
                $http.get('/contact').success(function (res) {
                    $scope.contactRes = res;
                });
            };
    });