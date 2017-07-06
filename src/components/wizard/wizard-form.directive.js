(function () {
    'use strict';

    angular
        .module('hubangular.components')
        .directive('hubWizardForm', WizardFormProgress);

    /* @ngInject */
    function WizardFormProgress() {
        // Usage:
        //  <div hub-wizard>
        //      <form hub-wizard-form>
        //      </form>
        //  </div>
        //
        var directive = {
            require: ['form', '^hubWizard'],
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, require) {
            var ngFormCtrl = require[0];
            var hubWizardCtrl = require[1];

            // register this form with the parent hubWizard directive
            hubWizardCtrl.registerForm(ngFormCtrl);

            // watch for form input changes and update the wizard progress
            var formWatcher = scope.$watchCollection(function () {
                return ngFormCtrl;
            }, function () {
                hubWizardCtrl.updateProgress();
            }, true);

            scope.$on("$onDestroy", formWatcher);
        }
    }
})();
