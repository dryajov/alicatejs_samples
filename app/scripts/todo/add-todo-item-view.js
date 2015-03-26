/**
 * Created by dmitriy.ryajov on 1/24/15.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Label = Alicate.Label,
    Button = Alicate.Button,
    Input = Alicate.Input,
    Select = Alicate.Select,
    Model = Alicate.Model,
    ApiHelpers = require('./firebase-api-helpers'),
    templates = require('../templates');

module.exports = function (selectedListModel) {
    // The add button
    var templateName = 'app/scripts/todo/add-todo-item-view.html',
        addButton = new Button({
            id: 'add-button',
            text: 'Add entry'
        }).on('click', function () {
                ApiHelpers.addNewTodoItem(selectedListModel.get(),
                    todoItemText.getModelData());

                todoItemText.getModel().set("");
            }),

    // Item exists label
        itemExists = new Label({
            id: 'item-exists',
            text: 'entry already exists',
            isVisible: function () {
                return false;
            }
        }),
        todoItemText = new Input({
            id: 'todo-text',
            model: new Model("")
        });

    return View.extend({
        templateName: templateName,
        template: templates[templateName],
        children: [
            todoItemText,
            addButton,
            itemExists
        ]
    });
};
