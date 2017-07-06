(function () {
    'use strict';

    /**
     * @desc directive to access on load event on any element
     * @example <div hub-onload="callbackFunction()"></div>
     */
    angular
        .module('hubangular')
        .directive('hubOnload', hubOnload);

    /* @ngInject */
    function hubOnload() {
        return {
            link: link,
            restrict: 'A'
        };

        function link($scope, $element, $attrs) {
            $element.on('load', function () {
                //Ensure this function is call inside angular context
                $scope.$applyAsync($attrs.hubOnload);
            });

            $scope.$on('$destroy', function () {
                $element.off('load');
            });
        }
    }

})();
