(function ($) {
    "use strict";

    var wpstarter = {

        init: function () {
            // the wrapper we shall spin
            var inner = $("#inner");
            var winnerSign = $(".winner");
            var dareSign = $(".dare");
            var light = $(".spotlight");
            // random number between 1 -8
            var winner = Math.ceil(Math.random() * 8);
            // get winners name from DOM
            var winnerName = $(".panel:nth-child(" + winner + ")").data("name");
            $(winnerSign).text(winnerName);
            // spin two whole roatations plus amount for winner * deg for each panel
            var spin = ((9 - winner) + 16) * 45;


            var master = new TimelineMax({
                delay: 1,
                repeat: 0,
            });


            var playHorn = function () { $("#horn").get(0).play(); }
            var playMachine = function () { $("#machine").get(0).play(); }

            // start spinning
            master
            .add("start")
            .to(light, 1, { opacity: "0", ease:Back.easeOutBounce })
            .to(light, 1, { opacity: "1", ease:Back.easeOutBounce })
            .add("spin")
            .to(inner, 6, { rotationX: spin })
            .addCallback(playHorn, "spin")
            .add("showSigns", "-=0.5")
            .addCallback(playMachine, "showSigns")
            .addCallback(playMachine, "showSigns+=0.25")
            .to(".sprite-test", .8, {backgroundPosition: "-1920px 0", ease:SteppedEase.config(15)})
            .set(".sprite-test", {backgroundPosition:"0px 0px"})
            .to(".sprite-test", .8, {backgroundPosition: "-1920px 0", ease:SteppedEase.config(15)})
            .set(".sprite-test", {backgroundPosition:"0px 0px"})
            // add timeline marker half second before end of spin
            // show sign at marker
            .to(winnerSign, 0.5, { transform: "translateY(-280px)", ease:Back.easeOut }, "showSigns")
            // show second sign relative to marker
            .to(dareSign, 0.5, { transform: "translateY(-280px)", ease:Back.easeOut }, "showSigns+=0.25");


        },

        refreshPage: function () {
            location.reload();
        }
    };

    // DOM Ready
    $(function () { wpstarter.init(); });

} (jQuery));
