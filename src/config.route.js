(function () {
    'use strict';

    angular
        .module('hubangular')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes

        $stateProvider
            .state('hubangular', {
                abstract: true,
                templateUrl: 'layouts/default/default.tmpl.html',
                controller: 'DefaultLayoutController',
                controllerAs: 'layoutController'
            })
            .state('hubangular-no-scroll', {
                abstract: true,
                templateUrl: 'layouts/default/default-no-scroll.tmpl.html',
                controller: 'DefaultLayoutController',
                controllerAs: 'layoutController'
            })
            .state('hubangular.admin-default', {
                abstract: true,
                views: {
                    sidebarLeft: {
                        templateUrl: 'components/menu/menu.tmpl.html',
                        controller: 'MenuController',
                        controllerAs: 'vm'
                    },
                    sidebarRight: {
                        templateUrl: 'components/notifications-panel/notifications-panel.tmpl.html',
                        controller: 'NotificationsPanelController',
                        controllerAs: 'vm'
                    },
                    toolbar: {
                        templateUrl: 'components/toolbars/toolbar.tmpl.html',
                        controller: 'DefaultToolbarController',
                        controllerAs: 'vm'
                    },
                    content: {
                        template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                    },
                    belowContent: {
                        template: '<div ui-view="belowContent"></div>'
                    }
                }
            })
            .state('hubangular-no-scroll.admin-default', {
                abstract: true,
                views: {
                    sidebarLeft: {
                        templateUrl: 'components/menu/menu.tmpl.html',
                        controller: 'MenuController',
                        controllerAs: 'vm'
                    },
                    sidebarRight: {
                        templateUrl: 'components/notifications-panel/notifications-panel.tmpl.html',
                        controller: 'NotificationsPanelController',
                        controllerAs: 'vm'
                    },
                    toolbar: {
                        templateUrl: 'components/toolbars/toolbar.tmpl.html',
                        controller: 'DefaultToolbarController',
                        controllerAs: 'vm'
                    },
                    content: {
                        template: '<div flex ui-view layout="column" class="overflow-hidden"></div>'
                    }
                }
            });

        // 404 & 500 pages
        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.tmpl.html',
                controllerAs: 'vm',
                controller: function ($state) {
                    var vm = this;
                    vm.goHome = function () {
                        $state.go('hubangular.admin-default.dashboard-analytics');
                    };
                }
            })
            .state('500', {
                url: '/500',
                templateUrl: 'templates/500.tmpl.html',
                controllerAs: 'vm',
                controller: function ($state) {
                    var vm = this;
                    vm.goHome = function () {
                        $state.go('hubangular.admin-default.dashboard-analytics');
                    };
                }
            });


        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');
    }
})();