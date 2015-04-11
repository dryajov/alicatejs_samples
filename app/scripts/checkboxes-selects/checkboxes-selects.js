/**
 * Created by dmitriy.ryajov on 7/17/14.
 */

'use strict';

var Alicatejs = require('alicatejs'),
    View = Alicatejs.View,
    Repeater = Alicatejs.Repeater,
    Label = Alicatejs.Label,
    Button = Alicatejs.Button,
    Input = Alicatejs.Input,
    Select = Alicatejs.Select,
    Model = Alicatejs.Model;

// this will represent the currently selected item
var selectedDropDownModel = new Model({
    data: {val: "two"}
});

// The dropdown
var dropdown = new Select({
    id: 'select',
    model: ["one", "two", "three"],
    selected: selectedDropDownModel.get().val
}).on('change', function (event) {
        selectedDropDownModel.set({val: event.target.value});
    });

// Label indicating the current selected item
var selection = new Label({
    id: 'selection',
    text: 'The selected value is {val}',
    model: selectedDropDownModel
});

var defaultRadioSelection = 'one',
    selectedRadioModel = new Model({
        data: {val: defaultRadioSelection}
    });

var radioSelection = new Label({
    id: 'radio-selection',
    text: 'Selected radio is {val}',
    model: selectedRadioModel
});

// Create the radioboxes/checkboxes
var radio = new Repeater({
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

module.exports = View.extend({
    templateName: 'app/scripts/checkboxes-selects/checkboxes-selects.html',
    children: [
        dropdown,
        selection,
        radio,
        radioSelection
    ]
});
