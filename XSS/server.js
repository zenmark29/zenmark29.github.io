var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
/** root_path is the local path to the static content */
var root_path = 'public_html';
/** port_no is the port the web server will run on. Moved here so I can change it in one place */
var port_no = 80;


var cache = {};

/**
 * borrowed cookie function
 * https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
 * @param {type} cookie
 * @returns {unresolved}
 */
function parseCookies(cookie) {
    if (!cookie) return;
    return cookie.split(';').reduce(
            function (prev, curr) {
                var m = / *([^=]+)=(.*)/.exec(curr);
                var key = m[1];
                var value = decodeURIComponent(m[2]);
                prev[key] = value;
                return prev;
            },
            {}
    );
}

/**
 * borrowed cookie function
 * https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
 * @param {type} cookies
 * @returns {String}
 */
function stringifyCookies(cookies) {
    var list = [];
    for (var key in cookies) {
        list.push(key + '=' + encodeURIComponent(cookies[key]));
    }
    return list.join('; ');
}

/**
 * This method says send 404 response, but let's send a 200 response instead as it will
 * make the other web server happy.
 * @param {type} response 200
 * @returns {undefined}
 */
function send404(response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Thanks for playing');
    response.end();
}

/**
 * If a file is found, it is sent back.
 * @param {type} response
 * @param {type} filePath
 * @param {type} fileContents
 * @returns {undefined}
 */
function sendFile(response, filePath, fileContents) {
    response.writeHead(
            200,
            {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

/**
 * Look for a static file and serve it if it is there
 * @param {type} response
 * @param {type} cache
 * @param {type} absPath
 * @returns {undefined}
 */
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

/**
 * 
 * @type type
 * @param {type} request
 * @param {type} response
 */
var server = http.createServer(function (request, response) {
    var filePath = false;
    if (request.url === '/') {
        filePath = root_path + '/index.html';
    } else {
        filePath = root_path + request.url;
    }
    var absPath = './' + filePath;
    /**
     * Start here to find out what is getting to me...
     */
    console.log(request.url);

    /**
     * Here is where I log the cookies
     * borrowed from: https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
     */
    var cookies = parseCookies(request.headers.cookie);
    console.log('Input cookies: ', cookies);
    cookies.search = 'google';
    if (cookies.counter) {
        cookies.counter++;
    } else {
        cookies.counter = 1;
    }
    console.log('Output cookies: ', cookies);
    response.writeHead(200, {
        'Set-Cookie': stringifyCookies(cookies),
        'Content-Type': 'text/plain'
    });

    serveStatic(response, cache, absPath);
});


server.listen(port_no, function () {
    console.log("Server listening on port " + port_no + ".");
});

