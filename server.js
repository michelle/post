var express = require('express');
var fs = require('fs');
var app =  express.createServer();
var rest = require('restler');

// Initialize main server
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));
//app.use(express.favicon(__dirname + '/public/favicon.png'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
  res.render('index');
});

app.post('/post', function(req, res) {
  var options = {};
  if (req.body.https == true) {
    options['username'] = req.body.username;
    options['password'] = req.body.password;
  }
  if (!!req.body.data) {
    options['data'] = JSON.parse(req.body.data);
  }
  rest.post(req.body.url, options).on('complete', function(data) {
    res.send({ response: data });
  });
});


app.listen(process.env.PORT || 8000);


