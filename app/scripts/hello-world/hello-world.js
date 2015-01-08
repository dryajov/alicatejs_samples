/**
 * Created by dmitriy.ryajov on 7/23/14.
 */
define(
    [
        'alicate/components/view',
        'alicate/components/label'
    ],
    function (View, Label) {
        'use strict';

        return View.extends({
            templateName: 'helloworld.html',
            children: [
                new Label({
                    id: 'hello',
                    text: 'Hello World from Alicate!!'
                })
            ]
        });
    }
)
