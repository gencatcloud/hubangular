describe("HubCollapse animation", function () {
    var scope;
    var animateHubCollapseExpand = angular.noop;
    var animateHubCollapseCollapse = angular.noop;

    beforeEach(module('hubangular', 'ngAnimateMock'));

    beforeEach(inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
    }));

    beforeEach(inject(function ($$animateJs, $animate, $httpBackend) {
        animateHubCollapseExpand = function (element, animationCallback) {
            //prevent hubangular call
            $httpBackend.expectGET("templates/404.tmpl.html").respond(200, "");

            $$animateJs(element, 'addClass', {addClass: "expand"})
                .start()
                .then(animationCallback);

            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest')
                $animate.closeAndFlush();
        };
        animateHubCollapseCollapse = function (element, animationCallback) {
            //prevent hubangular call
            $httpBackend.expectGET("templates/404.tmpl.html").respond(200, "");

            $$animateJs(element, 'removeClass', {removeClass: "expand"})
                .start()
                .then(animationCallback);

            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest')
                $animate.closeAndFlush();
        };
    }));

    it("child of 50px height", function (done) {
        var element = angular.element('<div class="hub-collapse"><div style="height:50px;"></div></div>');

        animateHubCollapseExpand(element, function () {
            expect(element.css("max-height")).toBe("50px");
            done();
        });
    });

    it("padding of 20px and child of 50px height", function (done) {
        var element = angular.element('<div style="padding:20px;" class="hub-collapse"><div style="height:50px;"></div></div>');

        animateHubCollapseExpand(element, function () {
            expect(element.css("max-height")).toBe("90px");
            done();
        });
    });


    it("child of 50px height and 10px padding", function (done) {
        var element = angular.element('<div class="hub-collapse"><div style="height:50px;padding:10px;"></div></div>');

        animateHubCollapseExpand(element, function () {
            expect(element.css("max-height")).toBe("70px");
            done();
        });
    });

    it("child of 10px padding and another child of 50px height and 10px padding insde this", function (done) {
        var element = angular.element('<div class="hub-collapse"><div style="padding:10px;"><div style="height:50px;padding:10px;"></div></div></div>');

        animateHubCollapseExpand(element, function () {
            expect(element.css("max-height")).toBe("90px");
            done();
        });
    });

    it("padding of 10px, if collapsed height should be 0", function () {
        var element = angular.element('<div class="hub-collapse"></div>');

        element.css("padding-top", "10px");
        element.css("padding-bottom", "10px");

        //simulate hub-collapse assignment to test works
        element.data("padding", {
            top: element.css("padding-top"),
            bottom: element.css("padding-bottom")
        });

        element.css("padding-top", 0);
        element.css("padding-bottom", 0);
        
        animateHubCollapseExpand(element, function () {
            expect(element.innerHeight()).toBe(20);
            animateHubCollapseCollapse(element, function () {
                expect(element.innerHeight()).toBe(0);
            });
        });

    });
});
