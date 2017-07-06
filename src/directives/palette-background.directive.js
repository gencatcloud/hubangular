(function () {
    'use strict';

    angular
        .module('hubangular.directives')
        .directive('paletteBackground', paletteBackground);

    /**
     * Directive to set background color of palette
     *
     * @param hubColor
     * @usage
     * <div palette-background="red:500">Coloured content</div>
     *
     * @ngInject
     */
    function paletteBackground(hubColor) {

        var directive = {
            bindToController: true,
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var hue = splitColor.length == 2 ? splitColor[1] : "500";
            var color = hubColor.paletteColorToRGB(hubColor.getHueFromPalette(splitColor[0], hue));

            if (angular.isDefined(color)) {
                $element.css({
                    'background-color': color.value,
                    'border-color': color.value,
                    'color': color.contrast
                });
            }
        }
    }
})();
