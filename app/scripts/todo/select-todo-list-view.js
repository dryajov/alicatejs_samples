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

        return function (todoListsModel, selectedListModel) {
            // The dropdown
            var templateName = 'app/scripts/todo/select-todo-list-view.html',
                newTodoListModel = new Model(),
                todoItemList = new Select({
                    id: 'todo-list-select',
                    model: todoListsModel,
                    // TODO: onOptionRender is not really the place to do this, by the time it runs
                    // the option component is already created, so setting a model, will cause it to re-render.
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
                        //if (todoItemsList[todoItemList.selected]) {
                        //    (new Firebase('https://alicate-todo.firebaseio.com/list/' +
                        //    todoItemsList[todoItemList.selected].child)).remove()
                        //}
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
    });
