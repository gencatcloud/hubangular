(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .factory('Pagination', PaginationModelService);

    /* @ngInject */
    function PaginationModelService($q, ChangesEmitter, $timeout) {
        var REQUEST_PAGE_TIMEOUT = 30000;
        var DONE_NOOP = function (locals) {
            locals.done(true)
        };

        function Pagination() {
            this.rowsPerPage = 10;
            this.totalRows = 0;
            this.rowsPerPageOptions = null;
            this.onPreviousPage = DONE_NOOP;
            this.onNextPage = DONE_NOOP;
            this.currentPage = 1;
            this.loadedPages = {previous: 1, next: 1};
            this.isFirst = false;
            this.isLast = false;

            this.paginationProgress = new ChangesEmitter();
        }

        //region rows operations
        Pagination.prototype.setRowsPerPage = function (rowsPerPage) {
            if (_.isNumber(rowsPerPage))
                this.rowsPerPage = rowsPerPage;
        };

        Pagination.prototype.getRowsPerPage = function () {
            return this.rowsPerPage;
        };

        Pagination.prototype.setTotalRows = function (totalRows) {
            if (_.isNumber(totalRows)) {
                this.totalRows = totalRows;
            }
        };

        Pagination.prototype.getTotalRows = function () {
            return this.totalRows;
        };

        Pagination.prototype.setRowsPerPageOptions = function (rowsPerPageOptions) {
            if (angular.isDefined(rowsPerPageOptions)) {
                if (!angular.isArray(rowsPerPageOptions) || _.some(rowsPerPageOptions, _.isNaN))
                    throw Error("rows-per-page-options is not an array of numbers");

                this.rowsPerPageOptions = rowsPerPageOptions;
            }
        };

        Pagination.prototype.getRowsPerPageOptions = function () {
            return this.rowsPerPageOptions;
        };
        //endregion
        //region page operations
        Pagination.prototype.setInitialPage = function (page) {
            this.currentPage = page;
            if (!this.isFirst)
                this.isFirst = page === 1;
            if (!this.isLast)
                this.isLast = page * this.getRowsPerPage() === this.getTotalRows();
        };
        //endregion

        //region events
        Pagination.prototype.subscribeOnPreviousPage = function (listenner) {
            if (angular.isFunction(listenner))
                this.onPreviousPage = function (done) {
                    listenner({
                        page: this.loadedPages.previous - 1,
                        rowsPerPage: this.getRowsPerPage(),
                        total: this.getTotalRows(),
                        done: done
                    });
                };
        };

        Pagination.prototype.subscribeOnNextPage = function (listenner) {
            if (angular.isFunction(listenner))
                this.onNextPage = function (done) {
                    listenner({
                        page: this.loadedPages.next + 1,
                        rowsPerPage: this.getRowsPerPage(),
                        total: this.getTotalRows(),
                        done: done
                    });
                };
        };

        /**
         * event to get next page for hub-infinite-scroll
         * @param done
         */
        Pagination.prototype.getNext = function (done) {
            var doneWrapper = this._doneWrapper(done);
            if (!this.isLast && this.totalRows - (this.loadedPages.next + 1) * this.rowsPerPage >= 0) {
                this.isLast = (this.loadedPages.next++) * this.getRowsPerPage() >= this.getTotalRows();
                this.onNextPage(doneWrapper);
            }
            else {
                doneWrapper(true);
            }

            return this.loadedPages.next;
        };

        /**
         * event to get previous page for hub-infinite-scroll
         * @param done
         */
        Pagination.prototype.getPrevious = function (done) {
            var doneWrapper = this._doneWrapper(done);
            if (!this.isFirst && this.loadedPages.previous - 1 >= 1) {
                this.isFirst = (this.loadedPages.previous--) === 1;

                this.onPreviousPage(doneWrapper);
            }
            else {
                doneWrapper(true);
            }
            return this.loadedPages.previous;
        };

        /**
         * event for md-table-pagination
         * @param newPage
         * @param limit
         */
        Pagination.prototype.onPaginate = function (newPage, limit) {
            var numRows = newPage * limit - this.getTotalRows();

            if (!this.isLast && numRows <= this.getRowsPerPage() && this.loadedPages.next < newPage) {
                this.getNext(angular.noop);
            } else if (!this.isFirst && newPage >= 1 && this.loadedPages.previous > newPage) {
                this.getPrevious(angular.noop);
            }
        };

        /**
         * wrapper to emit events when the pagination start or finish
         * @param done callback
         */
        Pagination.prototype._doneWrapper = function (done) {
            //start pagination
            var deferred = $q.defer();

            this.paginationProgress.emit(deferred.promise);

            var requestLimit = $timeout(function () {
                deferred.reject("No get any row for requested page");
            }, REQUEST_PAGE_TIMEOUT);

            //end pagination
            return function (isLimit) {
                $timeout.cancel(requestLimit);
                deferred.resolve(isLimit);
                done(isLimit);
            };
        };

        //endregion
        return Pagination;
    }
})();
