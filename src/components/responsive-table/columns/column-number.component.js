(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnNumber', hubColumnNumber());

    /**
     * @ngdoc component
     * @name hubColumnNumber
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-number` configure a numbered column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {number=} fractionSize number of decimal places to round the number to. By default 0.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-number name="Comments" field="numComments"></hub-column>
     *     <hub-column-number name="Comments" field="numComments" fraction-size="2"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubColumnNumber() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                fractionSize: '@'
            },
            controller: hubColumnNumberController
        };

    }

    /* @ngInject */
    function hubColumnNumberController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.NUMBER);
            column.setFractionSize(Number($ctrl.fractionSize));
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();
