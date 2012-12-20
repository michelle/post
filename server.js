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
  var errors = [];
  var options = {};

  if (!!req.body.data) {
    try {
      if (typeof req.body.url === 'undefined') {
        errors.push('Missing URL');
      }

      options['username'] = req.body.username;
      options['password'] = req.body.password;
      options['data'] = req.body.data;
      options['Content-Type'] = 'application/json';
      options['Content-Length'] = JSON.stringify(req.body.data).length;
    } catch (err) {
      errors.push('Malformed data');
    }
  }

  if (errors.length) {
    res.send({
      response: {
        status: 1,
        errors: errors
      }
    });
  } else {
    rest.post(req.body.url, options).on('complete', function(data) {
      res.send({
        status: 0,
        response: data
      });
    });
  }
});

app.listen(process.env.PORT || 8000);
