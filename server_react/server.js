var http = require('http'); 
var url = require('url');
var querystring = require('querystring'); 

var comments = [];

var server = http.createServer(function(request,response){ 
  console.log('--- log start ---');
  console.log('rerun');
  console.log(request.method, request.response)
  if (request.method === 'POST' && request.url === 'localhost:3000') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var comment = querystring.parse(body);
      comments.push(comment);
      console.log('Added new comment:', comment);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(comment));
    });
  } else if (request.method === 'GET' && request.url === 'localhost:3000') {
    console.log('Fetching comments data...');
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(comments));
  } else {
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Not Found');
  }
});

server.listen(8080, function(){ 
  console.log('Server is running...');
});