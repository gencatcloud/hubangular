(function() {
    'use strict';

    angular
        .module('hubangular')
        .config(configSettings);

    /* @ngInject */
    function configSettings(hubSettingsProvider, hubRouteProvider, APP_LANGUAGES) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        hubSettingsProvider.setName('hubangular');
        hubSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' hpe.com');
        hubSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        hubSettingsProvider.setVersion('0.1.x');
        // set the document title that appears on the browser tab
        hubRouteProvider.setTitle('Hubangular');
        hubRouteProvider.setSeparator('|');

        // setup available languages in hubangular
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            hubSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
