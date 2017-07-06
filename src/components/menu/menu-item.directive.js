(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .directive('hubMenuItem', hubMenuItemDirective);

    /* @ngInject */
    function hubMenuItemDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            require: '^hubMenu',
            scope: {
                item: '='
            },
            // replace: true,
            template: '<div ng-include="::hubMenuItem.item.template"></div>',
            controller: hubMenuItemController,
            controllerAs: 'hubMenuItem',
            bindToController: true
        };
        return directive;
    }

    /* @ngInject */
    function hubMenuItemController($scope, $mdSidenav, $state, $filter, hubBreadcrumbsService) {
        var hubMenuItem = this;
        // load a template for this directive based on the type ( link | dropdown )
        hubMenuItem.item.template = 'components/menu/menu-item-' + hubMenuItem.item.type + '.tmpl.html';

        switch(hubMenuItem.item.type) {
            case 'dropdown':
                // if we have kids reorder them by priority
                hubMenuItem.item.children = $filter('orderBy')(hubMenuItem.item.children, 'priority');
                hubMenuItem.toggleDropdownMenu = toggleDropdownMenu;
                // add a check for open event
                $scope.$on('toggleDropdownMenu', function(event, item, open) {
                    // if this is the item we are looking for
                    if(hubMenuItem.item === item) {
                        hubMenuItem.item.open = open;
                    }
                    else {
                        hubMenuItem.item.open = false;
                    }
                });
                // this event is emitted up the tree to open parent menus
                $scope.$on('openParents', function() {
                    // openParents event so open the parent item
                    hubMenuItem.item.open = true;
                    // also add this to the breadcrumbs
                    hubBreadcrumbsService.addCrumb(hubMenuItem.item);
                });
                break;
            case 'link':
                hubMenuItem.openLink = openLink;

                // on init check if this is current menu
                checkItemActive($state.current.name, $state.params);

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
                    checkItemActive(toState.name, toParams);
                });
                break;
        }

        function checkItemActive() {
            // first check if the state is the same
            hubMenuItem.item.active = $state.includes(hubMenuItem.item.state, hubMenuItem.item.params);
            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if(hubMenuItem.item.active) {
                hubBreadcrumbsService.reset();
                hubBreadcrumbsService.addCrumb(hubMenuItem.item);
                $scope.$emit('openParents');
            }
        }

        function toggleDropdownMenu() {
            $scope.$parent.$parent.$broadcast('toggleDropdownMenu', hubMenuItem.item, !hubMenuItem.item.open);
        }

        function openLink() {
            var params = angular.isUndefined(hubMenuItem.item.params) ? {} : hubMenuItem.item.params;
            $state.go(hubMenuItem.item.state, params);
            hubMenuItem.item.active = true;
            $mdSidenav('left').close();
        }
    }
})();