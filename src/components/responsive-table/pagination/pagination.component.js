(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubTablePagination', hubResponsiveTable());

    /**
     * @ngdoc component
     * @name hubTablePagination
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-table` is a component to create a table that can change to card collection on small screens
     *
     * @param {expression=} rowsPerPage optional, number of rows per page. Default 10
     * @param {expression=} totalRows optional, length of rows. Default table contents length
     * @param {expression=} rowsPerPageOptions optional, array of numbers use to set multiple rows per page. Defaults null
     * @param {expression=} onNextPage optional, event call on perform pagination to next page. Defaults null.
     * @param {expression=} onPreviousPage optional, event call on perform pagination to previous page. Defaults null.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <hub-column name="description" field="description"></hub-column>
     *     <hub-table-pagination rows-per-page="vm.numRows"></hub-table-pagination>
     * </hub-table>
     * </hljs>
     */
    function hubResponsiveTable() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                rowsPerPage: '<',
                totalRows: '<?',
                rowsPerPageOptions: '<',
                onNextPage: '&',
                onPreviousPage: '&'
            },
            controller: hubTablePaginationController
        };
    }

    /* @ngInject */
    function hubTablePaginationController(Pagination) {
        /* jshint validthis: true */
        var $ctrl = this;

        ////////////////
        $ctrl.$onInit = function () {
            var pagination = new Pagination();
            pagination.setRowsPerPage($ctrl.rowsPerPage);
            pagination.setTotalRows($ctrl.totalRows);
            pagination.setRowsPerPageOptions($ctrl.rowsPerPageOptions);
            pagination.subscribeOnPreviousPage($ctrl.onPreviousPage);
            pagination.subscribeOnNextPage($ctrl.onNextPage);

            $ctrl.hubTableController.setPagination(pagination);
            $ctrl._pagination = pagination;
        };

        $ctrl.$onChanges = function (changes) {
            if (angular.isDefined(changes.totalRows)) {
                $ctrl._pagination.setTotalRows(changes.totalRows.currentValue);
            }
        };
    }

})();
