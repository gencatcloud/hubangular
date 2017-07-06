(function () {
    'use strict';

    /**
     * @desc directive to access on error event on any element
     * @example <div hub-onerror="callbackFunction()"></div>
     */
    angular
        .module('hubangular')
        .directive('hubOnerror', hubOnerror);

    /* @ngInject */
    function hubOnerror() {
        return {
            link: link,
            restrict: 'A'
        };

        function link($scope, $element, $attrs) {
            $element.on('error', function () {
                //Ensure this function is call inside angular context
                $scope.$applyAsync($attrs.hubOnerror);
            });

            $scope.$on('$destroy', function () {
                $element.off('error');
            });
        }
    }

})();
