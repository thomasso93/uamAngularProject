angular.module('pizzaApp').service('pizzaService', pizzaService);

 function pizzaService($http){
 	return {
      sendOrder: function(cos) {
        return $http({
              method  : 'POST',
              url     : '/order',
              data    : cos, 
              headers : {'Content-Type': 'application/json'} 
             });
      },
      getOrderStatus: function(orderId) {
        return $http.get('http://localhost:8080/order/' + orderId);
      },
      getMenu: function() {
        return $http.get('http://localhost:8080/menu/');
      },
      getContact: function() {
        return $http.get('http://localhost:8080/contact/');
      },
      getIngredients: function() {
          return $http.get('http://localhost:8080/ingredients/');
      },  
      getExtras: function() {
          return $http.get('http://localhost:8080/extras/');
      }    
    };
}