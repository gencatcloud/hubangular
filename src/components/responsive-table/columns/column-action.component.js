(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnAction', hubColumn());

    /**
     * @ngdoc component
     * @name hubColumnAction
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-action` configure an action button for a `hub-table`'s row
     *
     * @param {string=} text the field name of the object use to represent row in hub-table's contents.
     * @param {string=} action callback on click button. Get row object as a param.
     * @param {string=} icon optional, name of icon use to represent action button. This overwrite button text.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <!--can use ng-translate key directly-->
     *     <hub-column-action text="save" action="vm.saveAction(row)"></hub-column-action>
     * </hub-table>
     * </hljs>
     */
    function hubColumn() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable",
                hubRowController: "^hubRow"
            },
            bindings: {
                text: '@',
                icon: '@',
                doAction: '&action'
            },
            controller: HubColumnActionController,
            template: "<md-button ng-class=\"{\'md-icon-button\':!!$ctrl.icon}\" ng-click=\'$ctrl.onClick($event)\'>\n    <md-icon ng-if=\'::$ctrl.icon\' md-font-icon=\'{{::$ctrl.icon}}\'></md-icon>\n    <span ng-if=\'::!$ctrl.icon\'>{{$ctrl.text}}</span>{{column|json}}\n</md-button>"
        };
    }

    /* @ngInject */
    function HubColumnActionController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.action = $ctrl.doAction || angular.noop;
            $ctrl.hubTableController.activeActions();
        };

        $ctrl.onClick = function ($event) {
            $event.preventDefault();
            $ctrl.action({row: $ctrl.hubRowController.getContent()});
        };

    }
})();
