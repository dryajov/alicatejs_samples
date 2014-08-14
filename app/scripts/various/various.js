/* global define */
define(
    [
        'alicate/alicateapp',
        'alicate/components/container',
        'alicate/components/view',
        'alicate/components/label',
        'alicate/components/repeater',
        'alicate/components/input',
        'alicate/model'
    ],
    function (AlicateApp, Container, View, Label, Repeater, Input, Model) {
        'use strict';

        return View.extend({
            templateName: 'app/scripts/various/various.html',
            children: {
                'my-container': new Container({
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
                    })).add(new Label({
                        id: 'some-label',
                        text: 'Fuck yeah!'
                    }))
            }
        });
    });
