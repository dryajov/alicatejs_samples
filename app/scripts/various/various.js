/* global define */

(function () {
    'use strict';

    var Alicatejs = require('alicatejs'),
        View = Alicatejs.View,
        Container = Alicatejs.Container,
        Repeater = Alicatejs.Repeater,
        Label = Alicatejs.Label,
        Model = Alicatejs.Model,
        Component = Alicatejs.Component;

    var myAppender = new Container({
        id: 'my-appender',
        isBound: true
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
                        }));
                    }
                })),
            myAppender,
            new Component({
                id: 'add'
            }).on('click', function (e) {
                    e.preventDefault();
                    myAppender.append(new Label({
                        id: 'new',
                        text: 'some text',
                        $el: $('<div/>'),
                        isBound: true
                    }));
                })
        ]
    });

})();
