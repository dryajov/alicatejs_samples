/**
 * Created by dmitriy.ryajov on 1/24/15.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Button = Alicate.Button,
    Input = Alicate.Input,
    Select = Alicate.Select,
    Model = Alicate.Model,
    Component = Alicate.Component,
    ApiHelpers = require('./firebase-api-helpers'),
    templates = require('../templates');

module.exports = function (todoListsModel, selectedListModel) {
    // The dropdown
    var templateName = 'app/scripts/todo/select-todo-list-view.html',
        newTodoListModel = new Model(),
        todoItemList = new Select({
            id: 'todo-list-select',
            model: todoListsModel,
            // TODO: onOptionRender is not really the place to do this, by the time it runs
            // the option component is already created, so setting the model, will cause it to re-render.
            // A method should be defined in the select component that will be used to get the text of the
            // select option
            onOptionRender: function (option) {
                var data = option.getModelData();
                option.setModel(data.item.name);
                option.setAttr('value', data.id);
            }
        }).on('change', function () {
                selectedListModel.set(this.getSelected());
            }),

        addList = new Component({
            id: 'add-list'
        }).on('click', function () {
                addListContainerVisibility = true;
                addListContainer.render();
            }),

        removeList = new Component({
            id: 'remove-list'
        }).on('click', function () {
                selectedListModel.set(null);
                ApiHelpers.removeTodoList(todoItemList.getSelected());
            }),

        addListContainerVisibility = false,
        addListContainer = new Container({
            id: 'add-list-container',
            children: [
                new Input({
                    id: 'new-list-name',
                    model: newTodoListModel
                }).on('blur', function () {
                        ApiHelpers.addNewTodoList(this.getModelData(), function () {
                            addListContainerVisibility = false;
                            addListContainer.render();

                            ApiHelpers.loadTodoLists(function (todoLists) {
                                todoListsModel.set(todoLists);
                            });
                        });
                    })
            ],
            isVisible: function isVisible() {
                return addListContainerVisibility;
            }
        });

    return View.extend({
        templateName: templateName,
        template: templates[templateName],
        children: [
            todoItemList,
            addList,
            removeList,
            addListContainer
        ]
    });
}
