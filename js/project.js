(function ($) {
    "use strict";

    var wpstarter = {

        init: function () {
            this.bindUIActions();
        },

        bindUIActions: function () {
            $(".btn").on("click", function (e) { wpstarter.sayHello(e); });
        },

        windowLoaded: function () {

            var inner = $("#inner");

            var tl = new TimelineMax({
                delay: 0,
                repeat: 10,
                repeatDelay: 0,
                ease: "linear"
                //onUpdate:updateStats,
                //onRepeat:updateReps,
                //onComplete:restart
            });

            tl.to(inner, 6, { rotationX: 720 });
        },

        windowResized: function () {
            console.log("Resized");
        },

        windowScrolled: function () {
            console.log("Scrolled");
        },

        sayHello: function (e) {
            var button = $(e.currentTarget);
            alert("Hello from " + button);
        }

    };

    // DOM Ready
    $(function () { wpstarter.init(); });
    // Images Loaded
    $(window).load(function () { wpstarter.windowLoaded(); });
    // Window Resized (smart debounced event)
    $(window).bind("debouncedresize", function () { wpstarter.windowResized(); });
    // Window Scrolled
    $(window).on("scroll", function () { wpstarter.windowScrolled(); });

} (jQuery));
