/* global define */
define(
    [
        'alicate/alicateapp',
        'alicate/components/container',
        'alicate/components/component',
        'alicate/components/view',
        'alicate/components/label',
        'alicate/components/repeater',
        'alicate/components/input',
        'alicate/model',
        'alicate/markupiter',
        'jquery'
    ],
    function (AlicateApp, Container, Component, View, Label, Repeater, Input, Model, MarkupIter, $) {
        'use strict';

        var myAppender = new Container({
            id: 'my-appender'
        });

        return View.extend({
            templateName: 'app/scripts/various/various.html',
            children: [
                new Container({
                    id: 'my-container',
                    visible: true
                }).add(new Repeater({
                        id: 'my-rptr',
                        model: new Model({data: [1, 2, 3]}),
                        onItemRender: function (item) {
                            item.add(new Label({
                                id: 'my-label',
                                text: 'Hello World'
                            })).add(new Repeater({
                                id: 'my-rptr2',
                                model: new Model({data: [1, 2, 3]}),
                                onItemRender: function (item) {
                                    item.add(new Label({
                                        id: 'my-label2',
                                        text: 'Hello World'
                                    }));
                                }
                            }))
                        }
                    })),
                myAppender,
                new Component({
                    id: 'add'
                }).on('click', function () {
                        myAppender.append(new Label({
                            id: 'new',
                            text: 'some text',
                            $el: $('<div/>')
                        }));
                    })
            ]
        });
    });
