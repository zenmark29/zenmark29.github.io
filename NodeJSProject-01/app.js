'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var response_count = 0;

console.log('creating the server at IP: ' + hostname + ' and at port: ' + port);
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    const { method, url } = request;
    console.log('method: ' + method);
    console.log('url: ' + url);
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World\n');
    console.log('processed request ' + response_count++);
});

server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});