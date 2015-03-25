/**
 * Created by dmitriy.ryajov on 7/23/14.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    Container = Alicate.Container,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Select = Alicate.Select;

module.exports = View.extends({
    templateName: 'helloworld.html',
    children: [
        new Label({
            id: 'hello',
            text: 'Hello World from Alicate!!'
        })
    ]
});
