/**
 * Created by dmitriy.ryajov on 4/12/15.
 */
(function () {
    'use strict';

    var Alicate = require('alicatejs'),
        Label = Alicate.Label,
        Input = Alicate.Input,
        View = Alicate.View,
        Model = Alicate.Model;

    var textAreaText = "";
    var textAreaModel = new Model({data: textAreaText});

    module.exports = View.extend({
        templateName: 'app/scripts/text-io/text-io.html',
        children: [
            new Input({
                id: 'text-area',
                model: textAreaModel
            }),
            new Label({
                id: 'textarea-out',
                model: textAreaModel
            })
        ]
    });

})();
