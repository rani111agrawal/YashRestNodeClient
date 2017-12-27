'use strict'
const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
 
const server = new Hapi.Server();
 
server.connection({
    host: '127.0.0.1',
    port: 3000
});
 

server.register(Vision, (err) => {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
    });
});
 
server.start((err) => {
    if (err) {
        throw err;
    }
 
    console.log('Server running at: ${server.info.uri}');
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        Request.get('http://localhost:8080/myShop/product/', function (error, response, body) {
            if (error) {
                throw error;
            }
			console.log('line 42- inside product/'+body);
            const data = JSON.parse(body);
			//console.log("#### intent.data: "+data["productId"]);
			reply.view('index', { result: data });
        });
    }
});

server.route({
    method: 'GET',
    path: '/product/{productId}',
    handler: function (request, reply) {
        const productId = encodeURIComponent(request.params.id);
 
        Request.get('http://localhost:8080/myShop/product/${productId}', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const result = JSON.parse(body);
 
            });
 
                reply.view('product', { result: result});
            }
        });
		
	Handlebars.registerHelper('productId', function (productUrl) {
    //return teamUrl.slice(38);
});
    

 
 



