describe("HubInfiniteScroll directive", function () {

    beforeEach(module('hubangular'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
        this.compile = _$compile_;
        this.scope = _$rootScope_.$new();
        this.$timeout = _$timeout_;
    }));

    beforeEach(function () {
        var scope = this.scope;

        scope.previousPage = function (done) {
            done(true);
        };
        scope.nextPage = function (done) {
            done(true);
        };

        spyOn(scope, 'previousPage');
        spyOn(scope, 'nextPage');

    });

    it("disable scroll", function () {
        var element = angular.element('<div style="width: 200px; height: 200px; overflow: scroll;">\n    <div hub-infinite-scroll="false" next-page="nextPage(done)" previous-page="previousPage(done)" style="width: 200px; height: 400px"></div>\n    <div style="width: 200px; height: 400px"></div>\n</div>');
        angular.element("body").append(element);
        //create directive element
        var container = this.compile(element)(this.scope);
        this.scope.$digest();
        this.$timeout.flush();

        container.scrollTop(2000);
        container.trigger("scroll");
        container.scrollTop(0);
        container.trigger("scroll");
        container.scrollTop(50);
        container.trigger("scroll");
        container.scrollTop(100);
        container.trigger("scroll");

        expect(this.scope.nextPage).not.toHaveBeenCalled();
        expect(this.scope.previousPage).not.toHaveBeenCalled();
    });
    
    describe("element with infinte scroll on top", function () {

        beforeEach(function () {
            var element = angular.element('<div style="width: 200px; height: 200px; overflow: scroll;">\n    <div hub-infinite-scroll next-page="nextPage(done)" previous-page="previousPage(done)" style="width: 200px; height: 400px"></div>\n    <div style="width: 200px; height: 400px"></div>\n</div>');
            angular.element("body").append(element);
            //create directive element
            this.directiveElement = this.compile(element)(this.scope);
            this.scope.$digest();
            this.$timeout.flush();
        });

        it("scroll to top", function () {
            var container = this.directiveElement;
            expect(this.scope.previousPage).not.toHaveBeenCalled();

            container.scrollTop(0);
            container.trigger("scroll");

            expect(this.scope.previousPage).toHaveBeenCalledTimes(1);
        });

        it("scroll to bottom", function () {
            var container = this.directiveElement;
            expect(this.scope.nextPage).not.toHaveBeenCalled();
            container.scrollTop(2000);
            container.trigger("scroll");

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
        });

        it("scroll to top and reach to first page. Second time will be no call event", function () {
            var container = this.directiveElement;
            expect(this.scope.previousPage).not.toHaveBeenCalled();

            container.scrollTop(0);
            container.trigger("scroll");
            container.scrollTop(0);
            container.trigger("scroll");
            container.scrollTop(0);
            container.trigger("scroll");

            expect(this.scope.previousPage).toHaveBeenCalledTimes(1);
            expect(this.scope.nextPage).not.toHaveBeenCalled();
        });

        it("scroll to bottom and reach to last page. Second time will be no call event", function () {
            var container = this.directiveElement;
            expect(this.scope.nextPage).not.toHaveBeenCalled();

            container.scrollTop(2000);
            container.trigger("scroll");
            container.scrollTop(2000);
            container.trigger("scroll");
            container.scrollTop(2000);
            container.trigger("scroll");

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });

        it("not call any event", function () {
            var container = this.directiveElement;

            container.scrollTop(1);
            container.trigger("scroll");
            container.scrollTop(50);
            container.trigger("scroll");
            container.scrollTop(199);
            container.trigger("scroll");


            expect(this.scope.nextPage).not.toHaveBeenCalled();
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });

        it("use start immediatly flag", function () {
            this.scope.startImmediatly = true;
            var element = angular.element('<div style="width: 200px; height: 200px; overflow: scroll;">\n    <div hub-infinite-scroll next-page="nextPage(done)" previous-page="previousPage(done)" start-immediatly="startImmediatly" style="width: 200px; height: 400px"></div>\n    <div style="width: 200px; height: 400px"></div>\n</div>');
            angular.element("body").append(element);
            //create directive element
            this.directiveElement = this.compile(element)(this.scope);
            this.scope.$digest();
            this.$timeout.flush();

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });
    });

    describe("element with infinte scroll on bottom", function () {

        beforeEach(function () {
            var element = angular.element('<div style="width: 200px; height: 200px; overflow: scroll">\n    <div style="width: 200px; height: 400px"></div>\n    <div hub-infinite-scroll next-page="nextPage(done)" previous-page="previousPage(done)" style="width: 200px; height: 400px"></div>\n</div>');
            angular.element("body").append(element);
            //create directive element
            this.directiveElement = this.compile(element)(this.scope);
            this.scope.$digest();
            this.$timeout.flush();
        });

        it("scroll to top", function () {
            var container = this.directiveElement;
            expect(this.scope.previousPage).not.toHaveBeenCalled();

            container.scrollTop(0);
            container.trigger("scroll");

            expect(this.scope.previousPage).toHaveBeenCalledTimes(1);
        });

        it("scroll to bottom", function () {
            var container = this.directiveElement;
            expect(this.scope.nextPage).not.toHaveBeenCalled();
            container.scrollTop(2000);
            container.trigger("scroll");

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
        });

        it("scroll to top and reach to first page. Second time will be no call event", function () {
            var container = this.directiveElement;
            expect(this.scope.previousPage).not.toHaveBeenCalled();

            container.scrollTop(0);
            container.trigger("scroll");
            container.scrollTop(0);
            container.trigger("scroll");
            container.scrollTop(0);
            container.trigger("scroll");

            expect(this.scope.previousPage).toHaveBeenCalledTimes(1);
            expect(this.scope.nextPage).not.toHaveBeenCalled();
        });

        it("scroll to bottom and reach to last page. Second time will be no call event", function () {
            var container = this.directiveElement;
            expect(this.scope.nextPage).not.toHaveBeenCalled();

            container.scrollTop(2000);
            container.trigger("scroll");
            container.scrollTop(2000);
            container.trigger("scroll");
            container.scrollTop(2000);
            container.trigger("scroll");

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });

        it("not call any event", function () {
            var container = this.directiveElement;
            container.scrollTop(616);
            container.trigger("scroll");
            container.scrollTop(401);
            container.trigger("scroll");
            container.scrollTop(599);
            container.trigger("scroll");

            expect(this.scope.nextPage).not.toHaveBeenCalled();
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });

        it("use start immediatly flag", function () {
            this.scope.startImmediatly = true;
            var element = angular.element('<div style="width: 200px; height: 200px; overflow: scroll;">\n    <div hub-infinite-scroll next-page="nextPage(done)" previous-page="previousPage(done)" start-immediatly="startImmediatly" style="width: 200px; height: 400px"></div>\n    <div style="width: 200px; height: 400px"></div>\n</div>');
            angular.element("body").append(element);
            //create directive element
            this.directiveElement = this.compile(element)(this.scope);
            this.scope.$digest();
            this.$timeout.flush();

            expect(this.scope.nextPage).toHaveBeenCalledTimes(1);
            expect(this.scope.previousPage).not.toHaveBeenCalled();
        });
    });
});
