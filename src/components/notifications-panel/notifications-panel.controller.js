(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .controller('NotificationsPanelController', NotificationsPanelController);

    /* @ngInject */
    function NotificationsPanelController($scope, $mdSidenav, $state) {
        var vm = this;
        // sets the current active tab
        vm.close = close;
        vm.currentTab = 0;
        vm.notificationGroups = [];
        vm.openMail = openMail;
        vm.settingsGroups = [];
        vm.statisticsGroups = [];

        ////////////////

        // add an event to switch tabs (used when user clicks a menu item before sidebar opens)
        $scope.$on('hubSwitchNotificationTab', function($event, tab) {
            vm.currentTab = tab;
        });

        function openMail() {
            $state.go('private.admin.toolbar.inbox');
            vm.close();
        }

        function close() {
            $mdSidenav('notifications').close();
        }
    }
})();
