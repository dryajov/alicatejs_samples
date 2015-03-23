/**
 * Created by dmitriy.ryajov on 7/14/14.
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
        'todo/firebase-api-helpers',
        'todo/todo-items-list-view',
        'todo/select-todo-list-view',
        'todo/add-todo-item-view'
    ],
    function ($, View, Container, Repeater, Label, Button, Input,
              Image, Select, Component, Model, ApiHelpers,
              TodoItemsListView, SelectTodoListView, AddTodoItemView) {
        'use strict';

        var that = this,
        // Model
            todoListsModel = new Model({data: []}),
        // a model holding the currently selected tod1o list object
            selectedTodoListItem = new Model(),

            todoItemsListView = new (TodoItemsListView(selectedTodoListItem))({
                id: 'todo-items-view'
            }),

            selectTodoListView = new (SelectTodoListView(todoListsModel, selectedTodoListItem))({
                id: 'select-todo-list-view'
            }),

            addTodoItemView = new (AddTodoItemView(selectedTodoListItem))({
                id: 'add-todo-item-view'
            }),

        // the main container
            todoView = new Container({
                id: 'todo-view',
                children: [
                    selectTodoListView,
                    addTodoItemView,
                    todoItemsListView
                ],
                visible: false
            }),

        // the loading gif
            loadingView = new Container({
                id: 'loading-view',
                visible: true
            });

        function todoListsLoaded(todoLists) {
            todoView.setVisible(true);
            loadingView.setVisible(false);

            // set default selected
            if (!selectedTodoListItem.get()) {
                selectedTodoListItem.set(todoLists[0].id);
            }
            todoListsModel.set(todoLists);
        }

        return View.extend({
            templateName: 'app/scripts/todo/items-view.html',
            children: [
                loadingView,
                todoView
            ],
            onPostRender: function () {
                ApiHelpers.loadTodoLists(todoListsLoaded);
            }
        });
    }
);
