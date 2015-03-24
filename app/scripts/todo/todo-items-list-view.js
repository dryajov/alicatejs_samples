/**
 * Created by dmitriy.ryajov on 1/24/15.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Repeater = Alicate.Repeater,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Component = Alicate.Component,
    Select = Alicate.Select,
    Model = Alicate.Model,
    ApiHelpers = require('./firebase-api-helpers'),
    templates = require('../templates');

module.exports = function (selectedListModel) {
    // `todo` items list
    var todoItemsModel = new Model({data: []}),
        templateName = 'app/scripts/todo/todo-items-list-view.html',

        noItemsLabel = new Label({
            id: 'todo-no-items',
            text: 'No todo items',
            isVisible: function () {
                this.visible = !todoItemsModel.get().length;
                return this.visible;
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
