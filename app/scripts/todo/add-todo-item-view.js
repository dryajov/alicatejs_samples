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
    function ($, View, Container, Repeater, Label, Button, Input, Image, Select, Component, Model, templates, ApiHelper) {
        'use strict';

        return function (selectedListModel) {
            // The add button
            var templateName = 'app/scripts/todo/add-todo-item-view.html',
                addButton = new Button({
                    id: 'add-button',
                    text: 'Add entry'
                }).on('click', function () {
                        ApiHelper.addNewTodoItem(selectedListModel.get(),
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
    });
