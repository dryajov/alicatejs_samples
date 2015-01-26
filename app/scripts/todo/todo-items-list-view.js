/**
 * Created by dmitriy.ryajov on 1/24/15.
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
        'alicate/components/image',
        'alicate/components/select',
        'alicate/components/component',
        'alicate/model',
        'templates',
        'todo/firebase-api-helpers'
    ],
    function ($, View, Container, Repeater, Label, Button, Input, Image, Select, Component, Model, templates, ApiHelpers) {
        'use strict';

        return function (selectedListModel) {
            // `todo` items list
            var todoItemsModel = new Model({data: []}),
                templateName = 'app/scripts/todo/todo-items-list-view.html',

                noItemsLabel = new Label({
                    id: 'todo-no-items',
                    text: 'No todo items',
                    isVisible: function () {
                        this.visible = !todoItemsModel.get().length;
                        return  this.visible;
                    }
                }),
                itemsListContainer = new Container({
                    id: 'todo-items',
                    children: [
                        new Repeater({
                            id: 'item',
                            onItemRender: function (item) {
                                var text = item.getModelData().item.text;
                                item.add(new Component({
                                    id: 'item-remove',
                                    attributes: {
                                        alt: 'X'
                                    },
                                    model: item.getModelData()
                                }).on('click', function () {
                                        todoItemsModel.set([]);
                                        ApiHelpers.removeTodoItem(selectedListModel.get(),
                                            this.getModelData().id);
                                    }));

                                item.add(new Label({
                                    id: 'item-text',
                                    text: text
                                }));
                            },
                            model: todoItemsModel,
                            onPostRender: function () {
                                noItemsLabel.render();
                            }
                        }),
                        noItemsLabel
                    ]
                });

            selectedListModel.subscribe(function (list) {
                todoItemsModel.set([]); // force cleanup of `todo` items list
                ApiHelpers.loadTodoItems(list, function (items) {
                    todoItemsModel.set(items);
                });
            });

            return View.extend({
                templateName: templateName,
                template: templates[templateName],
                children: [
                    itemsListContainer
                ]
            });
        };
    });
