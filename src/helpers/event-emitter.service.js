(function () {
    'use strict';

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
