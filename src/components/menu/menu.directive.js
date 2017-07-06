(function () {
    'use strict';

    angular
        .module('hubangular.components')
        .directive('hubMenu', hubMenuDirective);

    /* @ngInject */
    function hubMenuDirective($mdTheming, hubColor) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<md-content><hub-menu-item ng-repeat="item in hubMenuController.menu | orderBy:\'priority\'" item="::item"></hub-menu-item></md-content>',
            scope: {},
            controller: hubMenuController,
            controllerAs: 'hubMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var themeName = $mdTheming.defaultTheme();
            if ($element.controller('mdTheme')) {
                themeName = $element.controller('mdTheme')["$mdTheme"];//eslint-disable-line
            }
            
            //TODO: this is a temporal patch, in the future should be changed to $mdColors angular-material service
            var backgroundMenuColorRGB = hubColor.paletteColorToRGB(hubColor.getHueFromTheme(themeName, "primary", "default"));
            $element.css({'background-color': backgroundMenuColorRGB.value});
            $element.children('md-content').css({'background-color': backgroundMenuColorRGB.value});
            
        }
    }

    /* @ngInject */
    function hubMenuController(hubMenu) {
        var hubMenuController = this;
        // get the menu and order it
        hubMenuController.menu = hubMenu.menu;
    }
})();
