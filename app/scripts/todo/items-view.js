/**
 * Created by dmitriy.ryajov on 7/14/14.
 */
'use strict';

var $ = require('jquery'),
    Alicate = require('alicatejs'),
    View = Alicate.View,
    Container = Alicate.Container,
    Button = Alicate.Button,
    Select = Alicate.Select,
    Model = Alicate.Model,
    TodoItemsListView = require('./todo-items-list-view'),
    SelectTodoListView = require('./select-todo-list-view'),
    AddTodoItemView = require('./add-todo-item-view'),
    ApiHelpers = require('./firebase-api-helpers');

var
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

module.exports = View.extend({
    templateName: 'app/scripts/todo/items-view.html',
    children: [
        loadingView,
        todoView
    ],
    onPostRender: function () {
        ApiHelpers.loadTodoLists(todoListsLoaded);
    }
});
