/**
 * Created by dmitriy.ryajov on 7/17/14.
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
        'alicate/components/select',
        'alicate/components/component',
        'alicate/model'
    ],
    function ($, View, Container, Repeater, Label, Button, Input, Select, Component, Model) {
        'use strict';

        var
        // this will represent the currently selected item
            selectedDropDownModel = new Model({
                data: {val: "two"}
            }),
        // The dropdown
            dropdown = new Select({
                id: 'select',
                model: ["one", "two", "three"],
                selected: selectedDropDownModel.get().val
            }).on('change', function (event) {
                    selectedDropDownModel.set({val: event.target.value});
                }),
        // Label indicating the current selected item
            selection = new Label({
                id: 'selection',
                text: 'The selected value is {val}',
                model: selectedDropDownModel
            }),

            defaultRadioSelection = 'one',
            selectedRadioModel = new Model({
                data: {val: defaultRadioSelection}
            }),

            radioSelection = new Label({
                id: 'radio-selection',
                text: 'Selected radio is {val}',
                model: selectedRadioModel
            }),

        // Create the radioboxes/checkboxes
            radio = new Repeater({
                id: 'radio',
                model: ["one", "two", "three"],
                /**
                 * @override
                 */
                onItemRender: function (item) {
                    var input = new Input({
                        id: 'radio-input',
                        model: item.model,
                        attributes: {
                            id: item.getModelData(),
                            name: 'mycheckboxes'
                        }
                    });

                    if (item.getModelData() === defaultRadioSelection) {
                        input.setAttr('checked', "true");
                    }

                    input.on('change', function (evt) {
                        console.log("Currently checked: " + evt.target.defaultValue);
                        selectedRadioModel.set({val: evt.target.defaultValue})
                    });

                    item.add(new Label({
                        id: 'label',
                        text: 'Option ' + item.getModelData()
                    })).add(input);
                }
            });

        return View.extend({
            templateName: 'app/scripts/checkboxes-selects/checkboxes-selects.html',
            children: [
                dropdown,
                selection,
                radio,
                radioSelection
            ]
        })
    })
;
