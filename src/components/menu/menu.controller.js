(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(hubSettings, hubLayout) {
        var vm = this;
        vm.layout = hubLayout.layout;
        vm.sidebarInfo = {
            appName: hubSettings.name,
            appLogo: hubSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////
        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            hubLayout.setOption('sideMenuSize', menu);
        }
    }
})();
