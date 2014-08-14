/* global define */
define(
    [
        'jquery',
        'alicate/alicateapp',
        'todo/items-view',
        'tabbed-view/tabbed-view',
        'checkboxes-selects/checkboxes-selects',
        'various/various',
        'templates'
    ],
    function ($, AlicateApp, ItemsView, TabbedView, CheckboxesSelects, Various, templates) {
        'use strict';

        var app = new AlicateApp({
                templateStore: templates,
                $selector: '#attach'
            });

        return app.mount('/link1', new ItemsView())
            .mount('/link2', new TabbedView())
            .mount('/link3', new CheckboxesSelects())
            .mount('/link4', new Various());
    });
