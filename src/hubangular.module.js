(function() {
    'use strict';

    angular
        .module('hubangular', [
            //third party
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'md.data.table', angularDragula(angular), 'ngFileUpload',
            //own modules
            'hubangular.layouts',
            'hubangular.components',
            'hubangular.directives',
            'hubangular.router',
            'hubangular.helpers'
        ])
        // create a constant for languages so they can be added to both hubangular & translate
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.CHINESE',
            key: 'zh'
        },{
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        },{
            name: 'LANGUAGES.FRENCH',
            key: 'fr'
        },{
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  ''
        })
        .constant('_', window._)
        .constant('USE_MOCK', true);
})();
