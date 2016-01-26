angular.module('pizzaApp').controller('statusController',['$scope', '$http', '$routeParams', 'pizzaService', 'orders', function($scope, $http, $routeParams, pizzaService, orders) {
        
        $scope.orders = orders;
    
        $scope.orderId = $routeParams.id;
    
        $scope.getExtras = function () {
            var index = $scope.orders.length - 1;
            return $scope.orders[index].extras;
        };
    
        $scope.getExtrasCost = function () {
            var index = $scope.orders.length - 1;
            var length = $scope.orders[index].extras.length;
            
            for (var i=0; i<length; i++) {
                var extra = $scope.orders[index].extras[i];
                $scope.changePrice(extra.price);
            }
        };
        
         pizzaService.getOrderStatus($scope.orderId).then(function(data) {
		    $scope.status = data.data;
            $scope.getExtrasCost(); 
		});
    
        $scope.changePrice = function (price) {
            var total = parseFloat($scope.total);
            total += price;
            $scope.total = total.toFixed(2);
        };
    
        $scope.total = $scope.totalPrice();
    
        $scope.extras = $scope.getExtras();    
    
        
        
 }]);