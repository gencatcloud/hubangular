(function() {
    'use strict';

    angular
        .module('hubangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, $state, $filter, $translate, $timeout, hubRoute, hubBreadcrumbsService) {
        var breadcrumbs = hubBreadcrumbsService.breadcrumbs;
        init();

        var destroyOn = $rootScope.$on('$stateChangeSuccess', function(){
            setFullTitle();
        });

        $rootScope.$on('$destroy', function(){
            destroyOn();
        });

        function setFullTitle() {
            $timeout(function(){
                var title = hubRoute.title;
                angular.forEach(breadcrumbs.crumbs, function(crumb){
                    title +=' ' + hubRoute.separator + ' ' + $filter('translate')(crumb.name);
                });
                $window.document.title = title;
            });
        }

        function init() {
            setFullTitle();
        }
    }
})();
