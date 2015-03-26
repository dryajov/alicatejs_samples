/**
 * Created by dmitriy.ryajov on 7/17/14.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Repeater = Alicate.Repeater,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Select = Alicate.Select,
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
        onItemRender: function (item) {
            item.add(new Label({
                id: 'tab-link',
                text: item.getModelData().text
            }).on('click', function (event) {
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

            item.setAttr('class', active ? 'active' : '');

            if (!activeTabButton) {
                activeTabButton = item;
            }

            active = false;
        },
        model: tabsModel
    }),
    tabsView = new Repeater({
        id: 'tab-view',
        onItemRender: function (item) {
            item.add(new Label({
                id: 'tab-content',
                text: 'This is tab ' + item.getModelData().text
            }));

            item.visible = visible;
            if (!activeTabView) {
                activeTabView = item;
            }
            visible = false;
            tabViews.push(item);
        },
        model: tabsModel
    });

module.exports = View.extend({
    templateName: 'app/scripts/tabbed-view/tabbed-view.html',
    children: [
        tabs,
        tabsView
    ]
});
