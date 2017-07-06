(function () {
    'use strict';

    angular
        .module('hubangular')
        .animation('.hub-collapse', hubCollapseAnimation);

    /* @ngInject */
    function hubCollapseAnimation($animateCss, $mdMedia) {
        var easeCurve = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
        var collapseState = {
            "max-height": '0px',
            "padding-top": '0px',
            "padding-bottom": '0px'
        };
        
        return {
            addClass: expand,
            removeClass: collapse
        };

        /////////////

        function expand(element, className) {
            if (className === "expand") {
                var paddingTop = element.data("padding") ? element.data("padding").top : "0px";
                var paddingBottom = element.data("padding") ? element.data("padding").bottom : "0px";
                var height = element.innerHeight();
                element.find("*").each(function () {
                    height += $(this).outerHeight(true);
                });

                return $animateCss(element, {
                    from: collapseState,
                    to: {
                        "max-height": height + 'px',
                        "padding-top": paddingTop,
                        "padding-bottom": paddingBottom
                    },
                    easing: easeCurve,
                    duration: getTimeByScreen()
                });
            }
        }

        function collapse(element, className) {
            if (className === "expand") {
                return $animateCss(element, {
                    to: collapseState,
                    easing: easeCurve,
                    duration: getTimeByScreen()
                });
            }
        }

        function getTimeByScreen() {
            var duration = 0.375;

            if ($mdMedia("md"))
                duration = 0.48;

            if ($mdMedia("gt-md"))
                duration = 0.3;

            return duration;
        }
    }
})();
