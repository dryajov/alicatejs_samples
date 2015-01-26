/**
 * Created by dmitriy.ryajov on 1/24/15.
 */
define(
    [],
    function createFirebaseApiHelper() {
        var FIREBASE_ENDPOINT_URL = 'https://alicate-todo.firebaseio.com/list/';

        return {
            // Load data from backend
            loadTodoLists: function loadTodoLists(callback, context) {
                var todoBackendList = new Firebase(FIREBASE_ENDPOINT_URL);

                todoBackendList.on('value', function (snapshot) {
                    var todoLists = [];
                    snapshot.forEach(function (childSnapshot) {
                        todoLists.push({
                            item: childSnapshot.val(),
                            id: childSnapshot.name()
                        });
                    });

                    if (callback) {
                        callback.call(context, todoLists);
                    }
                });
            },
            loadTodoItems: function loadTodoItems(list, callback, context) {
                var todoBackendItems = new Firebase(FIREBASE_ENDPOINT_URL + list);

                todoBackendItems.on('value', function (snapshot) {
                    var items,
                        todoItems = [];

                    if (snapshot.val()) {
                        items = snapshot.val().items;
                        if (items) {
                            for (var key in items) {
                                var item = items[key];
                                todoItems.push({
                                    item: item,
                                    id: key
                                });

                            }

                            if (callback) {
                                callback.call(context, todoItems);
                            }
                        }
                    }
                });
            },
            addNewTodoList: function addNewTodoList(name, callback, context) {
                var todoBackendListItem = new Firebase(FIREBASE_ENDPOINT_URL);
                if (name && name.length > 0) {
                    todoBackendListItem.push({
                        name: name,
                        items: {}
                    }, function () {
                        if (callback) {
                            callback.call(context);
                        }
                    });
                }
            },
            addNewTodoItem: function addNewTodoItem(todoList, todoItemText, callback, context) {
                var todoBackendListItem = new Firebase(FIREBASE_ENDPOINT_URL +
                todoList + '/items/');

                if (todoItemText.length > 0) {
                    todoBackendListItem.push({
                        text: todoItemText,
                        done: false
                    }, function () {
                        if (callback) {
                            callback.call(context);
                        }
                    });
                }
            },
            removeTodoItem: function removeTodoItem(list, item, callback, context) {
                var todoBackendListItem = new Firebase(FIREBASE_ENDPOINT_URL +
                list + '/items/');
                todoBackendListItem.child(item).remove(function (error) {
                    if (callback) {
                        callback.call(context);
                    }
                });
            },
            removeTodoList: function removeTodoList(list, callback, context) {
                (new Firebase('https://alicate-todo.firebaseio.com/list/' +
                list).remove(), function () {
                    if (callback) {
                        callback.call(context);
                    }
                });
            }
        };
    });
