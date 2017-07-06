(function() {
    'use strict';

    angular
        .module('hubangular')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig($translateProvider) {
        /**
         *  each module loads its own translation file - making it easier to create translations
         *  also translations are not loaded when they aren't needed
         *  each module will have a i18n folder that will contain its translations
         */
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });

        // make sure all values used in translate are sanitized for security
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // cache translation files to save load on server
        $translateProvider.useLoaderCache(true);

        // store the users language preference in a cookie
        $translateProvider.useLocalStorage();
    }
})();
