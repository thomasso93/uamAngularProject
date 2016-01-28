angular.module('pizzaApp').controller('statusController',['$scope', '$http', '$routeParams', 'pizzaService', 'orders', function($scope, $http, $routeParams, pizzaService, orders) {
        
        
            // if user is running mozilla then use it's built-in WebSocket
            window.WebSocket = window.WebSocket || window.MozWebSocket;

            var connection = new WebSocket('ws://localhost:8080');

            connection.onopen =  function (event) { // listen to news event raised by the server
                console.log(event );
                connection.send('my other event', { my:event  }); 
            };

            connection.onerror = function (error) {
                // an error occurred when sending/receiving data
            };

            connection.onmessage = function (message) {
                // try to decode json (I assume that each message from server is json)

                try {
                    var json = JSON.parse(message.data);


                } catch (e) {
                    console.log('This doesn\'t look like a valid JSON: ', message.data);
                    return;
                }
                // handle incoming message
            };
       


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