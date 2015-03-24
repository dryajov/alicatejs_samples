/* global define */

'use strict';

var templates = require('./templates'),
    AlicateApp = require('alicatejs').AlicateApp,
    ItemsView = require('./todo/items-view'),
    TabbedView = require('./tabbed-view/tabbed-view'),
    CheckboxesSelects = require('./checkboxes-selects/checkboxes-selects'),
    Various = require('./various/various'),
    app = new AlicateApp({
        templateStore: templates,
        $selector: '#attach'
    });

module.exports = app.mount('/link1', new ItemsView())
    .mount('/link2', new TabbedView())
    .mount('/link3', new CheckboxesSelects())
    .mount('/link4', new Various());
