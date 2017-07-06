(function () {
    'use strict';

    angular
        .module('hubangular')
        .directive('hubPasswordInput', hubPasswordInputDirective);

    /* @ngInject */
    function hubPasswordInputDirective($compile) {
        return {
            restrict: 'A',
            link: link,
            scope: true
        };

        function link($scope, $element) {
            //constant
            var INPUT_TYPE = {
                "PASSWORD": {name: "password", value: 0.38},
                "TEXT": {name: "text", value: 0.54}
            };

            //private
            var input = $element.find("input");

            $scope.togglePassword = togglePassword;
            $scope.setStyleByType = function () {
                return {opacity: $scope.inputType.value};
            };

            init();

            ////////////////

            function togglePassword() {
                switch ($scope.inputType.name) {
                    case INPUT_TYPE.PASSWORD.name:
                        $scope.inputType = INPUT_TYPE.TEXT;
                        break;
                    case INPUT_TYPE.TEXT.name:
                        $scope.inputType = INPUT_TYPE.PASSWORD;
                        break;
                }

                input.attr("type", $scope.inputType.name);
            }

            function init() {
                $scope.inputType = INPUT_TYPE.PASSWORD;
                input.attr("type", $scope.inputType.name);

                //add classes
                $element.addClass("md-icon-right hub-password-input");

                //create icon element and append to input
                var icon = angular.element("<md-icon md-font-icon=\"zmdi zmdi-eye\" ng-style=\"setStyleByType()\" ng-click=\"togglePassword()\"></md-icon>")
                $compile(icon)($scope);
                $element.find(".md-errors-spacer").after(icon);
            }
        }
    }
})();