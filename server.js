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


app.get('/', function(req, res){
  res.render('index');
});


app.listen(process.env.PORT || 8000);


