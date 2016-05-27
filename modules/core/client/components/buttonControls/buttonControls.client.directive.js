'use strict';

var app = angular.module('core.button-controls', []);

// It's good practice to assign a variable name to your module instead of chaining.

app.directive('buttonControls', function ($document) {
    function link(scope, element, attr) {

        var cssStyles = ['red', 'green', 'blue'];

        element.css({
            position: 'relative',
            border: '1px solid cyan',
            cursor: 'pointer'
        });

        // element.on('click', function (event) {
        //     event.preventDefault();
        //     var thisClass = element.attr('class');
        //     console.log(thisClass);
        //     var cssSelector = function (css) {
        //         console.log(css);
        //     };
        //     cssSelector(thisClass);
        // });

    element.on('click', function (event) {
            event.preventDefault();
            console.log("yayyyyy");
            var thisCss = element.attr('class');

            var cssSetter = cssStyles[Math.floor(Math.random()*(cssStyles.length))];
            if (thisCss) {
                element.removeClass(thisCss);
                element.addClass(cssSetter);
            } else {
                element.addClass(cssSetter);
            };
        });

    }

    return {
        replace: true,
        template: '<div>buttonControls Directive</div>',
        restrict: 'EA',
        link: link
    };
});
