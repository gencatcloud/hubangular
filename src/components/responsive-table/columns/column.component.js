(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumn', hubColumn());

    /**
     * @ngdoc component
     * @name hubColumn
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column` configure a basic text column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <!--can use ng-translate key directly-->
     *     <hub-column name="CONTENTS.DESCRIPTION" field="description"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubColumn() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@'
            },
            controller: hubColumnController
        };
    }

    /* @ngInject */
    function hubColumnController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.TEXT);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();
