require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        alicate: '../bower_components/alicatejs/app/scripts/alicate',
        pagejs: '../bower_components/page.js/index',
        underscore: '../bower_components/underscore/underscore',
        firebasejs: '../bower_components/firebase/firebase-debug',
        vdom: '../npm_amd_bundles/vdom-virtualize-0.0.6-{'
    },
    shim: {
        pagejs: {
            exports: 'page'
        },
        firebasejs: {
            exports: 'firebase'
        }
    }
});

require(
    [
        'app',
        'firebasejs'
    ], function (app, Firebase) {
        'use strict';
        // use app here
        var path = window.location.pathname.length > 1
            ? window.location.pathname : '/link1';
        app.start(path);
    });


