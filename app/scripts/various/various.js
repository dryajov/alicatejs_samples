/* global define */

'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Repeater = Alicate.Repeater,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Select = Alicate.Select,
    Model = Alicate.Model,
    Component = Alicate.Component;

var myAppender = new Container({
    id: 'my-appender'
});

module.exports = View.extend({
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
