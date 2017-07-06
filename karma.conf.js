'use strict';

module.exports = function (config) {

    //set a "lg" screen size
    var WINDOW_WIDTH = 1600;
    var WINDOW_HEIGHT = 900;

    var configuration = {
        //basic test configuration
        frameworks: ['jasmine'],
        browsers: [
            'phantomjsCustomSize',
            'chromeCustomSize',
            'firefoxCustomSize',
            'operaCustomSize',
            //internet explorer can't set a custom size :(
            'IE',
            'IE10'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            "karma-ie-launcher",
            "karma-opera-launcher",
            'karma-jasmine'
        ],
        customLaunchers: {
            phantomjsCustomSize: {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: WINDOW_WIDTH,
                        height: WINDOW_HEIGHT
                    }
                }
            },
            chromeCustomSize: {
                base: 'Chrome',
                flags: ["--window-size=" + WINDOW_WIDTH + "," + WINDOW_HEIGHT]
            },
            firefoxCustomSize: {
                base: 'Firefox',
                flags: ["-width", WINDOW_WIDTH, "-height", WINDOW_HEIGHT]
            },
            IE10: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE10'
            }, operaCustomSize: {
                base: 'Opera',
                flags: ["--window-size=" + WINDOW_WIDTH + "," + WINDOW_HEIGHT]
            }
        },
        //files are added automatically using "test:inject-karma-conf" gulp tasks
        files: [
            // bower:js
            // endbower

            // project:js
            // endinject

            // spec:js
            // endinject
        ]
    };

    config.set(configuration);
};
