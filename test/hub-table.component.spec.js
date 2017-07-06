describe("HubTable directive", function () {

    beforeEach(module('hubangular'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$window_) {
        this.compile = _$compile_;
        this.scope = _$rootScope_.$new();
        this.$window = _$window_;
        this.createDirective = _createDirective;
    }));

    beforeEach(function () {
        this.scope.mediaQuery = "gt-xs";
        this.directiveElement = this.createDirective([], "");
    });

    it("create table", function () {
        expect(this.directiveElement).not.toBeUndefined();
        expect(this.directiveElement.isolateScope().$ctrl._showTable).toBeTruthy();
    });

    it("create table in responsive mode", function () {
        this.scope.mediaQuery = "xl";
        this.scope.$digest();
        expect(this.directiveElement).not.toBeUndefined();
        expect(this.directiveElement.isolateScope().$ctrl._showTable).toBeFalsy();
    });

    it("create table with content but without columns", function () {
        this.directiveElement = this.createDirective(createContentHelper(1, 1), "");

        expect(this.directiveElement).not.toBeUndefined();
        expect(this.directiveElement.find("tbody tr").length).toEqual(0);
    });

    it("create table with content and columns", function () {
        this.directiveElement = this.createDirective(createContentHelper(1, 1), createColumnsHelper(1));

        expect(this.directiveElement).not.toBeUndefined();
        expect(this.directiveElement.find("tbody tr").length).toEqual(1);
    });

    it("table must be show 1 column yet content have one more column", function () {
        this.directiveElement = this.createDirective(createContentHelper(1, 2), createColumnsHelper(1));

        expect(this.directiveElement).not.toBeUndefined();
        expect(this.directiveElement.find("tbody tr").length).toEqual(1);
        expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
    });

    ////////////////

    function createContentHelper(numRows, numColumns) {
        var content = [];

        _.times(numRows, function () {
            var elem = {};
            _.times(numColumns, function (n) {
                elem["dummy" + n] = n;
            });
            content.push(elem);
        });

        return content;
    }

    function createColumnsHelper(numColumns) {
        var columns = [];

        _.times(numColumns, function (n) {
            columns.push('<hub-column name="Dummy' + n + '" field="dummy' + n + '"></hub-column>');
        });

        return columns;
    }

    function _createDirective(content, columns) {
        this.scope.content = content;
        this.scope.$digest();
        var element = angular.element('<hub-table contents="content" breakpoint="mediaQuery">' +
            columns +
            '</hub-table>');
        var directive = this.compile(element)(this.scope);
        this.scope.$digest();

        return directive;
    }
});
