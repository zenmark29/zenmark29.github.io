var http = require('http');
var items = [];
var server = http.createServer(function (req, res) {
    if ('/' === req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});
server.listen(80);

/**
 * This method writes out the list of items in the array and an HTML page to display them.
 * @param {type} res
 * @returns {undefined}
 */
function show(res) {
    var html = '<html><head><title>Todo List</title></head><body>'
            + '<h1>Todo List</h1>'
            + '<ul>'
            + items.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('')
            + '</ul>'
            + '<form method="post" action="/">'
            + '<p><input type="text" name="item" /></p>'
            + '<p><input type="submit" value="Add Item" /></p>'
            + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

/**
 * This method write a 404 error on the response
 * @param {type} res response
 * @returns {undefined}
 */
function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

/**
 * This method writes a 400 error on the response
 * @param {type} res response
 * @returns {undefined}
 */
function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

/**
 * 
 * @type Module querystring|Module querystring qs is used to parse the body of the request
 */
var qs = require('querystring');

/**
 * This method adds an item to the list of items in memory and the displays the page.
 * @param {request} req request
 * @param {response} res response
 * @returns {nothing} 
 */
function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}