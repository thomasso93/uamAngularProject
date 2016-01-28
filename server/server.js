/* globals require, setTimeout, setInterval, console, __dirname */

/** API:
 *  GET /contact - returns object
 *  GET /menu - returns array of objects, each containing id, name, ingredients and price
 *  POST /order - post order in form of array of object containing id (of the pizza) and quantity.
 *                Invalid id or quantity <= 0 will return 500 error
 *  GET /order/:id - returns object with order, ordered (time when order was processed) and estimated (time of arrival)
 */
var express = require('express'),
    webSocketServer = require('websocket').server,
    bodyParser = require('body-parser'),
    _ = require('lodash'),
    menu = require('./menu');
    ingredients = require('./ingredients');
    extras = require('./extras');

var app = express(),
    orders = {},
    i = 0;

var httpServer, wsServer, wsConnections = [];

app.use(express.static(__dirname + '/../build/'));
app.use(express.static(__dirname + '/scripts'))
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json());


app.get('/', function (req, res) {
    setTimeout(function () {
        res.sendFile(__dirname + '/index.html');
    }, _.random(100, 1500));
});


app.get('/ingredients', function (req, res) {
    setTimeout(function () {
        res.json(ingredients);
    }, _.random(100, 1500));
});

app.get('/extras', function (req, res) {
    setTimeout(function () {
        res.json(extras);
    }, _.random(100, 1500));
});

app.get('/contact', function (req, res) {
    setTimeout(function () {
        res.json({
            name: 'Pizzeria',
            address: {
                street: 'Św. Marcin 1',
                city: 'Poznań'
            },
            phone: '123-456-789',
            hours: '12:00 - 22:00'
        });
    }, _.random(100, 1500));
});

app.get('/menu', function (req, res) {
    setTimeout(function () {
        res.json(menu);
    }, _.random(100, 1500));
});

/**
 * Checks if pizza in each position exists and its quantity is greater than 0
 * @param   {object} order Requests body
 * @returns {boolean}      Is order valid
 */
function checkIsOrderValid(order) {
    var isArray = order instanceof Array,
        areItemsValid = _.every(order, function (position) {
            var isQuantityValid = _.isNumber(position.quantity) && position.quantity > 0,
                isValidPizza = _.isNumber(position.id) && !_.isEmpty(_.find(menu, {
                    id: position.id
                }));
            return isQuantityValid && isValidPizza;
        });

    return isArray && areItemsValid;
    
}


/**
    * Update all connected WS clients
    * @param {number} id
    * @param {object} order
*/
function updateClients(id, order) {
    _.forEach(wsConnections, function(connection) {
        connection.sendUTF(JSON.stringify({
            id: id,
            order: order
        }));
    });
 }

app.post('/order', function (req, res) {
    setTimeout(function () {
        console.log('Order recived', req.body);
        if (checkIsOrderValid(req.body)) {
            var now = Date.now();
            
            orders[i] = {
                order: req.body.map(function (position) {
                    return {
                        pizza: _.find(menu, {
                            id: position.id
                        }),
                        quantity: position.quantity,
                        extras: position.extras
                    };
                }),
                orderInfo: req.body.orderInfo,
                ordered: new Date(now),
                estimated: new Date(now + _.random(15*60000, 90*60000)),
                status: 0
            };

            res.json({
                id: i
            });

            i++;
        } else {
            res.status(500).send('Invalid order.');
            console.error('Invalid order!');
        }
    }, _.random(100, 1500));
});

app.get('/order/:id', function (req, res) {
    setTimeout(function () {
        if (orders[req.params.id] === undefined) {
            res.status(404).send('Order does not exist.');
        } else {
            res.json(orders[req.params.id]);
        }
    }, _.random(100, 1500));
});

 setInterval(function () {
     _.forEach(orders, function (order, id) {
        var diff = order.estimated - order.ordered;

        if (order.status < 1 && order.ordered * 1 + diff * 0.2 <= Date.now()) {
            order.status = 1;
            console.log('Order ' + id + ' changed status to 1');
            updateClients(id, order);
        }
        if (order.status < 2 && order.ordered * 1 + diff * 0.5 <= Date.now()) {
            order.status = 2;
            console.log('Order ' + id + ' changed status to 2');
            updateClients(id, order);
        }
        if (order.status < 3 && order.estimated <= Date.now()) {
            order.status = 3;
            console.log('Order ' + id + ' changed status to 3');
            updateClients(id, order);
         }
     });
}, 500);

httpServer = app.listen(8080, function () {
     console.log('Server running on port 8080.');
 });

wsServer = new webSocketServer({
   httpServer: httpServer
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var index = wsConnections.push(connection);

    console.log('WebSocket Client connected on ' + new Date());

    connection.on('message', function(message) {

    // The string message that was sent to us
    var msgString = message.utf8Data;

    // Loop through all clients
   
     connection.sendUTF(msgString);
  

    });

    connection.on('close', function(con) {
        wsConnections.slice(index, 1);
    });
});
