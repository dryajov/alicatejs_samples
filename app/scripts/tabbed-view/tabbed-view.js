/**
 * Created by dmitriy.ryajov on 7/17/14.
 */
define(
    [
        'jquery',
        'alicate/components/view',
        'alicate/components/container',
        'alicate/components/repeater',
        'alicate/components/label',
        'alicate/components/button',
        'alicate/components/input',
        'alicate/behaviors/eventable',
        'alicate/model'
    ],
    function ($, View, Container, Repeater, Label, Button, Input, Eventable, Model) {
        'use strict';

        var active = true,
            visible = true,
            activeTabButton = null,
            activeTabView = null,
            tabViews = [],
            tabsModel = new Model({data: [
                {index: 0, text: 'one'},
                {index: 1, text: 'two'},
                {index: 2, text: 'three'}
            ]}),
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

        return View.extend({
            templateName: 'app/scripts/tabbed-view/tabbed-view.html',
            children: {
                'tab-links': tabs,
                'tab-view': tabsView
            }
        });
    });
