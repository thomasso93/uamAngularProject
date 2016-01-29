angular.module('pizzaApp').controller('statusController',['$scope', '$http', '$routeParams', 'pizzaService', 'orders', function($scope, $http, $routeParams, pizzaService, orders) {
        
            $scope.orders = orders;
    
            $scope.orderId = $routeParams.id;

            $scope.value = "cos";

    
            $scope.getStatus = function(status){
                return (status);
            };
           

            // if user is running mozilla then use it's built-in WebSocket
            window.WebSocket = window.WebSocket || window.MozWebSocket;

            var connection = new WebSocket('ws://localhost:8080', 'request');

            connection.onopen =  function (event) { // listen to news event raised by the server
                var time = new Date();

                var msg = {
                    type: "Data złożenia zamówienia",
                    date: Date.now()
              };
                connection.send(JSON.stringify(msg)); 


            };

            connection.onerror = function (error) {
                // an error occurred when sending/receiving data
            };

            connection.addEventListener("message", function(e) {
                // The data is simply the message that we're sending back
                var msg = e.data;

                // Append the message
                document.getElementById('log').innerHTML += '<br>' + msg;
            });
       

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



        
        
        $scope.getExtras = function () {
            var index = $scope.orders.length - 1;
            return $scope.orders[index].extras;
        };
    

        $scope.total = $scope.totalPrice();
    
        $scope.extras = $scope.getExtras();    

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
            $scope.value = $scope.getStatus($scope.status.status)
            $scope.getExtrasCost(); 
		});
    
        $scope.changePrice = function (price) {
            var total = parseFloat($scope.total);
            total += price;
            $scope.total = total.toFixed(2);
        };
    
        
    
        
        
 }]);