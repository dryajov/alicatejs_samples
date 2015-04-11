/* global define */

'use strict';

var AlicateApp = require('alicatejs').AlicateApp,
    templates = require('./templates'),
    TabbedView = require('./tabbed-view/tabbed-view'),
    CheckboxesSelectsView = require('./checkboxes-selects/checkboxes-selects'),
    VariousView = require('./various/various'),
    HelloWorldView = require('./hello-world/hello-world');

var app = new AlicateApp({
    templateStore: templates,
    $selector: '#attach',
    index: '/'
});

var tabbedView = new TabbedView();
module.exports = app
    .mount('/', tabbedView)
    .mount('/link2', tabbedView)
    .mount('/link3', new CheckboxesSelectsView())
    .mount('/link4', new VariousView())
    .mount('/link5', new HelloWorldView());
