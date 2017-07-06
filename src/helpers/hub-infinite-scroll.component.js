(function () {
    'use strict';

    angular.module('hubangular.helpers')
        .directive("hubInfiniteScroll", hubInfiniteScrollDirective);

    /**
     * @ngdoc directive
     * @name hubInfiniteScroll
     * @restrict A
     * @module hubangular.helpers
     *
     * @description
     * use to spy scroll an create infinity scrolls very easy, call event when element spied reach top or bottom of scroll
     *
     * @param {string=} hubInfiniteScroll optional, if set to `false`, the directive will disable. By default is `true`.
     * @param {expression=} previousPage optional, event throw to request previous content. Has a `done(boolean)` parameter callback,
     * if set true indicate is the first page and no need to request more previous pages.
     * @param {expression=} nextPage optional, event throw to request next content. Has a `done(boolean)` parameter callback,
     * if set true indicate is the last page and no need to request more next pages.
     * @param {string=} startImmediatly optional, set true to force call nextPage event on init, ideal to get content from server on load.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-boolean name="boolean" field="boolean"></hub-column-boolean>
     *     <hub-column-boolean name="boolean2" field="boolean2" true-label="Si" false-label="No"></hub-column-boolean>
     * </hub-table>
     * </hljs>
     */
    /*ngInject*/
    function hubInfiniteScrollDirective($timeout, $window) {
        //build directive
        return {
            restrict: "A",
            link: link,
            scope: {
                previousPageCallback: "&?previousPage",
                nextPageCallback: "&?nextPage",
                startImmediatly: "="
            }
        };

        function link($scope, $element, $attrs) {
            //eslint-disable-line
            var $ctrl = {};

            var NOOP_FUNCTION = function (locals) {
                locals.done(true);
            };

            $ctrl._isTopReached = false;
            $ctrl._isBottomReached = false;

            $timeout(onInit);
            /////////////////////

            //initialitzation
            function onInit() {
                $ctrl.previousPageCallback = $scope.previousPageCallback || NOOP_FUNCTION;
                $ctrl.nextPageCallback = $scope.nextPageCallback || NOOP_FUNCTION;

                $ctrl._container = findContainer($element.parent());
                var previousDisabled = $scope.$eval($attrs.hubInfiniteScroll) === "false";
                $attrs.$observe("hubInfiniteScroll", function (enable) {
                    var isDisabled = enable === "false";
                    if (isDisabled != previousDisabled) {
                        if (isDisabled)
                            endWatch();
                        else
                            startWatch();
                    }
                    previousDisabled = isDisabled;
                });

                if (!previousDisabled && $scope.startImmediatly) {
                    requestNext();
                }

                startWatch();
            }

            function findContainer(element) {
                var container = element;
                var found = false;

                while (!found && container.parent().length > 0) {
                    found = container[0].scrollHeight > container[0].clientHeight &&
                        container.css('overflow') != 'visible' && container.css('overflow') != 'hidden';

                    if (!found)
                        container = container.parent();
                }

                return found ? container : angular.element($window);
            }

            $scope.$on('$destroy', endWatch);

            function requestPrevious() {
                endWatch();
                $ctrl.previousPageCallback({
                    done: function (isFirst) {
                        $scope.$apply(function () {
                            $ctrl._isTopReached = isFirst;
                            startWatch();
                        });
                    }
                });
            }

            function requestNext() {
                endWatch();

                $ctrl.nextPageCallback({
                    done: function (isLast) {
                        $scope.$apply(function () {
                            $ctrl._isBottomReached = isLast;
                            startWatch();
                        });
                    }
                });
            }

            function startWatch() {
                if (!$ctrl._isTopReached || !$ctrl._isBottomReached) {
                    //update cycle
                    $ctrl._container.scroll(updateScrollPosition);
                }
            }

            function endWatch() {
                $ctrl._container.off('scroll', updateScrollPosition);
            }

            function updateScrollPosition() {
                var topLimit = $element.offset().top;
                var bottomLimit = topLimit + $element[0].clientHeight;
                var bottomContainer = $ctrl._container.offset().top + $ctrl._container[0].clientHeight;
                if (!$ctrl._isTopReached && topLimit >= $ctrl._container.offset().top) {
                    requestPrevious();
                } else if (!$ctrl._isBottomReached && bottomLimit <= bottomContainer) {
                    requestNext();
                }
            }
        }
    }

})();
