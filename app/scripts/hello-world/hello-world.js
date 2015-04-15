/**
 * Created by dmitriy.ryajov on 7/23/14.
 */
'use strict';

(function () {
    'use strict';

    var Alicate = require('alicatejs'),
        Label = Alicate.Label,
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

})();
