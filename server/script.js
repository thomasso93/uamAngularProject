 var pizzaApp = angular.module('pizzaApp', []);

    pizzaApp.controller('mainController', function($scope) {
        
        $scope.message = 'Hello PizzaApp!';
    });