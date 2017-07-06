(function () {
    'use strict';

    angular
        .module('hubangular.helpers')
        .provider('hubColor', hubColorProvider);

    /**
     * @ngdoc service
     * @name hubColorProvider
     * @module hubangular.helpers
     *
     * @description
     * service to access materials colors api more easy.
     *
     * @usage
     * <hljs lang="javascript">
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromPalette('cyan', '500'));
     *
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme('cyan-theme', 'primary'));
     *
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme('cyan-theme', 'primary','hue-2'));
     * </hljs>
     */
    /* @ngInject */
    function hubColorProvider($mdThemingProvider) {

        var arrayToRGB = $mdThemingProvider._rgba;
        var palettes = $mdThemingProvider._PALETTES;
        var themes = $mdThemingProvider._THEMES;

        return {
            $get: function () {
                return {
                    getHueFromPalette: getHueFromPalette,
                    getHueFromTheme: getHueFromTheme,
                    paletteColorToRGB: paletteColorToRGB,
                    paletteColorToHex: paletteColorToHex,
                    getPalette: getPalette
                };
            }
        };

        //////////////

        /**
         * Get hue value and contrast from palette
         *
         * @param palette {Object|String} palette or name of palette
         * @param hue {String} optional
         * @returns {Object} palette color with value and contrast. If not found return undefined
         */
        function getHueFromPalette(palette, hue) {
            var paletteColor = hue || "500";
            if (angular.isDefined(palette)) {
                var targetPalette = typeof palette === "string" ? getPalette(palette) : palette;
                if (angular.isDefined(targetPalette[paletteColor])) {
                    return targetPalette[paletteColor];
                }
            }
        }

        /**
         * Get  hue value and contrast from theme
         *
         * @param themeName {String} name of theme
         * @param intentName {String} theme's palette. possibles values: primary, accent, warn and background
         * @param hue {String} theme's palette hue. possibles values: default, hue-1, hue-2, hue-3
         * @returns {Object} palette color with value and contrast. If not found return undefined
         */
        function getHueFromTheme(themeName, intentName, hue) {
            if (angular.isDefined(themes[themeName]) && angular.isDefined(themes[themeName].colors[intentName])) {
                var intentPalette = themes[themeName].colors[intentName];
                if (angular.isDefined(intentPalette)) {
                    var intentHue = hue || "default";
                    return getHueFromPalette(palettes[intentPalette.name], intentPalette.hues[intentHue]);
                }
            }
        }

        /**
         * transform palette color to "rgb(0,0,0)" string format
         *
         * @param {Object} paletteColor
         * @returns {Object} palette color with value and contrast to "rgb(0,0,0)". If not found return undefined
         */
        function paletteColorToRGB(paletteColor) {
            if (angular.isDefined(paletteColor) && angular.isArray(paletteColor.value) && angular.isArray(paletteColor.contrast)) {
                return {
                    value: arrayToRGB(paletteColor.value),
                    contrast: arrayToRGB(paletteColor.contrast)
                }
            }
        }

        function valueToHex(value) {
            var stringValue = value.toString(16);
            return ('00' + stringValue).substring(stringValue.length);
        }

        /**
         * transform palette color to "#000000" string format
         *
         * @param {Object} paletteColor
         * @returns {Object} palette color with value and contrast to "#000000". If not found return undefined
         */
        function paletteColorToHex(paletteColor) {
            if (angular.isDefined(paletteColor) && angular.isArray(paletteColor.value) && angular.isArray(paletteColor.contrast)) {
                return {
                    value: "#" + valueToHex(paletteColor.value[0]) + valueToHex(paletteColor.value[1]) + valueToHex(paletteColor.value[2]),
                    contrast: "#" + valueToHex(paletteColor.contrast[0]) + valueToHex(paletteColor.contrast[1]) + valueToHex(paletteColor.contrast[2])
                }
            }
        }

        /**
         * get palette by name
         *
         * @param paletteName
         * @returns {Object} the palette. If not found return undefined
         */
        function getPalette(paletteName) {
            return palettes[paletteName];
        }
    }
})();
