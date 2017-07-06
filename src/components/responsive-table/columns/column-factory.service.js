(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .factory('Column', ColumnModelService);

    /* @ngInject */
    function ColumnModelService($filter, $mdEditDialog) {

        function ColumnFactory(name, field, type) {
            var column;

            switch (type) {
                case ColumnFactory.TYPE.NUMBER:
                    column = new NumberColumn(name, field, type);
                    break;
                case ColumnFactory.TYPE.BOOLEAN:
                    column = new BooleanColumn(name, field, type);
                    break;
                case ColumnFactory.TYPE.MENU:
                    column = new MenuColumn(name, field, type);
                    break;
                default:
                    column = new TextColumn(name, field, type);
                    break;
            }

            return column;
        }

        //constants
        ColumnFactory.TYPE = {
            TEXT: 0,
            NUMBER: 1,
            BOOLEAN: 2,
            MENU: 3
        };
        ColumnFactory._baseClass = Column;
        
        //region Column
        function Column(name, field, type) {
            this.name = name;
            this.field = field;
            this.type = type;
            this.editable = false;
            this.placeholder = "enter value...";
        }

        Column.prototype.getType = function () {
            return this.type;
        };

        Column.prototype.setEditable = function (editable) {
            if (angular.isDefined(editable)) {
                this.editable = editable;
            }
        };

        Column.prototype.getEditable = function () {
            return this.editable;
        };


        Column.prototype.setPlaceholder = function (placeholder) {
            if (angular.isDefined(placeholder))
                this.placeholder = placeholder;
        };

        Column.prototype.getPlaceholder = function () {
            return this.placeholder;
        };
        //endregion

        //region TextColumn
        function TextColumn(name, field, type) {
            Column.call(this, name, field, type);
        }

        inheritFrom(Column, TextColumn);

        TextColumn.prototype.editContent = function ($event, content) {
            $event.stopPropagation();
            var that = this;
            $mdEditDialog.small({
                modelValue: content[that.field],
                placeholder: that.getPlaceholder(),
                save: function (input) {
                    content[that.field] = input.$modelValue;
                },
                targetEvent: $event,
                title: that.getPlaceholder()
            });
        };
        //endregion

        //region NumberColumn
        function NumberColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.fractionSize = -1;
        }

        inheritFrom(Column, NumberColumn);

        NumberColumn.prototype.setFractionSize = function (fractionSize) {
            if (angular.isDefined(fractionSize) && !isNaN(fractionSize) && angular.isNumber(fractionSize))
                this.fractionSize = fractionSize;
        };

        NumberColumn.prototype.getFractionedNumber = function (content) {
            var number = content[this.field];

            if (this.fractionSize >= 0) {
                number = $filter('number')(content[this.field], this.fractionSize);
            }

            return number;
        };

        NumberColumn.prototype.editContent = function ($event, content) {
            $event.stopPropagation();
            var that = this;
            $mdEditDialog.small({
                modelValue: content[that.field],
                placeholder: that.getPlaceholder(),
                save: function (input) {
                    content[that.field] = input.$modelValue;
                },
                targetEvent: $event,
                title: that.getPlaceholder(),
                type: "number",
                validators: {
                    "step": "any"
                }
            });
        };
        //endregion

        //region MenuColumn
        function MenuColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.options = [];
            this.optionLabel = "";
        }

        inheritFrom(Column, MenuColumn);

        MenuColumn.prototype.setOptions = function (options) {
            if (angular.isArray(options)) {
                this.options = options;
            }
        };

        MenuColumn.prototype.setOptionLabelField = function (label) {
            if (angular.isDefined(label)) {
                this.optionLabel = label;
            }
        };

        MenuColumn.prototype.getOptionLabel = function (option) {
            var optionLabel;

            if (option !== undefined)
                optionLabel = this.optionLabel ? option[this.optionLabel] : option;
            else
                optionLabel = this.getPlaceholder();

            return optionLabel;
        };
        //endregion

        //region BooleanColumn
        function BooleanColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.trueLabel = "Yes";
            this.falseLabel = "No";
        }

        inheritFrom(Column, BooleanColumn);

        BooleanColumn.prototype = new Column();

        BooleanColumn.prototype.setTrueLabel = function (label) {
            if (angular.isDefined(label))
                this.trueLabel = label;
        };

        BooleanColumn.prototype.getTrueLabel = function () {
            return this.trueLabel;
        };

        BooleanColumn.prototype.setFalseLabel = function (label) {
            if (angular.isDefined(label))
                this.falseLabel = label;
        };

        BooleanColumn.prototype.getFalseLabel = function () {
            return this.falseLabel;
        };
        //endregion

        return ColumnFactory;
    }
})();
