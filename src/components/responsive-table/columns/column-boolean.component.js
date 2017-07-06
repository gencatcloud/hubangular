(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnBoolean', hubColumnBoolean());

    /**
     * @ngdoc component
     * @name hubColumnBoolean
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-boolean` configure a boolean column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {string=} trueLabel optional, set label to show the "true" value. Can set a ng-translate key to localization label.
     * @param {string=} falseLabel optional, set label to show the "false" value. Can set a ng-translate key to localization label.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-boolean name="boolean" field="boolean"></hub-column-boolean>
     *     <hub-column-boolean name="boolean2" field="boolean2" true-label="Si" false-label="No"></hub-column-boolean>
     * </hub-table>
     * </hljs>
     */
    /* @ngInject */
    function hubColumnBoolean() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                trueLabel: '@',
                falseLabel: '@'
            },
            controller: hubColumnBooleanController
        };
    }

    /* @ngInject */
    function hubColumnBooleanController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.BOOLEAN);
            column.setTrueLabel($ctrl.trueLabel);
            column.setFalseLabel($ctrl.falseLabel);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();
