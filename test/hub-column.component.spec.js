describe("HubColumn directives", function () {

    beforeEach(module('hubangular'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$window_, _Column_) {
        this.compile = _$compile_;
        this.scope = _$rootScope_.$new();
        this.$window = _$window_;
        this.Column = _Column_;
        this.createDirective = _createDirective;
        this.createColumnHelper = _createColumnHelper;
    }));

    beforeEach(function () {
        this.scope.mediaQuery = "gt-xs";
    });

    describe("id column", function () {
        it("create column", function () {
            var columnHTML = '<hub-column-id name="Dummy" field="dummy"></hub-column-id>';
            this.directiveElement = this.createDirective(columnHTML);
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(0);
            expect(this.directiveElement.isolateScope().$ctrl._id).not.toBeUndefined();
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td span").html() == this.scope.content[0].dummy).toBeTruthy();
        });
    });

    describe("text column", function () {
        it("create column", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.TEXT));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.TEXT);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td").html() == this.scope.content[0].dummy).toBeTruthy();
        });
    });

    describe("boolean column", function () {
        it("create column", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.BOOLEAN));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.BOOLEAN);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td span").html() == "No").toBeTruthy();
        });

        it("create column editable", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.BOOLEAN, true));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.BOOLEAN);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td

            var options = this.directiveElement.find("tbody tr td md-select md-option");
            expect(options.length).toEqual(2);
        });

        it("with custom labels", function () {
            var trueLabel = 'Truthy';
            var falseLabel = 'Falsy';
            var columnHTML = '<hub-column-boolean name="Dummy" field="dummy" true-label="' + trueLabel + '" false-label="' + falseLabel + '"></hub-column-boolean>';
            this.directiveElement = this.createDirective(columnHTML);
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.BOOLEAN);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td span").html() == falseLabel).toBeTruthy();
        });

        it("editable with custom labels", function () {
            var trueLabel = 'Truthy';
            var falseLabel = 'Falsy';
            var columnHTML = '<hub-column-boolean name="Dummy" field="dummy" true-label="' + trueLabel + '" false-label="' + falseLabel + '" editable></hub-column-boolean>';
            this.directiveElement = this.createDirective(columnHTML);
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.BOOLEAN);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            var options = this.directiveElement.find("tbody tr td md-select md-option");
            expect(options.length).toEqual(2);
            expect(options[0].textContent).toEqual(trueLabel);
            expect(options[1].textContent).toEqual(falseLabel);
        });
    });

    describe("menu column", function () {

        it("create column", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.MENU));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.MENU);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td span").html() == this.scope.content[0].dummy).toBeTruthy();
        });

        it("create column editable", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.MENU, true));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.MENU);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td

            var options = this.directiveElement.find("tbody tr td md-select md-option");
            expect(options.length).toEqual(this.scope.options.length);
            this.scope.options.forEach(function (option, i) {
                expect(options.children().eq(i).html() == option).toBeTruthy();
            })
        });
    });


    describe("number column", function () {
        it("create number column", function () {
            this.directiveElement = this.createDirective(this.createColumnHelper(this.Column.TYPE.NUMBER));
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.NUMBER);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(Number(this.directiveElement.find("tbody tr td").html())).toEqual(this.scope.content[0].dummy);
        });

        it("with fraction size", function () {
            var columnHTML = '<hub-column-number name="Dummy" field="dummy" fraction-size="2"></hub-column-number>';
            this.directiveElement = this.createDirective(columnHTML);
            expect(this.directiveElement).not.toBeUndefined();
            expect(this.directiveElement.isolateScope().$ctrl._columns.length).toEqual(1);
            expect(this.directiveElement.isolateScope().$ctrl._columns[0].getType()).toEqual(this.Column.TYPE.NUMBER);
            expect(this.directiveElement.find("tbody tr td").length - 1).toEqual(1);//remove "action" td
            expect(this.directiveElement.find("tbody tr td").html()).toEqual('0.00');
        });
    });

    ////////////////

    function _createColumnHelper(type, editable) {

        var column = "";

        switch (type) {
            case this.Column.TYPE.TEXT:
                column = '<hub-column name="Dummy" field="dummy"';
                break;
            case this.Column.TYPE.BOOLEAN:
                column = '<hub-column-boolean name="Dummy" field="dummy"';
                break;
            case this.Column.TYPE.NUMBER:
                column = '<hub-column-number name="Dummy" field="dummy"';
                break;
            case this.Column.TYPE.MENU:
                this.scope.options = _.range(4);
                column = '<hub-column-menu name="Dummy" field="dummy" options="options"';
                break;
        }

        if (editable)
            column += ' editable ></hub-column-menu>';
        else
            column += '></hub-column-menu>';

        return column;
    }

    function _createDirective(column) {
        this.scope.content = [{dummy: 0}];
        this.scope.$digest();
        var element = angular.element('<hub-table contents="content" breakpoint="mediaQuery">' +
            column +
            '</hub-table>');
        var directive = this.compile(element)(this.scope);
        this.scope.$digest();

        return directive;
    }
});
