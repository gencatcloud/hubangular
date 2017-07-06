(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .controller('FooterController', FooterController);

    /* @ngInject */
    function FooterController(hubSettings, hubLayout) {
        var vm = this;
        vm.name = hubSettings.name;
        vm.copyright = hubSettings.copyright;
        vm.layout = hubLayout.layout;
        vm.version = hubSettings.version;
    }
})();
