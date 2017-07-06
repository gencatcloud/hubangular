(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubTable', hubResponsiveTable());

    /**
     * @ngdoc component
     * @name hubTable
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-table` is a component to create a table that can change to card collection on small screens
     *
     * @param {expression=} contents array of objects that represent rows
     * @param {expression=} breakpoints optional, breakpoint to change table. Use $mdMedia syntax. Default value is "gt-sm"
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content" breakpoint="xs">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <hub-column name="description" field="description"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubResponsiveTable() {
        return {
            restrict: 'E',
            transclude: {
                'actions': '?hubColumnAction'
            },
            bindings: {
                contents: '=',
                breakpoint: '<'
            },
            controller: hubResponsiveTableController,
            templateUrl: 'components/responsive-table/table-directive.tmpl.html'
        };
    }

    /* @ngInject */
    function hubResponsiveTableController($window, $mdMedia, Column) {
        /* jshint validthis: true */
        var $ctrl = this;

        //private vars
        $ctrl._id = null;
        $ctrl._columns = [];
        $ctrl._ColumnType = Column.TYPE;
        $ctrl._showTable = true;
        $ctrl._showProgress = false;
        $ctrl._hasActions = false;
        
        //public API
        $ctrl.addId = addId;
        $ctrl.addColumn = addColumn;
        $ctrl.hasColumns = hasColumns;
        $ctrl.getTotalRowsNum = getTotalRowsNum;
        $ctrl.setPagination = setPagination;
        $ctrl.onPaginate = onPaginate;
        $ctrl.activeActions = activeActions;
        
        ////////////////

        $ctrl.$onInit = function () {
            if (angular.isArray($ctrl.contents))
                $ctrl.contents.forEach(function (content, i) {
                    content._idRow = i
                });
            updateShowTable();

            angular.element($window).resize(_.debounce(updateShowTable, 100));
        };

        $ctrl.$onChanges = function (changes) {
            var breakpoint = changes.breakpoint;
            if (breakpoint) {
                if (breakpoint.currentValue != breakpoint.previousValue) {
                    updateShowTable();
                }
            }

            var contents = changes.contents;
            if (contents && contents.currentValue.length > contents.previousValue.length) {
                contents.currentValue.forEach(function (content, i) {
                    content._idRow = i
                });
            }
        };

        function updateShowTable() {
            if (angular.isUndefined($ctrl.breakpoint)) {
                $ctrl.breakpoint = "gt-sm";
            }
            $ctrl._showTable = $mdMedia($ctrl.breakpoint);
        }

        function addColumn(column) {
            if (Column._baseClass.prototype.isPrototypeOf(column))
                $ctrl._columns.push(column);
        }

        function addId(column) {
            if (Column._baseClass.prototype.isPrototypeOf(column))
                $ctrl._id = column;
        }

        function hasColumns() {
            return !!($ctrl._id || $ctrl._columns && $ctrl._columns.length);
        }

        function getTotalRowsNum() {
            return $ctrl.contents ? $ctrl.contents.length : 0;
        }

        function setPagination(pagination) {
            if (pagination.constructor.name === "Pagination") {
                $ctrl._pagination = pagination;
                if ($ctrl._pagination.getTotalRows() === 0)
                    $ctrl._pagination.setTotalRows($ctrl.contents ? $ctrl.contents.length : 0);

                $ctrl._pagination.paginationProgress.subscrive(function (promise) {
                    $ctrl._showProgress = true;
                    $ctrl.progress = promise.then(function () {
                        $ctrl._showProgress = false;
                    });
                });
            }
        }

        function onPaginate(page, limit) {
            $ctrl._pagination.onPaginate(page, limit);
        }

        function activeActions() {
            $ctrl._hasActions = true;
        }
    }
})();
