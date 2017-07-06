(function() {
    'use strict';

    angular
        .module('hubangular', [
            //third party
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'md.data.table', angularDragula(angular), 'ngFileUpload',
            //own modules
            'hubangular.layouts',
            'hubangular.components',
            'hubangular.directives',
            'hubangular.router',
            'hubangular.helpers'
        ])
        // create a constant for languages so they can be added to both hubangular & translate
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.CHINESE',
            key: 'zh'
        },{
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        },{
            name: 'LANGUAGES.FRENCH',
            key: 'fr'
        },{
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  ''
        })
        .constant('_', window._)
        .constant('USE_MOCK', true);
})();

angular.module("hubangular").run(["$templateCache", function($templateCache) {$templateCache.put("templates/404.tmpl.html","<div class=\"full-height full-image-background mb-bg-07\" layout=\"column\" layout-fill=\"\" layout-align=\"space-around center\"><div layout=\"row\" flex=\"\" class=\"full-width\" layout-align=\"center center\"><div flex=\"50\" flex-sm=\"90\" layout=\"row\"><div flex=\"\">404</div></div></div><div layout=\"row\" flex=\"\" class=\"full-width\" layout-align=\"center center\"><md-card flex=\"50\" flex-sm=\"90\"><md-card-content class=\"text-center\"><h1 class=\"md-display-1\" translate=\"\">404.MESSAGE</h1><p translate=\"\">404.DESCRIPTION</p><md-button class=\"md-primary md-raised\" ng-click=\"vm.goHome()\" translate=\"404.HOME\"></md-button></md-card-content></md-card></div></div>");
$templateCache.put("templates/500.tmpl.html","<div class=\"full-height full-image-background mb-bg-07\" layout=\"column\" layout-fill=\"\" layout-align=\"space-around center\"><div layout=\"row\" flex=\"\" class=\"full-width\" layout-align=\"center center\"><div flex=\"50\" flex-sm=\"90\" layout=\"row\"><div flex=\"\">500</div></div></div><div layout=\"row\" flex=\"\" class=\"full-width\" layout-align=\"center center\"><md-card flex=\"50\" flex-sm=\"90\"><md-card-content class=\"text-center\"><h1 class=\"md-display-1\" translate=\"\">500.MESSAGE</h1><p translate=\"\">500.DESCRIPTION</p><md-button class=\"md-primary md-raised\" ng-click=\"vm.goHome()\" translate=\"500.HOME\"></md-button></md-card-content></md-card></div></div>");
$templateCache.put("components/footer/footer.tmpl.html","<md-toolbar id=\"footer\" ng-controller=\"FooterController as vm\" ng-show=\"vm.layout.footer\"><div class=\"md-toolbar-tools md-body-1\" layout=\"row\" layout-align=\"space-between center\"><h2>{{vm.name}}</h2><h2 hide-xs=\"\" ng-bind-html=\"vm.copyright\"></h2><h2>v{{vm.version}}</h2></div></md-toolbar>");
$templateCache.put("components/menu/menu-item-divider.tmpl.html","<md-divider></md-divider>");
$templateCache.put("components/menu/menu-item-dropdown.tmpl.html","<md-button ng-click=\"hubMenuItem.toggleDropdownMenu()\" class=\"md-raised md-primary side-menu-link\"><md-icon ng-if=\"::(hubMenuItem.item.icon !== undefined)\" class=\"side-menu-icon\" md-font-icon=\"{{::hubMenuItem.item.icon}}\"></md-icon><span translate=\"\">{{::hubMenuItem.item.name}}</span><md-icon class=\"menu-toggle-icon\" md-font-icon=\"zmdi zmdi-chevron-right\" ng-class=\"{ open: hubMenuItem.item.open }\"></md-icon></md-button><ul class=\"drop-down-list\" ng-show=\"hubMenuItem.item.open\"><li ng-repeat=\"child in hubMenuItem.item.children\"><hub-menu-item item=\"::child\"></hub-menu-item></li></ul>");
$templateCache.put("components/menu/menu-item-link.tmpl.html","<md-button ng-click=\"hubMenuItem.openLink(hubMenuItem.item)\" class=\"md-primary md-raised side-menu-link\" ng-class=\"{ \'md-hue-1\': hubMenuItem.item.active }\"><md-icon ng-if=\"::(hubMenuItem.item.icon !== undefined)\" class=\"side-menu-icon\" md-font-icon=\"{{::hubMenuItem.item.icon}}\"></md-icon><span translate=\"\">{{::hubMenuItem.item.name}}</span> <small ng-if=\"hubMenuItem.item.badge\" theme-background=\"accent\" class=\"side-menu-badge\">{{::hubMenuItem.item.badge}}</small></md-button>");
$templateCache.put("components/menu/menu.tmpl.html","<md-toolbar class=\"sidebar-left-toolbar\"><div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"start center\"><div class=\"sidebar-left-logo\"><img ng-src=\"{{::vm.sidebarInfo.appLogo}}\" alt=\"{{::vm.sidebarInfo.appName}}\" width=\"24px\"></div><h2 flex=\"\" class=\"sidebar-left-title\">{{::vm.sidebarInfo.appName}}</h2><md-button class=\"md-icon-button sidebar-left-icon\" ng-click=\"vm.toggleIconMenu()\" aria-label=\"Open side menu\"><md-icon md-font-icon=\"\" ng-class=\"{ \'zmdi zmdi-unfold-more\' : vm.layout.sideMenuSize == \'icon\', \'zmdi zmdi-unfold-less\' : vm.layout.sideMenuSize == \'full\' }\"></md-icon></md-button></div></md-toolbar><hub-menu flex=\"\"></hub-menu>");
$templateCache.put("components/notifications-panel/notifications-panel.tmpl.html","<md-content flex=\"\" layout=\"\" class=\"admin-notifications\"><md-tabs flex=\"\" md-stretch-tabs=\"always\" md-selected=\"vm.currentTab\"><md-tab><md-tab-label><md-icon md-font-icon=\"zmdi zmdi-email\"></md-icon></md-tab-label><md-tab-body><md-content><md-list><md-list-item class=\"md-3-line\" ng-repeat=\"email in ::vm.emails\" ng-click=\"vm.openMail(email)\"><img class=\"md-avatar animate\" ng-src=\"{{::email.from.image}}\" alt=\"{{::email.from.name}}\"><div class=\"md-list-item-text\"><div class=\"email-inbox-list-item-name-time\" layout=\"row\" layout-align=\"space-between start\"><h3>{{::email.from.name}}</h3><p class=\"md-caption\" am-time-ago=\"::email.date\"></p></div><h4>{{::email.subject}}</h4></div><md-divider ng-hide=\"$last\"></md-divider></md-list-item></md-list></md-content></md-tab-body></md-tab><md-tab><md-tab-label><md-icon md-font-icon=\"fa fa-bell-o\"></md-icon></md-tab-label><md-tab-body><md-content><md-list><div ng-repeat=\"group in ::vm.notificationGroups\"><md-subheader class=\"md-primary\">{{::group.name}}</md-subheader><md-list-item ng-repeat=\"notification in ::group.notifications\" layout=\"row\" layout-align=\"space-between center\"><md-icon md-font-icon=\"{{::notification.icon}}\" ng-style=\"{ color: notification.iconColor }\"></md-icon><p>{{::notification.title}}</p><span class=\"md-caption\" am-time-ago=\"::notification.date\"></span></md-list-item></div></md-list></md-content></md-tab-body></md-tab><md-tab><md-tab-label><md-icon md-font-icon=\"zmdi zmdi-account\"></md-icon></md-tab-label><md-tab-body><md-content><md-list><div ng-repeat=\"group in ::vm.settingsGroups\"><md-subheader class=\"md-primary\"><span translate=\"\">{{::group.name}}</span></md-subheader><md-list-item ng-repeat=\"setting in ::group.settings\" layout=\"row\" layout-align=\"space-around center\"><md-icon md-font-icon=\"{{::setting.icon}}\"></md-icon><p translate=\"\">{{::setting.title}}</p><md-switch class=\"md-secondary\" ng-model=\"setting.enabled\"></md-switch></md-list-item></div><div ng-repeat=\"group in ::vm.statisticsGroups\"><md-subheader class=\"md-primary\"><span translate=\"\">{{::group.name}}</span></md-subheader><md-list-item ng-repeat=\"stat in ::group.stats\" layout=\"column\" layout-align=\"space-around start\"><md-progress-linear ng-class=\"::stat.mdClass\" md-mode=\"determinate\" ng-value=\"::stat.value\"></md-progress-linear><p translate=\"\">{{::stat.title}}</p></md-list-item></div></md-list></md-content></md-tab-body></md-tab></md-tabs></md-content>");
$templateCache.put("components/responsive-table/table-directive.tmpl.html","<div class=\"table-mode\" ng-if=\"$ctrl._showTable && $ctrl.hasColumns()\"><md-table-container><table md-table=\"\" md-progress=\"$ctrl.progress\"><thead md-head=\"\"><tr md-row=\"\"><th md-column=\"\" class=\"column\" ng-if=\"::$ctrl._id\">{{::$ctrl._id.name | translate}}</th><th md-column=\"\" class=\"column\" ng-repeat-start=\"column in ::$ctrl._columns\" ng-if=\"::column.type != $ctrl._ColumnType.NUMBER\"><md-icon ng-if=\"::column.getEditable()\" md-font-icon=\"zmdi zmdi-edit\"></md-icon><span>{{::column.name | translate}}</span></th><th md-column=\"\" md-numeric=\"\" class=\"column\" ng-if=\"::column.type == $ctrl._ColumnType.NUMBER\" ng-repeat-end=\"\"><md-icon ng-if=\"::column.getEditable()\" md-font-icon=\"zmdi zmdi-edit\"></md-icon><span>{{::column.name | translate}}</span></th></tr></thead><tbody md-body=\"\"><tr md-row=\"\" hub-row=\"\" ng-repeat=\"content in $ctrl.contents | limitTo: $ctrl._pagination.getRowsPerPage() : ($ctrl._pagination.currentPage-1) * $ctrl._pagination.getRowsPerPage()\"><td md-cell=\"\" ng-if=\"::$ctrl._id\"><span>{{::content[$ctrl._id.field]}}</span></td><td md-cell=\"\" ng-repeat-start=\"column in ::$ctrl._columns\" ng-if=\"::column.type == $ctrl._ColumnType.TEXT && !column.getEditable()\">{{::content[column.field]}}</td><td md-cell=\"\" ng-if=\"::column.type == $ctrl._ColumnType.TEXT && column.getEditable()\" ng-click=\"column.editContent($event, content)\" ng-class=\"{\'md-placeholder\': !content[column.field]}\">{{content[column.field] || column.getPlaceholder()}}</td><td md-cell=\"\" ng-if=\"::column.type == $ctrl._ColumnType.NUMBER && !column.getEditable()\">{{::column.getFractionedNumber(content)}}</td><td md-cell=\"\" ng-if=\"::column.type == $ctrl._ColumnType.NUMBER && column.getEditable()\" ng-click=\"column.editContent($event, content)\" ng-class=\"{\'md-placeholder\': !column.getFractionedNumber(content)}\">{{column.getFractionedNumber(content) || column.getPlaceholder()}}</td><td md-cell=\"\" ng-repeat-end=\"\" ng-if=\"::column.type != $ctrl._ColumnType.TEXT && column.type != $ctrl._ColumnType.NUMBER\"><span ng-if=\"::column.type == $ctrl._ColumnType.MENU && !column.getEditable()\">{{::column.getOptionLabel(content[column.field])}}</span><md-select ng-if=\"::column.type == $ctrl._ColumnType.MENU && column.getEditable()\" ng-model=\"::content[column.field]\" placeholder=\"{{::column.getPlaceholder()}}\" aria-label=\"select\"><md-option ng-value=\"option\" ng-repeat=\"option in ::column.options\">{{::column.getOptionLabel(option)}}</md-option></md-select><span ng-if=\"::column.type == $ctrl._ColumnType.BOOLEAN && !column.getEditable()\">{{::content[column.field]? column.getTrueLabel():column.getFalseLabel()}}</span><md-select ng-if=\"::column.type == $ctrl._ColumnType.BOOLEAN && column.getEditable()\" ng-model=\"::content[column.field]\" aria-label=\"select\"><md-option ng-value=\"true\">{{::column.getTrueLabel() | translate}}</md-option><md-option ng-value=\"false\">{{::column.getFalseLabel() | translate}}</md-option></md-select></td><td ng-show=\"::$ctrl._hasActions\" md-cell=\"\" ng-transclude=\"actions\"></td></tr></tbody></table></md-table-container><md-table-pagination ng-if=\"::$ctrl._pagination\" md-limit=\"$ctrl._pagination.getRowsPerPage()\" md-page=\"$ctrl._pagination.currentPage\" md-total=\"{{$ctrl._pagination.getTotalRows()}}\" md-on-paginate=\"$ctrl.onPaginate\"></md-table-pagination></div><div class=\"responsive-mode\" ng-if=\"!$ctrl._showTable && $ctrl.hasColumns()\" layout-margin=\"\" hub-infinite-scroll=\"\" previous-page=\"$ctrl._pagination.getPrevious(done)\" next-page=\"$ctrl._pagination.getNext(done)\"><div hub-row=\"\" md-whiteframe=\"2\" ng-repeat=\"content in $ctrl.contents track by $index\"><div class=\"padding-right-10 padding-top-10 opacity-50\" layout=\"\" layout-align=\"end\"><span ng-if=\"::$ctrl._id\">{{::content[$ctrl._id.field]}}</span> <span ng-if=\"::!$ctrl._id\">#{{::$index}}</span></div><md-list><md-list-item class=\"column\" ng-repeat=\"column in ::$ctrl._columns\" layout=\"\" layout-align=\"space-between center\"><span flex=\"50\" class=\"column-name md-body-2\">{{::column.name | translate}}</span><div flex=\"50\" class=\"column-value\"><span ng-if=\"::column.type == $ctrl._ColumnType.TEXT && !column.getEditable()\">{{::content[column.field]}}</span><md-input-container md-no-float=\"\" ng-if=\"::column.type == $ctrl._ColumnType.TEXT && column.getEditable()\"><input name=\"input\" ng-model=\"content[column.field]\" placeholder=\"{{::column.getPlaceholder()}}\" type=\"text\"></md-input-container><span ng-if=\"::column.type == $ctrl._ColumnType.NUMBER && !column.getEditable()\">{{::column.getFractionedNumber(content)}}</span><md-input-container md-no-float=\"\" ng-if=\"::column.type == $ctrl._ColumnType.NUMBER && column.getEditable()\"><input name=\"input\" ng-model=\"content[column.field]\" placeholder=\"{{::column.getPlaceholder()}}\" type=\"number\" step=\"any\"></md-input-container><span ng-if=\"::column.type == $ctrl._ColumnType.MENU && !column.getEditable()\">{{::column.getOptionLabel(content[column.field])}}</span><md-select ng-if=\"::column.type == $ctrl._ColumnType.MENU && column.getEditable()\" ng-model=\"::content[column.field]\" placeholder=\"{{::column.getPlaceholder()}}\" aria-label=\"select\"><md-option ng-value=\"option\" ng-repeat=\"option in ::column.options\">{{::column.getOptionLabel(option)}}</md-option></md-select><span ng-if=\"::column.type == $ctrl._ColumnType.BOOLEAN && !column.getEditable()\">{{::content[column.field]? column.getTrueLabel():column.getFalseLabel()}}</span><md-select ng-if=\"::column.type == $ctrl._ColumnType.BOOLEAN && column.getEditable()\" ng-model=\"::content[column.field]\" aria-label=\"select\"><md-option ng-value=\"true\">{{::column.getTrueLabel() | translate}}</md-option><md-option ng-value=\"false\">{{::column.getFalseLabel() | translate}}</md-option></md-select></div></md-list-item></md-list><div ng-show=\"::$ctrl._hasActions\" layout=\"\" layout-align=\"end center\" ng-transclude=\"actions\"></div></div><div ng-if=\"$ctrl._showProgress\" layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div></div><div hide=\"\" ng-transclude=\"\"></div>");
$templateCache.put("components/toolbars/toolbar.tmpl.html","<div class=\"md-toolbar-tools\"><md-button class=\"md-icon-button\" ng-if=\"!vm.hideMenuButton()\" ng-click=\"vm.openSideNav(\'left\')\" aria-label=\"side navigation\"><md-icon md-font-icon=\"zmdi zmdi-menu\"></md-icon></md-button><h2 hide-xs=\"\" flex=\"\"><span ng-repeat=\"crumb in vm.breadcrumbs.crumbs\"><span translate=\"\">{{crumb.name}}</span><md-icon md-font-icon=\"zmdi zmdi-chevron-right\" ng-if=\"!$last\"></md-icon></span></h2><md-button class=\"md-icon-button toolbar-button\" ng-click=\"vm.toggleFullScreen()\" aria-label=\"toggle fullscreen\"><md-icon md-font-icon=\"\" ng-class=\"vm.fullScreenIcon\"></md-icon></md-button><md-menu><md-button class=\"md-icon-button\" aria-label=\"language\" ng-click=\"$mdOpenMenu()\"><md-icon md-font-icon=\"zmdi zmdi-globe-alt\"></md-icon></md-button><md-menu-content width=\"3\"><md-menu-item ng-repeat=\"language in ::vm.languages\"><md-button ng-click=\"vm.switchLanguage(language.key)\" translate=\"{{::language.name}}\" aria-label=\"{{::language.name}}\"></md-button></md-menu-item></md-menu-content></md-menu><md-button class=\"md-icon-button toolbar-button animated\" ng-click=\"vm.toggleNotificationsTab(0)\" aria-label=\"side navigation\"><md-icon md-font-icon=\"zmdi zmdi-email\"></md-icon><span class=\"toolbar-button-badge animated\" theme-background=\"accent\" ng-class=\"{ \'toolbar-button-badge-new\' : vm.emailNew }\">5</span></md-button><md-button class=\"md-icon-button toolbar-button\" ng-click=\"vm.toggleNotificationsTab(1)\"><md-icon md-font-icon=\"fa fa-bell-o\"></md-icon><span class=\"toolbar-button-badge\" theme-background=\"accent\">2</span></md-button><md-menu><md-button aria-label=\"Open user menu\" ng-click=\"$mdOpenMenu()\"><img class=\"toolbar-user-avatar\" src=\"assets/images/user.png\"> User</md-button><md-menu-content width=\"4\"><md-menu-item><md-button ng-click=\"vm.toggleNotificationsTab(2)\" aria-label=\"side navigation\"><md-icon md-font-icon=\"zmdi zmdi-settings\"></md-icon><span translate=\"ADMIN.TOOLBAR.SETTINGS\"></span></md-button></md-menu-item><md-menu-item><md-button href=\"#/profile\" aria-label=\"side navigation\"><md-icon md-font-icon=\"zmdi zmdi-account\"></md-icon><span translate=\"ADMIN.TOOLBAR.PROFILE\"></span></md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item><md-button href=\"#/login\" aria-label=\"side navigation\"><md-icon md-font-icon=\"zmdi zmdi-sign-in\"></md-icon><span translate=\"ADMIN.TOOLBAR.LOGOUT\"></span></md-button></md-menu-item></md-menu-content></md-menu></div>");
$templateCache.put("components/widget/widget.tmpl.html","<div class=\"widget md-whiteframe-z2\" ng-class=\"::{\'widget-overlay-title\': vm.overlayTitle}\" flex=\"\" layout=\"{{vm.widgetLayout}}\"><div class=\"widget-title\" ng-if=\"::(vm.title || vm.subtitle)\" layout=\"row\" layout-padding=\"\" layout-align=\"space-between center\" flex-order=\"{{vm.titleOrder}}\"><div layout=\"column\" ng-if=\"::vm.avatar\"><img ng-src=\"{{::vm.avatar}}\" class=\"widget-avatar\"></div><div flex=\"\" layout=\"column\"><h3 class=\"md-subhead\" ng-if=\"::vm.title\" translate=\"\">{{::vm.title}}</h3><p class=\"md-body-1\" ng-if=\"::vm.subtitle\" translate=\"\">{{::vm.subtitle}}</p></div><md-menu ng-if=\"::vm.menu\"><md-button class=\"widget-button md-icon-button\" ng-click=\"$mdOpenMenu()\" aria-label=\"open menu\"><md-icon md-font-icon=\"{{::vm.menu.icon}}\"></md-icon></md-button><md-menu-content><md-menu-item ng-repeat=\"item in ::vm.menu.items\"><md-button ng-click=\"item.click($event)\"><md-icon ng-if=\"::item.icon\" md-font-icon=\"{{::item.icon}}\"></md-icon><span translate=\"\">{{::item.title}}</span></md-button></md-menu-item></md-menu-content></md-menu></div><div class=\"widget-content\" layout=\"{{vm.contentLayout}}\" layout-align=\"{{vm.contentLayoutAlign}}\" ng-class=\"{\'layout-padding\': vm.contentPadding}\" ng-transclude=\"\" flex-order=\"{{vm.contentOrder}}\"></div><div class=\"widget-loading ng-hide\" ng-show=\"vm.loading\" layout=\"\" layout-fill=\"\" layout-align=\"center center\"><div class=\"widget-loading-inner\" ng-show=\"vm.loading\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div></div></div>");
$templateCache.put("layouts/default/default-no-scroll.tmpl.html","<div layout=\"row\" class=\"full-height\"><md-sidenav class=\"admin-sidebar-left md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"layout.sideMenuSize !== \'hidden\' && $mdMedia(\'gt-sm\')\" ui-view=\"sidebarLeft\" ng-class=\"{ \'admin-sidebar-collapsed\': layout.sideMenuSize == \'icon\' }\" ng-mouseover=\"layoutController.activateHover()\" ng-mouseleave=\"layoutController.removeHover()\"></md-sidenav><div id=\"admin-panel\" layout=\"column\" flex=\"\"><hub-loader></hub-loader><md-toolbar class=\"admin-toolbar\" ui-view=\"toolbar\" ng-class=\"[layout.toolbarSize,layout.toolbarClass]\"></md-toolbar><div ui-view=\"content\" layout=\"column\" flex=\"\" class=\"overflow-hidden\"></div><div ui-view=\"belowContent\"></div></div><md-sidenav layout=\"\" layout-fill=\"\" class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"notifications\" ui-view=\"sidebarRight\"></md-sidenav></div>");
$templateCache.put("layouts/default/default.tmpl.html","<div layout=\"row\" class=\"full-height\"><md-sidenav class=\"admin-sidebar-left md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"layout.sideMenuSize !== \'hidden\' && $mdMedia(\'gt-sm\')\" ui-view=\"sidebarLeft\" ng-class=\"{ \'admin-sidebar-collapsed\': layout.sideMenuSize == \'icon\' }\" ng-mouseover=\"layoutController.activateHover()\" ng-mouseleave=\"layoutController.removeHover()\"></md-sidenav><div id=\"admin-panel\" layout=\"column\" flex=\"\"><hub-loader></hub-loader><md-toolbar class=\"admin-toolbar\" ng-if=\"layout.showToolbar\" ui-view=\"toolbar\" ng-class=\"[layout.toolbarSize,layout.toolbarClass]\"></md-toolbar><md-content ng-class=\"layout.contentClass\" flex=\"\" hub-default-content=\"\" ui-view=\"content\"></md-content><div ui-view=\"belowContent\"></div></div><md-sidenav layout=\"\" layout-fill=\"\" class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"notifications\" ui-view=\"sidebarRight\"></md-sidenav></div>");}]);
(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table', []);
})();

(function () {
    'use strict';

    hubColumnController.$inject = ["Column", "$attrs"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumn', hubColumn());

    /**
     * @ngdoc component
     * @name hubColumn
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column` configure a basic text column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <!--can use ng-translate key directly-->
     *     <hub-column name="CONTENTS.DESCRIPTION" field="description"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubColumn() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@'
            },
            controller: hubColumnController
        };
    }

    /* @ngInject */
    function hubColumnController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.TEXT);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();

(function () {
    'use strict';

    hubColumnNumberController.$inject = ["Column", "$attrs"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnNumber', hubColumnNumber());

    /**
     * @ngdoc component
     * @name hubColumnNumber
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-number` configure a numbered column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {number=} fractionSize number of decimal places to round the number to. By default 0.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-number name="Comments" field="numComments"></hub-column>
     *     <hub-column-number name="Comments" field="numComments" fraction-size="2"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubColumnNumber() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                fractionSize: '@'
            },
            controller: hubColumnNumberController
        };

    }

    /* @ngInject */
    function hubColumnNumberController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.NUMBER);
            column.setFractionSize(Number($ctrl.fractionSize));
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();

(function () {
    'use strict';

    hubColumnMenuController.$inject = ["Column", "$attrs", "$element"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnMenu', hubColumnMenu());

    /**
     * @ngdoc component
     * @name hubColumnMenu
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-menu` configure a inline-menu column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {expression=} options array of options. Can use any type of data(strings,number,objects...)
     * @param {string=} optionLabelField optional, if `options` is array of objects, can set the field name of objects to use his value as a label.
     * @param {string=} placeholder optional, label shown when column no has value.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-menu name="menu" field="menu" options="vm.options"></hub-column-menu>
     *     <hub-column-menu name="menuObject" field="menuObject" options="vm.optionsObject" option-label-field="label" placeholder="Complex"></hub-column-menu>
     * </hub-table>
     * </hljs>
     */

    function hubColumnMenu() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                options: '=',
                optionLabelField: '@',
                placeholder: '@'
            },
            controller: hubColumnMenuController
        };

    }

    /* @ngInject */
    function hubColumnMenuController(Column, $attrs, $element) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.MENU);
            column.setOptions($ctrl.options);
            column.setOptionLabelField($ctrl.optionLabelField);
            column.setPlaceholder($ctrl.placeholder);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();

(function () {
    'use strict';

    hubColumnIdController.$inject = ["Column", "$attrs"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnId', hubColumnId());

    /**
     * @ngdoc component
     * @name hubColumnId
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-id` configure the id column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-id name="id" field="idContent"></hub-column>
     *     <!--can use ng-translate key directly-->
     *     <hub-column name="CONTENTS.ID" field="idContent"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubColumnId() {
        var directive = {
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@'
            },
            controller: hubColumnIdController
        };

        return directive;
    }

    /* @ngInject */
    function hubColumnIdController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.TEXT);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addId(column);
        };
    }
})();

(function () {
    'use strict';

    ColumnModelService.$inject = ["$filter", "$mdEditDialog"];
    angular
        .module('hubangular.components.responsive-table')
        .factory('Column', ColumnModelService);

    /* @ngInject */
    function ColumnModelService($filter, $mdEditDialog) {

        function ColumnFactory(name, field, type) {
            var column;

            switch (type) {
                case ColumnFactory.TYPE.NUMBER:
                    column = new NumberColumn(name, field, type);
                    break;
                case ColumnFactory.TYPE.BOOLEAN:
                    column = new BooleanColumn(name, field, type);
                    break;
                case ColumnFactory.TYPE.MENU:
                    column = new MenuColumn(name, field, type);
                    break;
                default:
                    column = new TextColumn(name, field, type);
                    break;
            }

            return column;
        }

        //constants
        ColumnFactory.TYPE = {
            TEXT: 0,
            NUMBER: 1,
            BOOLEAN: 2,
            MENU: 3
        };
        ColumnFactory._baseClass = Column;
        
        //region Column
        function Column(name, field, type) {
            this.name = name;
            this.field = field;
            this.type = type;
            this.editable = false;
            this.placeholder = "enter value...";
        }

        Column.prototype.getType = function () {
            return this.type;
        };

        Column.prototype.setEditable = function (editable) {
            if (angular.isDefined(editable)) {
                this.editable = editable;
            }
        };

        Column.prototype.getEditable = function () {
            return this.editable;
        };


        Column.prototype.setPlaceholder = function (placeholder) {
            if (angular.isDefined(placeholder))
                this.placeholder = placeholder;
        };

        Column.prototype.getPlaceholder = function () {
            return this.placeholder;
        };
        //endregion

        //region TextColumn
        function TextColumn(name, field, type) {
            Column.call(this, name, field, type);
        }

        inheritFrom(Column, TextColumn);

        TextColumn.prototype.editContent = function ($event, content) {
            $event.stopPropagation();
            var that = this;
            $mdEditDialog.small({
                modelValue: content[that.field],
                placeholder: that.getPlaceholder(),
                save: function (input) {
                    content[that.field] = input.$modelValue;
                },
                targetEvent: $event,
                title: that.getPlaceholder()
            });
        };
        //endregion

        //region NumberColumn
        function NumberColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.fractionSize = -1;
        }

        inheritFrom(Column, NumberColumn);

        NumberColumn.prototype.setFractionSize = function (fractionSize) {
            if (angular.isDefined(fractionSize) && !isNaN(fractionSize) && angular.isNumber(fractionSize))
                this.fractionSize = fractionSize;
        };

        NumberColumn.prototype.getFractionedNumber = function (content) {
            var number = content[this.field];

            if (this.fractionSize >= 0) {
                number = $filter('number')(content[this.field], this.fractionSize);
            }

            return number;
        };

        NumberColumn.prototype.editContent = function ($event, content) {
            $event.stopPropagation();
            var that = this;
            $mdEditDialog.small({
                modelValue: content[that.field],
                placeholder: that.getPlaceholder(),
                save: function (input) {
                    content[that.field] = input.$modelValue;
                },
                targetEvent: $event,
                title: that.getPlaceholder(),
                type: "number",
                validators: {
                    "step": "any"
                }
            });
        };
        //endregion

        //region MenuColumn
        function MenuColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.options = [];
            this.optionLabel = "";
        }

        inheritFrom(Column, MenuColumn);

        MenuColumn.prototype.setOptions = function (options) {
            if (angular.isArray(options)) {
                this.options = options;
            }
        };

        MenuColumn.prototype.setOptionLabelField = function (label) {
            if (angular.isDefined(label)) {
                this.optionLabel = label;
            }
        };

        MenuColumn.prototype.getOptionLabel = function (option) {
            var optionLabel;

            if (option !== undefined)
                optionLabel = this.optionLabel ? option[this.optionLabel] : option;
            else
                optionLabel = this.getPlaceholder();

            return optionLabel;
        };
        //endregion

        //region BooleanColumn
        function BooleanColumn(name, field, type) {
            Column.call(this, name, field, type);
            this.trueLabel = "Yes";
            this.falseLabel = "No";
        }

        inheritFrom(Column, BooleanColumn);

        BooleanColumn.prototype = new Column();

        BooleanColumn.prototype.setTrueLabel = function (label) {
            if (angular.isDefined(label))
                this.trueLabel = label;
        };

        BooleanColumn.prototype.getTrueLabel = function () {
            return this.trueLabel;
        };

        BooleanColumn.prototype.setFalseLabel = function (label) {
            if (angular.isDefined(label))
                this.falseLabel = label;
        };

        BooleanColumn.prototype.getFalseLabel = function () {
            return this.falseLabel;
        };
        //endregion

        return ColumnFactory;
    }
})();

(function () {
    'use strict';

    hubColumnBooleanController.$inject = ["Column", "$attrs"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnBoolean', hubColumnBoolean());

    /**
     * @ngdoc component
     * @name hubColumnBoolean
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-boolean` configure a boolean column for `hub-table`
     *
     * @param {string=} name text show on table header. Can set a ng-translate key to localization label.
     * @param {string=} field the field name of the object use to represent row in hub-table's contents.
     * @param {string=} trueLabel optional, set label to show the "true" value. Can set a ng-translate key to localization label.
     * @param {string=} falseLabel optional, set label to show the "false" value. Can set a ng-translate key to localization label.
     * @param {string=} editable optional, if `editable` attribute exist or have any value, the column will be editable.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column-boolean name="boolean" field="boolean"></hub-column-boolean>
     *     <hub-column-boolean name="boolean2" field="boolean2" true-label="Si" false-label="No"></hub-column-boolean>
     * </hub-table>
     * </hljs>
     */
    /* @ngInject */
    function hubColumnBoolean() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                name: '@',
                field: '@',
                trueLabel: '@',
                falseLabel: '@'
            },
            controller: hubColumnBooleanController
        };
    }

    /* @ngInject */
    function hubColumnBooleanController(Column, $attrs) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var column = new Column($ctrl.name, $ctrl.field, Column.TYPE.BOOLEAN);
            column.setTrueLabel($ctrl.trueLabel);
            column.setFalseLabel($ctrl.falseLabel);
            column.setEditable(!!("editable" in $attrs));
            $ctrl.hubTableController.addColumn(column);
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('hubangular.components.responsive-table')
        .component('hubColumnAction', hubColumn());

    /**
     * @ngdoc component
     * @name hubColumnAction
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-column-action` configure an action button for a `hub-table`'s row
     *
     * @param {string=} text the field name of the object use to represent row in hub-table's contents.
     * @param {string=} action callback on click button. Get row object as a param.
     * @param {string=} icon optional, name of icon use to represent action button. This overwrite button text.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <!--can use ng-translate key directly-->
     *     <hub-column-action text="save" action="vm.saveAction(row)"></hub-column-action>
     * </hub-table>
     * </hljs>
     */
    function hubColumn() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable",
                hubRowController: "^hubRow"
            },
            bindings: {
                text: '@',
                icon: '@',
                doAction: '&action'
            },
            controller: HubColumnActionController,
            template: "<md-button ng-class=\"{\'md-icon-button\':!!$ctrl.icon}\" ng-click=\'$ctrl.onClick($event)\'>\n    <md-icon ng-if=\'::$ctrl.icon\' md-font-icon=\'{{::$ctrl.icon}}\'></md-icon>\n    <span ng-if=\'::!$ctrl.icon\'>{{$ctrl.text}}</span>{{column|json}}\n</md-button>"
        };
    }

    /* @ngInject */
    function HubColumnActionController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.action = $ctrl.doAction || angular.noop;
            $ctrl.hubTableController.activeActions();
        };

        $ctrl.onClick = function ($event) {
            $event.preventDefault();
            $ctrl.action({row: $ctrl.hubRowController.getContent()});
        };

    }
})();

(function () {
    'use strict';

    hubTablePaginationController.$inject = ["Pagination"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubTablePagination', hubResponsiveTable());

    /**
     * @ngdoc component
     * @name hubTablePagination
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-table` is a component to create a table that can change to card collection on small screens
     *
     * @param {expression=} rowsPerPage optional, number of rows per page. Default 10
     * @param {expression=} totalRows optional, length of rows. Default table contents length
     * @param {expression=} rowsPerPageOptions optional, array of numbers use to set multiple rows per page. Defaults null
     * @param {expression=} onNextPage optional, event call on perform pagination to next page. Defaults null.
     * @param {expression=} onPreviousPage optional, event call on perform pagination to previous page. Defaults null.
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <hub-column name="description" field="description"></hub-column>
     *     <hub-table-pagination rows-per-page="vm.numRows"></hub-table-pagination>
     * </hub-table>
     * </hljs>
     */
    function hubResponsiveTable() {
        return {
            restrict: 'E',
            require: {
                hubTableController: "^hubTable"
            },
            bindings: {
                rowsPerPage: '<',
                totalRows: '<?',
                rowsPerPageOptions: '<',
                onNextPage: '&',
                onPreviousPage: '&'
            },
            controller: hubTablePaginationController
        };
    }

    /* @ngInject */
    function hubTablePaginationController(Pagination) {
        /* jshint validthis: true */
        var $ctrl = this;

        ////////////////
        $ctrl.$onInit = function () {
            var pagination = new Pagination();
            pagination.setRowsPerPage($ctrl.rowsPerPage);
            pagination.setTotalRows($ctrl.totalRows);
            pagination.setRowsPerPageOptions($ctrl.rowsPerPageOptions);
            pagination.subscribeOnPreviousPage($ctrl.onPreviousPage);
            pagination.subscribeOnNextPage($ctrl.onNextPage);

            $ctrl.hubTableController.setPagination(pagination);
            $ctrl._pagination = pagination;
        };

        $ctrl.$onChanges = function (changes) {
            if (angular.isDefined(changes.totalRows)) {
                $ctrl._pagination.setTotalRows(changes.totalRows.currentValue);
            }
        };
    }

})();

(function () {
    'use strict';

    PaginationModelService.$inject = ["$q", "ChangesEmitter", "$timeout"];
    angular
        .module('hubangular.components.responsive-table')
        .factory('Pagination', PaginationModelService);

    /* @ngInject */
    function PaginationModelService($q, ChangesEmitter, $timeout) {
        var REQUEST_PAGE_TIMEOUT = 30000;
        var DONE_NOOP = function (locals) {
            locals.done(true)
        };

        function Pagination() {
            this.rowsPerPage = 10;
            this.totalRows = 0;
            this.rowsPerPageOptions = null;
            this.onPreviousPage = DONE_NOOP;
            this.onNextPage = DONE_NOOP;
            this.currentPage = 1;
            this.loadedPages = {previous: 1, next: 1};
            this.isFirst = false;
            this.isLast = false;

            this.paginationProgress = new ChangesEmitter();
        }

        //region rows operations
        Pagination.prototype.setRowsPerPage = function (rowsPerPage) {
            if (_.isNumber(rowsPerPage))
                this.rowsPerPage = rowsPerPage;
        };

        Pagination.prototype.getRowsPerPage = function () {
            return this.rowsPerPage;
        };

        Pagination.prototype.setTotalRows = function (totalRows) {
            if (_.isNumber(totalRows)) {
                this.totalRows = totalRows;
            }
        };

        Pagination.prototype.getTotalRows = function () {
            return this.totalRows;
        };

        Pagination.prototype.setRowsPerPageOptions = function (rowsPerPageOptions) {
            if (angular.isDefined(rowsPerPageOptions)) {
                if (!angular.isArray(rowsPerPageOptions) || _.some(rowsPerPageOptions, _.isNaN))
                    throw Error("rows-per-page-options is not an array of numbers");

                this.rowsPerPageOptions = rowsPerPageOptions;
            }
        };

        Pagination.prototype.getRowsPerPageOptions = function () {
            return this.rowsPerPageOptions;
        };
        //endregion
        //region page operations
        Pagination.prototype.setInitialPage = function (page) {
            this.currentPage = page;
            if (!this.isFirst)
                this.isFirst = page === 1;
            if (!this.isLast)
                this.isLast = page * this.getRowsPerPage() === this.getTotalRows();
        };
        //endregion

        //region events
        Pagination.prototype.subscribeOnPreviousPage = function (listenner) {
            if (angular.isFunction(listenner))
                this.onPreviousPage = function (done) {
                    listenner({
                        page: this.loadedPages.previous - 1,
                        rowsPerPage: this.getRowsPerPage(),
                        total: this.getTotalRows(),
                        done: done
                    });
                };
        };

        Pagination.prototype.subscribeOnNextPage = function (listenner) {
            if (angular.isFunction(listenner))
                this.onNextPage = function (done) {
                    listenner({
                        page: this.loadedPages.next + 1,
                        rowsPerPage: this.getRowsPerPage(),
                        total: this.getTotalRows(),
                        done: done
                    });
                };
        };

        /**
         * event to get next page for hub-infinite-scroll
         * @param done
         */
        Pagination.prototype.getNext = function (done) {
            var doneWrapper = this._doneWrapper(done);
            if (!this.isLast && this.totalRows - (this.loadedPages.next + 1) * this.rowsPerPage >= 0) {
                this.isLast = (this.loadedPages.next++) * this.getRowsPerPage() >= this.getTotalRows();
                this.onNextPage(doneWrapper);
            }
            else {
                doneWrapper(true);
            }

            return this.loadedPages.next;
        };

        /**
         * event to get previous page for hub-infinite-scroll
         * @param done
         */
        Pagination.prototype.getPrevious = function (done) {
            var doneWrapper = this._doneWrapper(done);
            if (!this.isFirst && this.loadedPages.previous - 1 >= 1) {
                this.isFirst = (this.loadedPages.previous--) === 1;

                this.onPreviousPage(doneWrapper);
            }
            else {
                doneWrapper(true);
            }
            return this.loadedPages.previous;
        };

        /**
         * event for md-table-pagination
         * @param newPage
         * @param limit
         */
        Pagination.prototype.onPaginate = function (newPage, limit) {
            var numRows = newPage * limit - this.getTotalRows();

            if (!this.isLast && numRows <= this.getRowsPerPage() && this.loadedPages.next < newPage) {
                this.getNext(angular.noop);
            } else if (!this.isFirst && newPage >= 1 && this.loadedPages.previous > newPage) {
                this.getPrevious(angular.noop);
            }
        };

        /**
         * wrapper to emit events when the pagination start or finish
         * @param done callback
         */
        Pagination.prototype._doneWrapper = function (done) {
            //start pagination
            var deferred = $q.defer();

            this.paginationProgress.emit(deferred.promise);

            var requestLimit = $timeout(function () {
                deferred.reject("No get any row for requested page");
            }, REQUEST_PAGE_TIMEOUT);

            //end pagination
            return function (isLimit) {
                $timeout.cancel(requestLimit);
                deferred.resolve(isLimit);
                done(isLimit);
            };
        };

        //endregion
        return Pagination;
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.layouts', [

        ]);
})();
'use strict';

/**
 * @ngdoc function
 * @name AdminController
 * @module hubAngular
 * @kind function
 *
 * @description
 *
 * Handles the admin view
 */
(function() {
    'use strict';

    DefaultLayoutController.$inject = ["$scope", "$timeout", "$window", "hubLayout"];
    angular
        .module('hubangular.layouts')
        .controller('DefaultLayoutController', DefaultLayoutController);

    /* @ngInject */
    function DefaultLayoutController($scope, $timeout, $window, hubLayout) {
        //temporary fix
        var $element = angular.element(document);

        // we need to use the scope here because otherwise the expression in md-is-locked-open doesnt work
        $scope.layout = hubLayout.layout; //eslint-disable-line
        var vm = this;

        vm.activateHover = activateHover;
        vm.removeHover  = removeHover;

        ////////////////

        function activateHover() {
            if(hubLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').addClass('hover');
                $timeout(function(){
                    $window.dispatchEvent(new Event('resize'));
                },300);
            }
        }

        function removeHover () {
            if(hubLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').removeClass('hover');
                $timeout(function(){
                    $window.dispatchEvent(new Event('resize'));
                },300);
            }
        }
    }
})();

(function() {
    'use strict';

    hubDefaultContent.$inject = ["$rootScope", "$compile", "$templateRequest"];
    angular
        .module('hubangular.layouts')
        .directive('hubDefaultContent', hubDefaultContent);

    /* @ngInject */
    function hubDefaultContent ($rootScope, $compile, $templateRequest) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            replace: true,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element) {
            // scroll page to the top when content is loaded (stops pages keeping scroll position even when they have changed url)
            $scope.$on('$stateChangeStart', scrollToTop);

            // when content view has loaded add footer if needed and send mdContentLoaded event
            $scope.$on('$viewContentLoaded', injectFooterUpdateContent);

            ////////////////////////

            function scrollToTop() {
                $element.scrollTop(0);
            }

            function injectFooterUpdateContent() {
                var contentView = $element.find('#admin-panel-content-view');
                var footerElem = contentView.find('#footer');
                if (footerElem.length === 0) {
                    // add footer to the content view
                    $templateRequest('components/footer/footer.tmpl.html')
                    .then(function(template) {
                        // compile template with current scope and add to the content
                        var linkFn = $compile(template);
                        var content = linkFn($scope);
                        contentView.append(content);
                    });

                }
            }
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('hubangular.components', [
            'hubangular.components.responsive-table'
        ]);
})();

(function () {
    'use strict';

    WizardController.$inject = ["$scope", "$timeout"];
    angular
        .module('hubangular.components')
        .directive('hubWizard', hubWizard);

    /* @ngInject */
    function hubWizard() {
        // Usage: <div hub-wizard> (put some forms in here) </div>
        //
        // Creates: Nothing
        //
        var directive = {
            bindToController: true,
            controller: WizardController,
            controllerAs: 'hubWizard',
            restrict: 'A'
        };
        return directive;
    }

    /* @ngInject */
    function WizardController($scope, $timeout) {
        var vm = this;

        var forms = [];
        var totalErrors = 0;
        var fixedErrors = 0;

        vm.currentStep = 0;
        vm.getForm = getForm;
        vm.isFormValid = isFormValid;
        vm.nextStep = nextStep;
        vm.nextStepDisabled = nextStepDisabled;
        vm.prevStep = prevStep;
        vm.prevStepDisabled = prevStepDisabled;
        vm.progress = 0;
        vm.registerForm = registerForm;
        vm.updateProgress = updateProgress;

        ////////////////

        function getForm(index) {
            return forms[index];
        }

        function nextStep() {
            vm.currentStep = vm.currentStep + 1;
        }

        function nextStepDisabled() {
            // get current active form
            var form = $scope.hubWizard.getForm(vm.currentStep);
            var formInvalid = true;
            if (angular.isDefined(form) && angular.isDefined(form.$invalid)) {
                formInvalid = form.$invalid;
            }
            return formInvalid;
        }

        function isFormValid(step) {
            if (angular.isDefined(forms[step])) {
                return forms[step].$valid;
            }
        }

        function prevStep() {
            vm.currentStep = vm.currentStep - 1;
        }

        function prevStepDisabled() {
            return vm.currentStep === 0;
        }

        function registerForm(form) {
            forms.push(form);
        }

        function updateProgress() {
            if (totalErrors > 0) {
                var errors = calculateErrors();
                fixedErrors = totalErrors - errors;

                // calculate percentage process for completing the wizard
                vm.progress = Math.floor((fixedErrors / totalErrors) * 100);
            }
            else {
                vm.progress = 100;
            }
        }

        function calculateErrors() {
            var errorCount = 0;
            for (var form = forms.length - 1; form >= 0; form--) {
                if (angular.isDefined(forms[form].$error)) {
                    for (var error in forms[form].$error) {
                        errorCount += forms[form].$error[error].length;
                    }
                }
            }
            return errorCount;
        }

        // init

        // wait until this tri wizard is ready (all forms registered)
        // then calculate the total errors
        $timeout(function () {
            totalErrors = calculateErrors();
            updateProgress();
        });
    }
})();

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

(function() {
    'use strict';

    widget.$inject = ["$mdTheming"];
    angular
        .module('hubangular.components')
        .directive('hubWidget', widget);

    /* @ngInject */
    function widget ($mdTheming) {
        // Usage:
        //
        // ```html
        // <widget title="'Nice Title'" subtitle="'Subtitle'" avatar="http://myavatar.jpg" title-position="top|bottom|left|right" content-padding overlay-title>content here</widget>
        // ```

        // Creates:
        //
        // Widget for use in dashboards
        var directive = {
            restrict: 'E',
            templateUrl: 'components/widget/widget.tmpl.html',
            transclude: true,
            replace: true,
            scope: {
                title: '@',
                subtitle: '@',
                avatar: '@'
            },
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link
        };
        return directive;

        function link($scope, $element, attrs) {
            // set the value of the widget layout attribute
            $scope.vm.widgetLayout = attrs.titlePosition === 'left' || attrs.titlePosition === 'right' ? 'row' : 'column';
            // set the layout attribute for the widget content
            $scope.vm.contentLayout = angular.isUndefined(attrs.contentLayout) ? 'column' : attrs.contentLayout;
            // set if the layout-padding attribute will be added
            $scope.vm.contentPadding = angular.isDefined(attrs.contentPadding);
            // set the content align
            $scope.vm.contentLayoutAlign = angular.isUndefined(attrs.contentLayoutAlign) ? '' : attrs.contentLayoutAlign;
            // set the order of the title and content based on title position
            $scope.vm.titleOrder = attrs.titlePosition === 'right' || attrs.titlePosition === 'bottom' ? 2 : 1;
            $scope.vm.contentOrder = attrs.titlePosition === 'right' || attrs.titlePosition === 'bottom' ? 1 : 2;
            // set if we overlay the title on top of the widget content
            $scope.vm.overlayTitle = angular.isUndefined(attrs.overlayTitle) ? undefined : true;

            $mdTheming($element);

            if(angular.isDefined(attrs.class)) {
                $element.addClass(attrs.class);
            }

            if(angular.isDefined(attrs.backgroundImage)) {
                $element.css('background-image', 'url(' + attrs.backgroundImage + ')');
            }

            $scope.menuClick = function($event) {
                if(angular.isUndefined($scope.menu.menuClick)) {
                    $scope.menu.menuClick($event);
                }
            };

            // remove title attribute to stop popup on hover
            $element.attr('title', '');
        }
    }

    /* @ngInject */
    function Controller () {
        var vm = this;
        vm.menu = null;
        vm.loading = false;

        this.setMenu = function(menu) {
            vm.menu = menu;
        };

        this.setLoading = function(loading) {
            vm.loading = loading;
        };
    }
})();

(function() {
    'use strict';

    DefaultToolbarController.$inject = ["$scope", "$rootScope", "$mdMedia", "$translate", "$filter", "$mdUtil", "$mdSidenav", "$mdToast", "$timeout", "$document", "hubBreadcrumbsService", "hubSettings", "hubLayout"];
    angular
        .module('hubangular.components')
        .controller('DefaultToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController($scope, $rootScope, $mdMedia, $translate, $filter, $mdUtil, $mdSidenav, $mdToast, $timeout, $document, hubBreadcrumbsService, hubSettings, hubLayout) {
        var vm = this;
        vm.breadcrumbs = hubBreadcrumbsService.breadcrumbs;
        vm.emailNew = false;
        vm.languages = hubSettings.languages;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.switchLanguage = switchLanguage;
        vm.toggleNotificationsTab = toggleNotificationsTab;
        vm.isFullScreen = false;
        vm.fullScreenIcon = 'zmdi zmdi-fullscreen';
        vm.toggleFullScreen = toggleFullScreen;

        // initToolbar();

        ////////////////

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                    .position('bottom right')
                    .hideDelay(500)
                );
            });
        }

        function hideMenuButton() {
            return hubLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-sm');
        }

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('hubSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }

        function toggleFullScreen() {
            vm.isFullScreen = !vm.isFullScreen;
            vm.fullScreenIcon = vm.isFullScreen ? 'zmdi zmdi-fullscreen-exit':'zmdi zmdi-fullscreen';
            // more info here: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            var doc = $document[0];
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement ) {
                if (doc.documentElement.requestFullscreen) {
                    doc.documentElement.requestFullscreen();
                } else if (doc.documentElement.msRequestFullscreen) {
                    doc.documentElement.msRequestFullscreen();
                } else if (doc.documentElement.mozRequestFullScreen) {
                    doc.documentElement.mozRequestFullScreen();
                } else if (doc.documentElement.webkitRequestFullscreen) {
                    doc.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        }

        $scope.$on('newMailNotification', function(){
            vm.emailNew = true;
        });
    }
})();
(function () {
    'use strict';

    hubResponsiveTableController.$inject = ["$window", "$mdMedia", "Column"];
    angular
        .module('hubangular.components.responsive-table')
        .component('hubTable', hubResponsiveTable());

    /**
     * @ngdoc component
     * @name hubTable
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-table` is a component to create a table that can change to card collection on small screens
     *
     * @param {expression=} contents array of objects that represent rows
     * @param {expression=} breakpoints optional, breakpoint to change table. Use $mdMedia syntax. Default value is "gt-sm"
     *
     * @usage
     * <hljs lang="html">
     * <hub-table contents="vm.content" breakpoint="xs">
     *     <hub-column name="id" field="idContent"></hub-column>
     *     <hub-column name="description" field="description"></hub-column>
     * </hub-table>
     * </hljs>
     */
    function hubResponsiveTable() {
        return {
            restrict: 'E',
            transclude: {
                'actions': '?hubColumnAction'
            },
            bindings: {
                contents: '=',
                breakpoint: '<'
            },
            controller: hubResponsiveTableController,
            templateUrl: 'components/responsive-table/table-directive.tmpl.html'
        };
    }

    /* @ngInject */
    function hubResponsiveTableController($window, $mdMedia, Column) {
        /* jshint validthis: true */
        var $ctrl = this;

        //private vars
        $ctrl._id = null;
        $ctrl._columns = [];
        $ctrl._ColumnType = Column.TYPE;
        $ctrl._showTable = true;
        $ctrl._showProgress = false;
        $ctrl._hasActions = false;
        
        //public API
        $ctrl.addId = addId;
        $ctrl.addColumn = addColumn;
        $ctrl.hasColumns = hasColumns;
        $ctrl.getTotalRowsNum = getTotalRowsNum;
        $ctrl.setPagination = setPagination;
        $ctrl.onPaginate = onPaginate;
        $ctrl.activeActions = activeActions;
        
        ////////////////

        $ctrl.$onInit = function () {
            if (angular.isArray($ctrl.contents))
                $ctrl.contents.forEach(function (content, i) {
                    content._idRow = i
                });
            updateShowTable();

            angular.element($window).resize(_.debounce(updateShowTable, 100));
        };

        $ctrl.$onChanges = function (changes) {
            var breakpoint = changes.breakpoint;
            if (breakpoint) {
                if (breakpoint.currentValue != breakpoint.previousValue) {
                    updateShowTable();
                }
            }

            var contents = changes.contents;
            if (contents && contents.currentValue.length > contents.previousValue.length) {
                contents.currentValue.forEach(function (content, i) {
                    content._idRow = i
                });
            }
        };

        function updateShowTable() {
            if (angular.isUndefined($ctrl.breakpoint)) {
                $ctrl.breakpoint = "gt-sm";
            }
            $ctrl._showTable = $mdMedia($ctrl.breakpoint);
        }

        function addColumn(column) {
            if (Column._baseClass.prototype.isPrototypeOf(column))
                $ctrl._columns.push(column);
        }

        function addId(column) {
            if (Column._baseClass.prototype.isPrototypeOf(column))
                $ctrl._id = column;
        }

        function hasColumns() {
            return !!($ctrl._id || $ctrl._columns && $ctrl._columns.length);
        }

        function getTotalRowsNum() {
            return $ctrl.contents ? $ctrl.contents.length : 0;
        }

        function setPagination(pagination) {
            if (pagination.constructor.name === "Pagination") {
                $ctrl._pagination = pagination;
                if ($ctrl._pagination.getTotalRows() === 0)
                    $ctrl._pagination.setTotalRows($ctrl.contents ? $ctrl.contents.length : 0);

                $ctrl._pagination.paginationProgress.subscrive(function (promise) {
                    $ctrl._showProgress = true;
                    $ctrl.progress = promise.then(function () {
                        $ctrl._showProgress = false;
                    });
                });
            }
        }

        function onPaginate(page, limit) {
            $ctrl._pagination.onPaginate(page, limit);
        }

        function activeActions() {
            $ctrl._hasActions = true;
        }
    }
})();

(function () {
    'use strict';

    hubRowController.$inject = ["$scope"];
    angular
        .module('hubangular.components.responsive-table')
        .directive('hubRow', hubRow);

    /**
     * @ngdoc directive
     * @name hubRow
     * @restrict E
     * @module hubangular.components
     *
     * @description
     * `hub-row` is internal helper directive to hold row information and do accessible to other components
     */
    /* @ngInject */
    function hubRow() {
        return {
            require: "^hubTable",
            restrict: 'A',
            controller: hubRowController
        };
    }

    /* @ngInject */
    function hubRowController($scope) {
        /* jshint validthis: true */
        var $ctrl = this;

        $ctrl.getContent = function () {
            //get from table parent
            return $scope.content;
        }
    }
})();

(function() {
    'use strict';

    NotificationsPanelController.$inject = ["$scope", "$mdSidenav", "$state"];
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

(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .provider('hubMenu', menuProvider);


    /* @ngInject */
    function menuProvider() {
        // Provider
        var menuArray = [];

        this.addMenu = addMenu;
        this.removeMenu = removeMenu;
        this.removeAllMenu = removeAllMenu;

        function addMenu(item) {
            menuArray.push(item);
        }

        function removeMenu(state, params) {
            findAndDestroyMenu(menuArray, state, params);
        }

        function removeAllMenu() {
            for (var i = menuArray.length - 1; i >= 0 ; i--) {
                menuArray.splice(i, 1);
            }
        }

        function findAndDestroyMenu(menu, state, params, isChildren) {
            if (menu instanceof Array) {
                for (var i = menu.length - 1; i >= 0 ; i--) {
                    if(menu[i].state === state && angular.equals(menu[i].params, params)) {
                        menu.splice(i, 1);
                        if (!isNaN(isChildren) && !menuArray[isChildren].children.length) {
                            menuArray.splice(isChildren, 1);
                        }
                        break;
                    }
                    else if(angular.isDefined(menu[i].children)) {
                        findAndDestroyMenu(menu[i].children, state, params, i);
                    }
                }
            }
        }

        // Service
        this.$get = function() {
            return {
                menu: menuArray,
                addMenu: addMenu,
                removeMenu: removeMenu,
                removeAllMenu: removeAllMenu
            };
        };
    }
})();


(function () {
    'use strict';

    hubMenuDirective.$inject = ["$mdTheming", "hubColor"];
    hubMenuController.$inject = ["hubMenu"];
    angular
        .module('hubangular.components')
        .directive('hubMenu', hubMenuDirective);

    /* @ngInject */
    function hubMenuDirective($mdTheming, hubColor) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<md-content><hub-menu-item ng-repeat="item in hubMenuController.menu | orderBy:\'priority\'" item="::item"></hub-menu-item></md-content>',
            scope: {},
            controller: hubMenuController,
            controllerAs: 'hubMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var themeName = $mdTheming.defaultTheme();
            if ($element.controller('mdTheme')) {
                themeName = $element.controller('mdTheme')["$mdTheme"];//eslint-disable-line
            }
            
            //TODO: this is a temporal patch, in the future should be changed to $mdColors angular-material service
            var backgroundMenuColorRGB = hubColor.paletteColorToRGB(hubColor.getHueFromTheme(themeName, "primary", "default"));
            $element.css({'background-color': backgroundMenuColorRGB.value});
            $element.children('md-content').css({'background-color': backgroundMenuColorRGB.value});
            
        }
    }

    /* @ngInject */
    function hubMenuController(hubMenu) {
        var hubMenuController = this;
        // get the menu and order it
        hubMenuController.menu = hubMenu.menu;
    }
})();

(function() {
    'use strict';

    MenuController.$inject = ["hubSettings", "hubLayout"];
    angular
        .module('hubangular.components')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(hubSettings, hubLayout) {
        var vm = this;
        vm.layout = hubLayout.layout;
        vm.sidebarInfo = {
            appName: hubSettings.name,
            appLogo: hubSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////
        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            hubLayout.setOption('sideMenuSize', menu);
        }
    }
})();

(function() {
    'use strict';

    hubMenuItemController.$inject = ["$scope", "$mdSidenav", "$state", "$filter", "hubBreadcrumbsService"];
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
(function() {
    'use strict';

    TriLoader.$inject = ["$rootScope"];
    TriLoaderController.$inject = ["$rootScope", "hubLoaderService", "hubSettings"];
    angular
        .module('hubangular.components')
        .directive('hubLoader', TriLoader);

    /* @ngInject */
    function TriLoader ($rootScope) {
        var directive = {
            bindToController: true,
            controller: TriLoaderController,
            controllerAs: 'vm',
            template: '<div flex class="loader" ng-show="vm.status.active" layout="column" layout-fill layout-align="center center"><div class="loader-inner"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div><h3 class="md-headline">{{vm.appName}}</h3></div>',
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
            }
        };
        return directive;

        function link($scope) {
            var loadingListener = $rootScope.$on('$viewContentLoading', function() {
                $scope.vm.setLoaderActive(true);
            });

            var loadedListener = $rootScope.$on('$viewContentLoaded', function() {
                $scope.vm.setLoaderActive(false);
            });

            $scope.$on('$destroy', removeListeners);

            function removeListeners() {
                loadingListener();
                loadedListener();
            }
        }
    }

    /* @ngInject */
    function TriLoaderController ($rootScope, hubLoaderService, hubSettings) {
        var vm = this;
        vm.appName         = hubSettings.name;
        vm.status          = hubLoaderService.status;
        vm.setLoaderActive = hubLoaderService.setLoaderActive;
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .service('hubLoaderService', LoaderService);

    /* @ngInject */
    function LoaderService() {
        var vm = this;

        vm.status = {
            active: true
        };
        vm.setLoaderActive = setLoaderActive;

        ////////////////

        function setLoaderActive(active) {
            vm.status.active = active;
        }
    }
})();
(function() {
    'use strict';

    FooterController.$inject = ["hubSettings", "hubLayout"];
    angular
        .module('hubangular.components')
        .controller('FooterController', FooterController);

    /* @ngInject */
    function FooterController(hubSettings, hubLayout) {
        var vm = this;
        vm.name = hubSettings.name;
        vm.copyright = hubSettings.copyright;
        vm.layout = hubLayout.layout;
        vm.version = hubSettings.version;
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.components')
        .service('hubBreadcrumbsService', BreadcrumbsService);

    /* @ngInject */
    function BreadcrumbsService() {
        this.breadcrumbs = {
            crumbs: []
        };
        this.addCrumb = addCrumb;
        this.reset = reset;

        ////////////////

        function addCrumb(item) {
            this.breadcrumbs.crumbs.unshift(item);
        }

        function reset() {
            this.breadcrumbs.crumbs = [];
        }
    }
})();

(function() {
    'use strict';

    runFunction.$inject = ["$rootScope", "$window", "$state", "$filter", "$translate", "$timeout", "hubRoute", "hubBreadcrumbsService"];
    angular
        .module('hubangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, $state, $filter, $translate, $timeout, hubRoute, hubBreadcrumbsService) {
        var breadcrumbs = hubBreadcrumbsService.breadcrumbs;
        init();

        var destroyOn = $rootScope.$on('$stateChangeSuccess', function(){
            setFullTitle();
        });

        $rootScope.$on('$destroy', function(){
            destroyOn();
        });

        function setFullTitle() {
            $timeout(function(){
                var title = hubRoute.title;
                angular.forEach(breadcrumbs.crumbs, function(crumb){
                    title +=' ' + hubRoute.separator + ' ' + $filter('translate')(crumb.name);
                });
                $window.document.title = title;
            });
        }

        function init() {
            setFullTitle();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular')
        .provider('hubRoute', routeProvider);

    /* @ngInject */
    function routeProvider() {
        // Provider
        var settings = {
            docTitle: '',
            separator: ''
        };

        this.setTitle = setTitle;
        this.setSeparator = setSeparator;
        this.$get = routeHelper;

        function setTitle(title) {
            settings.docTitle = title;
        }

        function setSeparator(separator) {
            settings.separator = separator;
        }

        // Service
        function routeHelper() {
            return {
                title: settings.docTitle,
                separator: settings.separator
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.router', [

        ]);
})();
(function() {
    'use strict';

    angular
        .module('hubangular.profiler', [
            'digestHud'
        ]);
})();
(function() {
    'use strict';

    profilerConfig.$inject = ["digestHudProvider"];
    angular
        .module('hubangular.profiler')
        .config(profilerConfig);

    /* @ngInject */
    function profilerConfig(digestHudProvider) {
        digestHudProvider.enable();

        // Optional configuration settings:
        digestHudProvider.setHudPosition('top right'); // setup hud position on the page: top right, bottom left, etc. corner
        digestHudProvider.numTopWatches = 20;  // number of items to display in detailed table
        digestHudProvider.numDigestStats = 25;  // number of most recent digests to use f
    }
})();
(function() {
    'use strict';

    layoutRunner.$inject = ["$rootScope", "hubLayout"];
    angular
        .module('hubangular')
        .run(layoutRunner)
        .provider('hubLayout', layoutProvider);

    /* @ngInject */
    function layoutProvider() {
        var layoutDefaults = {
            toolbarSize: 'default',
            toolbarShrink: true,
            toolbarClass: '',
            contentClass: '',
            innerContentClass: '',
            sideMenuSize: 'full',
            footer: true
        };
        var layout = {};

        this.getDefaultOption = getDefaultOption;
        this.setDefaultOption = setDefaultOption;

        function getDefaultOption(name) {
            return layoutDefaults[name];
        }

        function setDefaultOption(name, value) {
            layoutDefaults[name] = value;
        }

        // init

        angular.extend(layout, layoutDefaults);

        // Service
        this.$get = function() {
            function setOption(name, value) {
                layout[name] = value;
            }

            function updateLayoutFromState(event, toState) {
                // reset classes
                for(var option in layoutDefaults) {
                    layout[option] = layoutDefaults[option];
                }
                var layoutOverrides = angular.isDefined(toState.data) && angular.isDefined(toState.data.layout) ? toState.data.layout : {};
                angular.extend(layout, layoutDefaults, layoutOverrides);
            }

            return {
                layout: layout,
                setOption: setOption,
                updateLayoutFromState: updateLayoutFromState
            };
        };
    }

    /* @ngInject */
    function layoutRunner($rootScope, hubLayout) {
        // check for $stateChangeStart and update the layouts if we have data.layout set
        // if nothing set reset to defaults for every state
        var destroyOn = $rootScope.$on('$stateChangeStart', hubLayout.updateLayoutFromState);
        $rootScope.$on('$destroy', removeWatch);

        /////////////

        function removeWatch() {
            destroyOn();
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('hubangular.helpers', [

        ]);
})();

(function () {
    'use strict';

    hubInfiniteScrollDirective.$inject = ["$timeout", "$window"];
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

(function () {
    'use strict';

    hubColorProvider.$inject = ["$mdThemingProvider"];
    angular
        .module('hubangular.helpers')
        .provider('hubColor', hubColorProvider);

    /**
     * @ngdoc service
     * @name hubColorProvider
     * @module hubangular.helpers
     *
     * @description
     * service to access materials colors api more easy.
     *
     * @usage
     * <hljs lang="javascript">
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromPalette('cyan', '500'));
     *
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme('cyan-theme', 'primary'));
     *
     * var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme('cyan-theme', 'primary','hue-2'));
     * </hljs>
     */
    /* @ngInject */
    function hubColorProvider($mdThemingProvider) {

        var arrayToRGB = $mdThemingProvider._rgba;
        var palettes = $mdThemingProvider._PALETTES;
        var themes = $mdThemingProvider._THEMES;

        return {
            $get: function () {
                return {
                    getHueFromPalette: getHueFromPalette,
                    getHueFromTheme: getHueFromTheme,
                    paletteColorToRGB: paletteColorToRGB,
                    paletteColorToHex: paletteColorToHex,
                    getPalette: getPalette
                };
            }
        };

        //////////////

        /**
         * Get hue value and contrast from palette
         *
         * @param palette {Object|String} palette or name of palette
         * @param hue {String} optional
         * @returns {Object} palette color with value and contrast. If not found return undefined
         */
        function getHueFromPalette(palette, hue) {
            var paletteColor = hue || "500";
            if (angular.isDefined(palette)) {
                var targetPalette = typeof palette === "string" ? getPalette(palette) : palette;
                if (angular.isDefined(targetPalette[paletteColor])) {
                    return targetPalette[paletteColor];
                }
            }
        }

        /**
         * Get  hue value and contrast from theme
         *
         * @param themeName {String} name of theme
         * @param intentName {String} theme's palette. possibles values: primary, accent, warn and background
         * @param hue {String} theme's palette hue. possibles values: default, hue-1, hue-2, hue-3
         * @returns {Object} palette color with value and contrast. If not found return undefined
         */
        function getHueFromTheme(themeName, intentName, hue) {
            if (angular.isDefined(themes[themeName]) && angular.isDefined(themes[themeName].colors[intentName])) {
                var intentPalette = themes[themeName].colors[intentName];
                if (angular.isDefined(intentPalette)) {
                    var intentHue = hue || "default";
                    return getHueFromPalette(palettes[intentPalette.name], intentPalette.hues[intentHue]);
                }
            }
        }

        /**
         * transform palette color to "rgb(0,0,0)" string format
         *
         * @param {Object} paletteColor
         * @returns {Object} palette color with value and contrast to "rgb(0,0,0)". If not found return undefined
         */
        function paletteColorToRGB(paletteColor) {
            if (angular.isDefined(paletteColor) && angular.isArray(paletteColor.value) && angular.isArray(paletteColor.contrast)) {
                return {
                    value: arrayToRGB(paletteColor.value),
                    contrast: arrayToRGB(paletteColor.contrast)
                }
            }
        }

        function valueToHex(value) {
            var stringValue = value.toString(16);
            return ('00' + stringValue).substring(stringValue.length);
        }

        /**
         * transform palette color to "#000000" string format
         *
         * @param {Object} paletteColor
         * @returns {Object} palette color with value and contrast to "#000000". If not found return undefined
         */
        function paletteColorToHex(paletteColor) {
            if (angular.isDefined(paletteColor) && angular.isArray(paletteColor.value) && angular.isArray(paletteColor.contrast)) {
                return {
                    value: "#" + valueToHex(paletteColor.value[0]) + valueToHex(paletteColor.value[1]) + valueToHex(paletteColor.value[2]),
                    contrast: "#" + valueToHex(paletteColor.contrast[0]) + valueToHex(paletteColor.contrast[1]) + valueToHex(paletteColor.contrast[2])
                }
            }
        }

        /**
         * get palette by name
         *
         * @param paletteName
         * @returns {Object} the palette. If not found return undefined
         */
        function getPalette(paletteName) {
            return palettes[paletteName];
        }
    }
})();

(function () {
    'use strict';

    eventChangeEmitter.$inject = ["$rootScope"];
    angular
        .module('hubangular.helpers')
        .service('ChangesEmitter', eventChangeEmitter);

    /**
     * @ngdoc service
     * @name ChangesEmitter
     * @module hubangular.helpers
     *
     * @description
     * very tiny event emitter to communicate changes to any instance without use angular scopes.
     *
     * @usage
     * <hljs lang="javascript">
     * var talk = new ChangeEmitter();
     *
     * var writer = function(sentence){
     *     console.log("hear: " + sentence);
     * };
     * talk.subscribe(writer);
     *
     * talk.emit('Hello World');
     *
     * talk.unsubscrive(writer);
     * </hljs>
     */
    /* @ngInject */
    function eventChangeEmitter($rootScope) {

        function ChangesEmitter() {
            this.observers = [];
        }

        ChangesEmitter.prototype.emit = function (data) {
            this.observers.forEach(function (observe) {
                $rootScope.$evalAsync(function () {
                    observe(data);
                });
            });
        };

        ChangesEmitter.prototype.subscrive = function (observer) {
            this.observers.push(observer);
        };

        ChangesEmitter.prototype.unsubscrive = function (observer) {
            var index = this.observers.indexOf(observer);
            if (index != -1) {
                this.observers.splice(index, 1);
            }
        };

        return ChangesEmitter;
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.directives', [
        ]);
})();
(function () {
    'use strict';

    themeBackground.$inject = ["$mdTheming", "hubColor"];
    angular
        .module('hubangular.directives')
        .directive('themeBackground', themeBackground);


    /**
     * Directive to set background color of theme palette
     * format: [palette-name] : [hue](optional)
     * - palettes names: primary,accent,warn,background
     * - hue values: hue-1,hue-2,hue-3
     *
     * @param $mdTheming
     * @param hubColor
     * @usage
     * <div theme-background="primary:hue-1">Coloured content</div>
     *
     * @ngInject
     */
    function themeBackground($mdTheming, hubColor) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            $mdTheming($element);
            var splitIntent = attrs.themeBackground.split(':');
            var intent = splitIntent[0];
            var hue = splitIntent.length == 2 ? splitIntent[1] : "default";

            var $mdTheme = $element.controller('mdTheme');//eslint-disable-line
            if (angular.isDefined($mdTheme)) {
                // get the color and apply it to the element
                $scope.$on('$destroy', $scope.$watch(function () {
                    return $mdTheme.$mdTheme;
                }, updateColor));

                updateColor($mdTheme.$mdTheme);
            }
            else {
                updateColor($mdTheming.defaultTheme());
            }

            function updateColor(themeName) {
                var color = hubColor.paletteColorToRGB(hubColor.getHueFromTheme(themeName, intent, hue));
                if (angular.isDefined(color)) {
                    $element.css({
                        'background-color': color.value,
                        'border-color': color.value,
                        'color': color.contrast
                    });
                }
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('hubangular.directives')
        .directive('hubSamePassword', samePassword);

    /* @ngInject */
    function samePassword() {
        // Usage:
        //
        // ```html
        // <form name="signup">
        //     <input name="password" type="password" ng-model="user.password" same-password="signup.confirm" />
        //     <input name="confirm" type="password" ng-model="user.confirm" same-password="signup.confirm" />
        // </form>
        // ```
        // Creates:
        //
        // `samePassword` is a directive with the purpose to validate a password input based on the value of another input.
        // When both input values are the same the inputs will be set to valid

        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link,
            scope: {
                hubSamePassword: '='
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$viewChangeListeners.push(function() {
                ngModel.$setValidity('samePassword', scope.hubSamePassword.$modelValue === ngModel.$modelValue);
                scope.hubSamePassword.$setValidity('samePassword', scope.hubSamePassword.$modelValue === ngModel.$modelValue);
            });
        }
    }
})();

(function () {
    'use strict';

    paletteBackground.$inject = ["hubColor"];
    angular
        .module('hubangular.directives')
        .directive('paletteBackground', paletteBackground);

    /**
     * Directive to set background color of palette
     *
     * @param hubColor
     * @usage
     * <div palette-background="red:500">Coloured content</div>
     *
     * @ngInject
     */
    function paletteBackground(hubColor) {

        var directive = {
            bindToController: true,
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var hue = splitColor.length == 2 ? splitColor[1] : "500";
            var color = hubColor.paletteColorToRGB(hubColor.getHueFromPalette(splitColor[0], hue));

            if (angular.isDefined(color)) {
                $element.css({
                    'background-color': color.value,
                    'border-color': color.value,
                    'color': color.contrast
                });
            }
        }
    }
})();

(function () {
    'use strict';

    hubPasswordInputDirective.$inject = ["$compile"];
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

(function () {
    'use strict';

    hubCollapseDirective.$inject = ["$animate", "$timeout"];
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

(function () {
    'use strict';

    hubCollapseAnimation.$inject = ["$animateCss", "$mdMedia"];
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

(function() {
    'use strict';

    countupto.$inject = ["$timeout"];
    angular
        .module('hubangular.directives')
        .directive('countupto', countupto);

    /* @ngInject */
    function countupto($timeout) {
        // Usage:
        //
        // ```html
        // <h1 countupto="100"></h1>
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'countupto': '=',
                'options': '='
            }
        };
        return directive;

        function link($scope, $element, attrs) {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };

            // override default options?
            if ($scope.options) {
                for(var option in options) {
                    if(angular.isDefined($scope.options[option])) {
                        options[option] = $scope.options[option];
                    }
                }
            }

            attrs.from = angular.isUndefined(attrs.from) ? 0 : parseInt(attrs.from);
            attrs.decimals = angular.isUndefined(attrs.decimals) ? 2 : parseFloat(attrs.decimals);
            attrs.duration = angular.isUndefined(attrs.duration) ? 5 : parseFloat(attrs.duration);

            $timeout(function() {
                var numAnim = new CountUp($element[0], attrs.from, $scope.countupto, attrs.decimals, attrs.duration, options);
                numAnim.start();
            }, 500);
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('hubangular')
        .value('googleChartApiConfig', {
            version: '1.1',
            optionalSettings: {
                packages: ['line', 'bar', 'geochart', 'scatter'],
                language: 'en'
            }
        });
})();
/**
 * Created by arodriguezp on 22/08/2016.
 */

/**
 * Hack in support for Function.name for browsers that don't support it.
 * IE, I'm looking at you.
 *
 * http://stackoverflow.com/a/27329618
 **/
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            var funcNameRegex = /function\s([^(]+)\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function (value) {
        }
    });
}

function inheritFrom(parent, child) {
    child.prototype = Object.create(parent.prototype);
}

(function() {
    'use strict';

    angular
        .module('hubangular')
        .provider('hubSettings', settingsProvider);

    /* @ngInject */
    function settingsProvider() {
        // Provider
        var settings = {
            languages: [],
            name: '',
            logo: '',
            copyright: '',
            version: ''
        };

        this.addLanguage = addLanguage;
        this.setLogo = setLogo;
        this.setName = setName;
        this.setCopyright = setCopyright;
        this.setVersion = setVersion;

        function addLanguage(newLanguage) {
            settings.languages.push(newLanguage);
        }

        function setLogo(logo) {
            settings.logo = logo;
        }

        function setName(name) {
            settings.name = name;
        }

        function setCopyright(copy) {
            settings.copyright = copy;
        }

        function setVersion(version) {
            settings.version = version;
        }

        // Service
        this.$get = function() {
            return {
                languages: settings.languages,
                name: settings.name,
                copyright: settings.copyright,
                logo: settings.logo,
                version: settings.version,
                defaultSkin: settings.defaultSkin
            };
        };
    }
})();


(function() {
    'use strict';

    runFunction.$inject = ["$rootScope", "$window"];
    angular
        .module('hubangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window) {
        // add a class to the body if we are on windows
        if($window.navigator.platform.indexOf('Win') !== -1) {
            $rootScope.bodyClasses = ['os-windows'];
        }
    }
})();

(function() {
    'use strict';

    translateConfig.$inject = ["$translateProvider"];
    angular
        .module('hubangular')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig($translateProvider) {
        /**
         *  each module loads its own translation file - making it easier to create translations
         *  also translations are not loaded when they aren't needed
         *  each module will have a i18n folder that will contain its translations
         */
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });

        // make sure all values used in translate are sanitized for security
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // cache translation files to save load on server
        $translateProvider.useLoaderCache(true);

        // store the users language preference in a cookie
        $translateProvider.useLocalStorage();
    }
})();

(function () {
    'use strict';

    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
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
                controller: ["$state", function ($state) {
                    var vm = this;
                    vm.goHome = function () {
                        $state.go('hubangular.admin-default.dashboard-analytics');
                    };
                }]
            })
            .state('500', {
                url: '/500',
                templateUrl: 'templates/500.tmpl.html',
                controllerAs: 'vm',
                controller: ["$state", function ($state) {
                    var vm = this;
                    vm.goHome = function () {
                        $state.go('hubangular.admin-default.dashboard-analytics');
                    };
                }]
            });


        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');
    }
})();
(function() {
    'use strict';

    configSettings.$inject = ["hubSettingsProvider", "hubRouteProvider", "APP_LANGUAGES"];
    angular
        .module('hubangular')
        .config(configSettings);

    /* @ngInject */
    function configSettings(hubSettingsProvider, hubRouteProvider, APP_LANGUAGES) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        hubSettingsProvider.setName('hubangular');
        hubSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' hpe.com');
        hubSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        hubSettingsProvider.setVersion('0.1.x');
        // set the document title that appears on the browser tab
        hubRouteProvider.setTitle('Hubangular');
        hubRouteProvider.setSeparator('|');

        // setup available languages in hubangular
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            hubSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();

(function() {
    'use strict';

    config.$inject = ["hubLayoutProvider"];
    angular
        .module('hubangular')
        .config(config);

    /* @ngInject */
    function config(hubLayoutProvider) {
        hubLayoutProvider.setDefaultOption('toolbarSize', 'default');

        hubLayoutProvider.setDefaultOption('toolbarShrink', false);

        hubLayoutProvider.setDefaultOption('toolbarClass', '');

        hubLayoutProvider.setDefaultOption('contentClass', '');

        hubLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        hubLayoutProvider.setDefaultOption('showToolbar', true);

        hubLayoutProvider.setDefaultOption('footer', true);
    }
})();
(function() {
    'use strict';

    config.$inject = ["ChartJsProvider"];
    angular
        .module('hubangular')
        .config(config);

    /* @ngInject */
    function config(ChartJsProvider) {
        // Configure all charts to use material design colors
        ChartJsProvider.setOptions({
            colours: [
                '#4285F4',    // blue
                '#DB4437',    // red
                '#F4B400',    // yellow
                '#0F9D58',    // green
                '#AB47BC',    // purple
                '#00ACC1',    // light blue
                '#FF7043',    // orange
                '#9E9D24',    // browny yellow
                '#5C6BC0'     // dark blue
            ],
            responsive: true
        });
    }
})();