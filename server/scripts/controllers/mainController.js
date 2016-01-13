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
    
        $scope.findOrderPrize = function (order) {
            var price = 0;
            for (var i=0; i< $scope.menuRes.length; i++) {
                if ($scope.menuRes[i].id === order.id) {
                    price = $scope.menuRes[i].price;
                    break;
                }
            }
            return price;
        };
    
        $scope.updatePrice = function (order) {
            var price = $scope.findOrderPrize(order);
            
            for (var i=0; i < $scope.orders.length; i++) {
                if ($scope.orders[i].id === order.id) {
                    var newPrice =  price * $scope.orders[i].quantity; 
                    if (newPrice > 0)                    
                        $scope.orders[i].price = newPrice;
                    else 
                        $scope.deletePizzaFromBasket(order);
                }
            }
        };
    
        $scope.findOrder = function (order) {
            var orders = $scope.orders;
            var index = -1;
            for (var i=0; i < orders.length; i++) {
                if ( (orders[i].id === order.id) && (orders[i].name == order.name) ) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    
        $scope.addNewOrder = function (order) {
            if (order.price != 0) {
                var index = $scope.findOrder(order); 
                if (index != -1) {
                    $scope.orders[index].quantity += order.quantity;
                    $scope.updatePrice($scope.orders[index]);
                }
                else
                    $scope.orders.push(order);
            }
        };
     
        $scope.addPizzaToBasket = function (pizza) {        
            var order = {};
        
            order.name = pizza.name;
            order.id = pizza.id;
            order.quantity = (typeof pizza.quantity === 'undefined') ? 1 : parseFloat(pizza.quantity);
            order.price = parseFloat(pizza.price * order.quantity);
            
            $scope.addNewOrder(order);
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