var express = require('express');
var app = express();
var port = process.env.PORT || 4200;

// Serve static files
app.use(express.static(__dirname + '/app'));

// Serve your app
console.log('Frontend running on: http://localhost:' + port);
app.listen(port);