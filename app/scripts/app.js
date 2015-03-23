/* global define */

var AlicateApp = require('alicate/alicateapp'),
  ItemsView = require('todo/items-view'),
  TabbedView = require('tabbed-view/tabbed-view'),
  CheckboxesSelects = require('checkboxes-selects/checkboxes-selects'),
  Various = require('various/various'),
  templates = require('./templates');

exports.app = function () {
  'use strict';

  var app = new AlicateApp({
    templateStore: templates,
    $selector: '#attach'
  });

  return app.mount('/link1', new ItemsView())
    .mount('/link2', new TabbedView())
    .mount('/link3', new CheckboxesSelects())
    .mount('/link4', new Various());
};
