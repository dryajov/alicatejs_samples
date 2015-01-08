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
        'alicate/model'
    ],
    function ($, View, Container, Repeater, Label, Button, Input, Image, Select, Component, Model) {
        'use strict';

        var loaded = false,
            todoItems = [],
            todoItemsList = {},
            addListView = false,

        // Models
            todoItemTextModel = new Model(),
            todoItemListModel = new Model(),
            todoItemsModel = new Model({data: []}),
            newTodoListModel = new Model(),

        // The dropdown
            todoItemList = new Select({
                id: 'todo-list-select',
                model: todoItemListModel
            }).on('change', function () {
                    loadTodoItems();
                }),

            addList = new Component({
                id: 'add-list'
            }).on('click', function () {
                    addListContainer.setVisible(addListView = true);
                }),

            removeList = new Component({
                id: 'remove-list'
            }).on('click', function () {
                    if (todoItemsList[todoItemList.selected]) {
                        (new Firebase('https://alicate-todo.firebaseio.com/list/' +
                            todoItemsList[todoItemList.selected].child)).remove()
                    }
                }),

            addListContainer = new Container({
                id: 'add-list-container',
                children: [
                    new Input({
                        id: 'new-list-name',
                        model: newTodoListModel
                    }).on('blur', function () {
                            var todoBackendListItem =
                                new Firebase('https://alicate-todo.firebaseio.com/list/');
                            addListContainer.setVisible(addListView = false);
                            if (newTodoListModel.get() &&
                                newTodoListModel.get().length > 0) {
                                todoBackendListItem.push({
                                    name: newTodoListModel.get(),
                                    items: {}
                                });
                                newTodoListModel.set();
                            }
                        })
                ],
                isVisible: function () {
                    return addListView;
                }
            }),

        // `todo` items list
            todoItemsRepeater = new Repeater({
                id: 'item',
                onItemRender: function (item) {
                    var text = item.getModelData().text;
                    item.add(new Component({
                        id: 'item-remove',
//                        src: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Red_x_small.PNG',
                        attributes: {
                            alt: 'X'
                        }
                    }).on('click', function () {
                            var todoBackendListItem =
                                new Firebase('https://alicate-todo.firebaseio.com/list/' +
                                    todoItemsList[todoItemList.selected].child + '/items/');
                            todoBackendListItem.child(item.getModelData().child).remove();
                        }));

                    item.add(new Label({
                        id: 'item-text',
                        text: text
                    }));
                },
                model: todoItemsModel
            }),

        // The add button
            addButton = new Button({
                id: 'add-button',
                text: 'Add entry'
            }).on('click', function () {
                    var text = todoItemTextModel.get(),
                        todoBackendListItem = new Firebase('https://alicate-todo.firebaseio.com/list/' +
                            todoItemsList[todoItemList.selected].child + '/items/');

                    if (text.length > 0) {
                        todoItemTextModel.set('');
                        todoBackendListItem.push({
                            text: text,
                            done: false
                        });
                    }
                }),

        // No items label
            todoNoItems = new Label({
                id: 'todo-no-items',
                text: 'No todo items',
                visible: (todoItems.length < 1)
            }),

        // Item exists label
            itemExists = new Label({
                id: 'item-exists',
                text: 'entry already exists',
                visible: false
            }),

        // the main view
            todoView = new Container({
                id: 'todo-view',
                children: [
                    todoItemList,
                    addList,
                    removeList,
                    addListContainer,
                    new Container({
                        id: 'todo-items',
                        children: [
                            todoItemsRepeater
                        ]
                    }),
                    new Input({
                        id: 'todo-text',
                        model: todoItemTextModel
                    }),
                    addButton,
                    todoNoItems,
                    itemExists
                ],
                visible: false
            }),

        // the loading view
            loadingView = new Container({
                id: 'loading-view',
                visible: true
            });

        // Add one item to the list
        function addTodoItem(item) {
            var itemsExist = todoItems.filter(function (todoItem) {
                return todoItem.text === item.text;
            }).length;

            if (itemsExist) {
                itemExists.setVisible(true);
            } else if (item.text.length > 0) {
                todoItems.push(item);
//                todoItemsRepeater.addItem(item.text);
            }
        }

        // Load data from backend
        function loadTodoListData() {
            var todoBackendList = new Firebase('https://alicate-todo.firebaseio.com/list');
            todoBackendList.on('value', function (snapshot) {
                var todoListNames = [];

                snapshot.forEach(function (childSnapshot) {
                    todoItemsList[childSnapshot.val().name] = {
                        item: childSnapshot.val(),
                        child: childSnapshot.name()
                    };
                    todoListNames.push(childSnapshot.val().name);
                });
                todoItemListModel.set(todoListNames);
                if (!loaded) {
                    todoView.setVisible(true);
                    loadingView.setVisible(false);
                    elmsVisibility();
                }
            });

            todoBackendList.once('value', function () {
                loadTodoItems();
            });
        }

        function loadTodoItems() {
            var todoBackendItems;
            if (todoItemList.selected) {
                todoBackendItems = new Firebase('https://alicate-todo.firebaseio.com/list/' +
                    todoItemsList[todoItemList.selected].child);

                todoBackendItems.on('value', function (snapshot) {
                    var items;

                    todoItems = [];
                    todoItemsModel.set([]);

                    if (snapshot.val()) {
                        items = snapshot.val().items;
                        if (items) {
                            for (var item in items) {
                                if (items.hasOwnProperty(item)) {
                                    addTodoItem({
                                        child: item,
                                        text: items[item].text
                                    });
                                }
                            }
                            todoItemsModel.set(todoItems);
                        }
                    }
                });
            }
        }

        function elmsVisibility() {
            todoItemsRepeater.setVisible(todoItems.length);
            todoNoItems.setVisible(!(todoItems.length));
            itemExists.setVisible(false);
        }

        todoItemsModel.subscribe(function () {
            elmsVisibility();
        });

        return View.extend({
            templateName: 'app/scripts/todo/items-view.html',
            children: [
                loadingView,
                todoView
            ],
            onPostRender: function () {
                loadTodoListData();
            }
        });
    }
);