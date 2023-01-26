//we need a http server
const http = require('http');
//I like to modularize my code... so put the routes in their own file
const routes = require('./routes.js');

const server = http.createServer((request, response) => {
    let path = "./views/";
    // console.log(request.url, request.method);
    // console.log(request);
    switch(request.url) {
        case '/':
            path += "index.html";
            response.statusCode = 200;
            routes.indexPage(path, request.url, response);
            break;
        case '/about':
            path += "about.html";
            response.statusCode = 200;
            routes.aboutPage(path, request.url, response);
            break;
        case '/contact':
            path += "contact.html";
            response.statusCode = 200;
            routes.contactPage(path, request.url, response);
            break;
        case '/subscribe':
            path += "subscribe.html"
            response.setHeader('Set-cookie', 'subscription=New');
            routes.subscribePage(path, request.url, response);
            break;
        case '/about-me':
            // this is a redirect for a deprecated route
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        case '/synchronous':
            routes.synchronous('./files/', 'sync file mgmt', response);
            break;
        case '/asynchronous':
            routes.asynchronous('./files/', 'async file mgmt', response);
            break;
        default:
            path += "404.html";
            response.statusCode = 404;
            routes.fourOfourPage(path, request.url, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});