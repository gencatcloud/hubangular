describe("HubCollapse directive", function () {
    var compile;
    var scope;
    var directiveElem = null;

    beforeEach(module('hubangular', 'ngAnimateMock'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        compile = _$compile_;
        scope = _$rootScope_.$new();
    }));

    beforeEach(function () {
        var element = angular.element('<div hub-collapse="{{collapse}}"></div>');
        directiveElem = compile(element)(scope);
        scope.$digest();
    });


    it("directive collapsed", function () {
        scope.collapse = true;
        scope.$digest();
        expect(directiveElem.hasClass("hub-collapse")).toBeTruthy();
        expect(directiveElem.hasClass("expand")).toBeFalsy();
    });


    it("directive expanded", function () {
        scope.collapse = false;
        scope.$digest();
        expect(directiveElem.hasClass("hub-collapse")).toBeTruthy();
        expect(directiveElem.hasClass("expand")).toBeFalsy();
    });
});
