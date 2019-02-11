var express = require('express');
var app = express();

app.all('/users/:mode/:func',require('./api/users.js'));
app.all('/users/:mode',require('./api/users.js'));


module.exports = app;