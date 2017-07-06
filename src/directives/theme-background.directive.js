(function () {
    'use strict';

    angular
        .module('hubangular.directives')
        .directive('themeBackground', themeBackground);


    /**
     * Directive to set background color of theme palette
     * format: [palette-name] : [hue](optional)
     * - palettes names: primary,accent,warn,background
     * - hue values: hue-1,hue-2,hue-3
     *
     * @param $mdTheming
     * @param hubColor
     * @usage
     * <div theme-background="primary:hue-1">Coloured content</div>
     *
     * @ngInject
     */
    function themeBackground($mdTheming, hubColor) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            $mdTheming($element);
            var splitIntent = attrs.themeBackground.split(':');
            var intent = splitIntent[0];
            var hue = splitIntent.length == 2 ? splitIntent[1] : "default";

            var $mdTheme = $element.controller('mdTheme');//eslint-disable-line
            if (angular.isDefined($mdTheme)) {
                // get the color and apply it to the element
                $scope.$on('$destroy', $scope.$watch(function () {
                    return $mdTheme.$mdTheme;
                }, updateColor));

                updateColor($mdTheme.$mdTheme);
            }
            else {
                updateColor($mdTheming.defaultTheme());
            }

            function updateColor(themeName) {
                var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme(themeName, intent, hue));
                if (angular.isDefined(color)) {
                    $element.css({
                        'background-color': color.value,
                        'border-color': color.value,
                        'color': color.contrast
                    });
                }
            }
        }
    }
})();
