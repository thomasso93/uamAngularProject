angular.module('pizzaApp').controller('contactController',['$scope', '$http', 'pizzaService', function($scope, $http, pizzaService) {
        pizzaService.getContact().then(function(data) {
		    $scope.contactRes = data.data;
		});
 }]);