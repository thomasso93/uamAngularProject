#Project - Pizzeria

####TODO:

Stage 2 – what’s new?
 - ~~Pizzas in the menu should be grouped by number of ingredients.~~
 - Ingredients customization popup.
 - While adding each pizza to basket user should see a popup, where he can customize given pizza.
 - Each pizza has two sets of ingredients – basic and extra. Removing of basic ingredients does not influence the price. Adding an extra ingredient influence pizza price by increasing it with the cost of ingredient.

Stage 2 – what’s changed?
- Each pizza contains two arrays – one for storing basic ingredient ids and one for extra ingredient ids.
- ~~There is new API for getting list of ingredients, each consisting of its id, display label and price.~~

Stage 3 – what’s new?
- An extra information on the order status screen.
- Real-time updates for the order through web sockets.

Stage 3 – what’s changed?
- Finalize order gets and extra option to extras to the order – sauces and drinks.
- Component must look the same as ingredients customization popup.
- Customers don’t want to loose their unfinished orders when their refresh the tab or close and reopen the page.

####Already done: 

####Views:
* Main screen (menu + basket)
* Contact
* Finalize order
* Order status

####States:
* /#/main
* /#/order
* /#/status/:orderId
* /#/contact

###Main screen
######Basket
* Each entry consists of pizza name, count and price per.
* Summary contains total price.
* User can remove an entry or edit entry count.
* Contains 'Continue' button which will move user to 'Finalize order' screen.
 * Refreshing page should clear the basket.

######Menu
* Gets the list from the server.
* Each entry consists of pizza name, ingredients and price.
* User can add any number pizzas (in any quantity) to the order or instantly order one selected pizza by click of a button.

###Finalize order
* Delivery form (phone number, street name, remarks)
* Form should be validated (phone number and street name are required, remarks are optional)
* Screen shows basket summary in read-only form
* Screen contains 'Back' button which will change actual screen to previous.
* Screen contains 'Order' button which will:
 * sends the POST request to the server,
 * will show error message if request fails,
 * will go to 'Order Status' view with order id from successful request,
 * be disabled if form is not valid.

###Status
* Gets the status info from the server.
* Shows estimate of order (how many minutes till the order arrives).

###Contact
* Gets the contact data from the server.

##What else besides webpage?
* Gulp
 * Building project (injecting js into index.html and coping it to ./build folder) in two variants:
   * gulp build:dev - 'development' - source files are copied to ./build folder
   * gulp build:prod - 'production' - source files are concatenated, minimized and copied to ./build folder
 * jsHint
 * unit tests with code coverage - will be for phase 2
* npm stores dependencies
 * do not push vendors to the repo
* We assume that commands git clone /repo/, npm install, gulp build:prod and node server/server.js will start project on localhost:8080
 * if you changed the process let us know in readme!
 *note:after gulp build:prod please use command gulp index2
* Dedicated repo for project (don't do project in forks of the lesson materials).
* Best practices:
 * angular modules, components, directives
 * mvc, dry, oo,
 * use ui-sref/$state.go instead of href/location.path,
 * promises implement success and fail callbacks
