(function () {
    'use strict';

    angular
        .module('hubangular')
        .directive('hubCollapse', hubCollapseDirective);

    /**
     * @ngdoc directive
     * @name hubCollapse
     * @module hubangular
     *
     * @restrict A
     *
     * @description
     * `hub-collapse` is a directive to collapse elements.
     *
     * If you set `hub-collapse` inside a `ng-if` block or on it, ensure the block has `ng-animate-children` to work on element load.
     *
     * @param {expression=} before-expand optional, callback execute before expand element
     * @param {expression=} after-expand optional, callback execute after expand element
     * @param {expression=} before-collapse optional, callback execute before collapse element
     * @param {expression=} after-collapse optional, callback execute after collapse element
     *
     * @usage
     *
     * <hljs lang="html">
     *  <div hub-collapse="{{vm.collapse}}">
     *      <p>collapsable content</p>
     *  </div>
     * </hljs>
     */
    /* @ngInject */
    function hubCollapseDirective($animate, $timeout) {
        return {
            restrict: 'A',
            link: link,
            scope: {
                beforeExpand: "&",
                afterExpand: "&",
                beforeCollapse: "&",
                afterCollapse: "&"
            }
        };

        function link($scope, $element, $attrs) {
            var beforeExpand;
            var afterExpand;
            var beforeCollapse;
            var afterCollapse;

            init();

            $timeout(function () {
                $attrs.$observe('hubCollapse', function (collapse) {
                    toggleCollapse(collapse === "true");
                });
                toggleCollapse($attrs.hubCollapse === "true");
            });
            
            $scope.$on("$destroy", function () {
                $animate.off('addClass', $element, eventHandler);
                $animate.off('removeClass', $element, eventHandler);
            });
            //////////////

            function toggleCollapse(collapse) {
                if (collapse) {
                    $animate.removeClass($element, "expand");
                }
                else {
                    $animate.addClass($element, "expand");
                }
            }

            function init() {
                //remove padding and save value to use on animation
                $element.data("padding", {
                    top: $element.css("padding-top"),
                    bottom: $element.css("padding-bottom")
                });

                $element.css("padding-top", 0);
                $element.css("padding-bottom", 0);
                
                //configure element
                $element.addClass("hub-collapse")
                    .attr('aria-expanded', true)
                    .attr('aria-hidden', false)
                    //ensure height is not fixed
                    .css({height: 'auto'});

                //configure events
                beforeExpand = $scope.beforeExpand || angular.noop;
                afterExpand = $scope.afterExpand || angular.noop;
                beforeCollapse = $scope.beforeCollapse || angular.noop;
                afterCollapse = $scope.afterCollapse || angular.noop;

                $animate.on('addClass', $element, eventHandler);
                $animate.on('removeClass', $element, eventHandler);
            }

            function eventHandler(element, phase) {
                if (element.hasClass("expand")) {
                    if (phase === "start") {
                        beforeExpand();
                    }
                    else
                        afterExpand();
                } else {
                    if (phase === "start") {
                        beforeCollapse();
                    }
                    else
                        afterCollapse();
                }
            }
        }
    }
})();
