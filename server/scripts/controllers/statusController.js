angular.module('pizzaApp').controller('statusController',['$scope', '$http', '$routeParams', 'pizzaService', function($scope, $http, $routeParams, pizzaService) {
        
        $scope.orderId = $routeParams.id;
        
         pizzaService.getOrderStatus($scope.orderId).then(function(data) {
		    $scope.status = data.data;
		});
         
 }]);