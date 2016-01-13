angular.module('pizzaApp').controller('orderController',['$scope', '$http','orders', '$location','pizzaService', function($scope, $http, orders, $location, pizzaService) {
        
        $scope.orders = orders;

        $scope.sendItNow = function(){     
        pizzaService.sendOrder($scope.orders).success(function (data, status) {
                    $location.path('/status/'+data.id);
                }).error(function (data, status) {
                    $scope.orderId = 'Request failed';
                    $scope.orderStatus = status;
                }); 
        };  
        $scope.doTheBack = function() {
          window.history.back();
        };

        $scope.isInvalid = function(field){
            return $scope.myForm[field].$invalid && $scope.myForm[field].$dirty;
        };
         
    }]);