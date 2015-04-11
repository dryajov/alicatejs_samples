/**
 * Created by dmitriy.ryajov on 7/23/14.
 */
'use strict';

var Alicate = require('alicatejs'),
    Container = Alicate.Container,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Select = Alicate.Select,
    View = Alicate.View;

module.exports = View.extend({
    templateName: 'app/scripts/hello-world/hello-world.html',
    children: [
        new Label({
            id: 'hello',
            text: 'Hello World from Alicate!!'
        })
    ]
});
