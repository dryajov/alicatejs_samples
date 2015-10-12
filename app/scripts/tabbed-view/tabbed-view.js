/**
 * Created by dmitriy.ryajov on 7/17/14.
 */
'use strict';

(function () {
    'use strict';

    var Alicate = require('alicatejs'),
        View = Alicate.View,
        Repeater = Alicate.Repeater,
        Label = Alicate.Label,
        Model = Alicate.Model;

    var active = true,
        visible = true,
        activeTabButton = null,
        activeTabView = null,
        tabViews = [],
        tabsModel = new Model({
            data: [
                {index: 0, text: 'one'},
                {index: 1, text: 'two'},
                {index: 2, text: 'three'}
            ]
        }),
        tabs = new Repeater({
            id: 'tab-links',
            model: tabsModel,
            onItemRender: function (item) {
                item.setAttr('class', active ? 'active' : '');
                active = false;

                if (!activeTabButton) {
                    activeTabButton = item;
                }

                item.add(new Label({
                    id: 'tab-link',
                    text: item.getModelData().text
                }).on('click', function (e) {
                        e.preventDefault();

                        if (activeTabButton === item) {
                            return;
                        }

                        item.setAttr('class', 'active');
                        activeTabButton.setAttr('class', '');

                        activeTabButton.render();
                        item.render();

                        activeTabButton = item;

                        activeTabView.setVisible(false);
                        activeTabView = tabViews[item.getModelData().index];
                        activeTabView.setVisible(true);
                    }));
            }
        }),
        tabsView = new Repeater({
            id: 'tab-view',
            onItemRender: function (item) {
                item.add(new Label({
                    id: 'tab-content',
                    text: 'This is tab ' + item.getModelData().text
                }));

                if (!activeTabView) {
                    activeTabView = item;
                }

                //item.visible = false;
                tabViews.push(item);
            },
            onPostRender: function () {
                tabViews.forEach(function (view) {
                    if (view !== activeTabView) {
                        view.setVisible(false);
                    }
                });
            },
            model: tabsModel
        });

    module.exports = View.extend({
        templateName: 'app/scripts/tabbed-view/tabbed-view.html',
        children: [
            tabs,
            tabsView
        ],
        initialize: function () {
            active = true;
            visible = true;
            activeTabButton = null;
            activeTabView = null;
            tabViews = [];
        }
    });

})();
