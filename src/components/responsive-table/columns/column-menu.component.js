(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnMenu', hubColumnMenu());

    /**
     * @ngdoc component
     * @name hubColumnMenu
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-menu` configure a inline-menu column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {expression=} options array of options. Can use any type of data(strings,number,objects...)
     * @param {string=} optionLabelField optional, if `options` is array of objects, can set the field name of objects to use his value as a label.
     * @param {string=} placeholder optional, label shown when column no has value.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-menu name="menu" field="menu" options="vm.options"></hub-column-menu>
     *     <hub-column-menu name="menuObject" field="menuObject" options="vm.optionsObject" option-label-field="label" placeholder="Complex"></hub-column-menu>
     * </hub-table>
     * </hljs>
     */

    function hubColumnMenu() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                options: '=',
                optionLabelField: '@',
                placeholder: '@'
            },
            controller: hubColumnMenuController
        };

    }

    /* @ngInject */
    function hubColumnMenuController(Column, $attrs, $element) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.MENU);
            column.setOptions($ctrl.options);
            column.setOptionLabelField($ctrl.optionLabelField);
            column.setPlaceholder($ctrl.placeholder);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();
