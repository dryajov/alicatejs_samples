/* global define */

'use strict';

var templates = require('./templates'),
    AlicateApp = require('alicatejs').AlicateApp,
    TodoView = require('./todo/items-view'),
    TabbedView = require('./tabbed-view/tabbed-view'),
    CheckboxesSelectsView = require('./checkboxes-selects/checkboxes-selects'),
    VariousView = require('./various/various'),
    HelloWorldView = require('./hello-world/hello-world');


var app = new AlicateApp({
        templateStore: templates,
        $selector: '#attach'
    });

module.exports = app
    .mount('/link1', new TodoView())
    .mount('/link2', new TabbedView())
    .mount('/link3', new CheckboxesSelectsView())
    .mount('/link4', new VariousView())
    .mount('/link5', new HelloWorldView());
