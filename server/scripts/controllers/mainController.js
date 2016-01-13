angular.module('pizzaApp').controller('mainController',['$scope', '$http', 'orders','$location', 'pizzaService', function($scope, $http, orders, $location, pizzaService) {
        
        pizzaService.getMenu().then(function(data) {
            $scope.menuRes = data.data;
        });
        
        $scope.orders = orders;
    
        $scope.totalPrice = function () {
            var total = 0;
      
            for (var i=0; i < $scope.orders.length; i++) {
                var price = $scope.orders[i].price;
                total += price; 
            }
            return total.toFixed(2);
        };
    
        $scope.updatePrice = function (order) {
            var price = 0;
            for (var i=0; i< $scope.menuRes.length; i++) {
                if ($scope.menuRes[i].id === order.id) {
                    price = $scope.menuRes[i].price;
                }
            }
            
            for (var i=0; i < $scope.orders.length; i++) {
                if ($scope.orders[i].id === order.id) {
                    $scope.orders[i].price = price * $scope.orders[i].quantity; 
                }
            }
        };
        
        $scope.refresh = function (order) {
            $scope.updatePrice(order);
            $scope.totalPrice();
        };
     
        $scope.addPizzaToBasket = function (pizza) {        
            var order = {};
        
            order.name = pizza.name;
           
            if (typeof pizza.quantity === 'undefined') {
                order.quantity = 1;
            } 
            else {
                order.quantity = parseFloat(pizza.quantity);
            }
            
            order.price = parseFloat(pizza.price * order.quantity);
            
            order.id = pizza.id;
    
            if (order.price != 0) {
                $scope.orders.push(order);
            }

        };

         $scope.deletePizzaFromBasket = function (order) {  
            var index = 0;         
 
            for (var i = 0; i < $scope.orders.length; i++){
                if ((order.name === $scope.orders[i].name) && (order.price === $scope.orders[i].price) ) {
                    index = i;
                    break;
                }    
              }  
    
            $scope.orders.splice(index, 1);
             
        };

         $scope.finalizeOrder = function () {
            $location.path("/order");
        };

         
    }]);