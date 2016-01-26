angular.module('pizzaApp').controller('orderController',['$scope', '$http','orders', '$location','pizzaService', 'ngDialog', function($scope, $http, orders, $location, pizzaService, ngDialog) {
        
        $scope.orders = orders;
    
        pizzaService.getExtras().then(function(data) {
           $scope.extras = data.data;
        });
    
        $scope.orderedExtras = [];
    
        $scope.addExtra = function (extra) {
            console.log(extra);
            $scope.orderedExtras.push(extra);
            console.log($scope.orderedExtras);
        };
    
        $scope.deleteExtra = function (extra) {
            var index = $scope.orderedExtras.indexOf(extra);
            $scope.orderedExtras.splice(index, 1);
        }

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
    
        $scope.openPopup = function () {
            var dialog = ngDialog.open({ 
                template: '../../views/orderPopup.html',
                scope: $scope
            });
            
            dialog.closePromise.then( function () {
            });
        };
         
    }]);