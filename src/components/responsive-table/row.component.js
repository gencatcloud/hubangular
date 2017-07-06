(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .directive('hubRow', hubRow);

    /**
     * @ngdoc directive
     * @name hubRow
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-row` is internal helper directive to hold row information and do accessible to other components
     */
    /* @ngInject */
    function hubRow() {
        return {
            require: "^hubTable",
            restrict: 'A',
            controller: hubRowController
        };
    }

    /* @ngInject */
    function hubRowController($scope) {
        /* jshint validthis: true */
        var $ctrl = this;

        $ctrl.getContent = function () {
            //get from table parent
            return $scope.content;
        }
    }
})();
