angular.module('pizzaApp').controller('mainController',['$scope', '$http', 'orders','$location', 'pizzaService', 'ngDialog', function($scope, $http, orders, $location, pizzaService, ngDialog) {
        
        $scope.clickToOpen = function () {
            ngDialog.open({ 
                template: popupTemplate,
                plain: true,
//                data: $scope.aaa
                scope: $scope
            });
        };
    
    
        pizzaService.getMenu().then(function(data) {
            $scope.menuRes = data.data;
            $scope.addIngredientsLength();
            $scope.groupBy( 'ingredientsNumber' )
        });
    
        $scope.addIngredientsLength = function () {
            var len = $scope.menuRes.length;
            for (var i=0; i<len; i++) {
                pizza = $scope.menuRes[i];
                pizza.ingredientsNumber = pizza.ingredients.length;
            }
        };
    
        function sortOn(collection, name) {
            collection.sort(
                function(a, b) {
                    if ( a[name] <= b[name] ) {
                        return(-1);
                    }
                    return(1);
                }
            );
        }    
    
        $scope.groupBy = function(attribute) {
            $scope.groups = [];
            
            sortOn( $scope.menuRes, attribute );
            var groupValue = "_INVALID_GROUP_VALUE_";

            for (var i=0; i<$scope.menuRes.length; i++) {
                var pizza = $scope.menuRes[i];
                if (pizza[attribute] !== groupValue ) {
                    var group = {
                        label: pizza[attribute],
                        pizzas: []
                    };
                    groupValue = group.label;
                    $scope.groups.push(group);
                }
                group.pizzas.push(pizza);
            }
        };
    
        $scope.orders = orders;
    
        $scope.numberOfIngredients = function (pizza) {
            return pizza.ingredients.length;
        };
    
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
    
        popupTemplate ='<div> \
                    <p>Personalizacja pizzy</p>\
                    <p> price : {{totalPrice()}}</p>\
                </div>'
         
    }]);