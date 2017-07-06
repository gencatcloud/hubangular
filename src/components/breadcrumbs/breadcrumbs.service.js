(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .service('hubBreadcrumbsService', BreadcrumbsService);

    /* @ngInject */
    function BreadcrumbsService() {
        this.breadcrumbs = {
            crumbs: []
        };
        this.addCrumb = addCrumb;
        this.reset = reset;

        ////////////////

        function addCrumb(item) {
            this.breadcrumbs.crumbs.unshift(item);
        }

        function reset() {
            this.breadcrumbs.crumbs = [];
        }
    }
})();
