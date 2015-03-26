/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var app = require('./app');

// use app here
var path = window.location.pathname.length > 1
    ? window.location.pathname : '/link1';
app.start(path);
