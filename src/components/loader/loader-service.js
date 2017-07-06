(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .service('hubLoaderService', LoaderService);

    /* @ngInject */
    function LoaderService() {
        var vm = this;

        vm.status = {
            active: true
        };
        vm.setLoaderActive = setLoaderActive;

        ////////////////

        function setLoaderActive(active) {
            vm.status.active = active;
        }
    }
})();