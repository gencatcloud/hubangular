(function() {
    'use strict';

    angular
        .module('hubangular')
        .config(config);

    /* @ngInject */
    function config(hubLayoutProvider) {
        hubLayoutProvider.setDefaultOption('toolbarSize', 'default');

        hubLayoutProvider.setDefaultOption('toolbarShrink', false);

        hubLayoutProvider.setDefaultOption('toolbarClass', '');

        hubLayoutProvider.setDefaultOption('contentClass', '');

        hubLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        hubLayoutProvider.setDefaultOption('showToolbar', true);

        hubLayoutProvider.setDefaultOption('footer', true);
    }
})();