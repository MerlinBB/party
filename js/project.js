(function ($) {
    "use strict";

    var party = {

        wait: 3, // in seconds before starting the party

        init: function () {
            party.countDown();
        },

        countDown: function () {
            var clock = $(".timer").FlipClock(party.wait, {
                countdown: true,
                clockFace: "MinuteCounter"
            });

            var myInterval = setInterval(function () {
                console.log(clock.getTime().time);
                if (clock.getTime().time === 0) {
                    clearInterval(myInterval);
                    setTimeout(function () {
                        party.setStage();
                    }, 1500);
                }
            }, 1000);
        },

        setStage: function () {
            var timer = $(".timer-wrapper");
            var machine = $(".machine");

            var playHorn = function () { $("#horn").get(0).play(); };

            var startMachine = function () {
                party.startMachine();
            };

            var setStage = new TimelineMax({
                delay: 0,
                repeat: 0,
            });

            setStage
            .add("start")
            .to(timer, 0.5, { transform: "translateY(-700px)", ease: Back.easeIn })
            .addCallback(playHorn)
            .set(machine, { transform: "translateY(-700px)", opacity: 1 })
            .to(machine, 0.5, { transform: "translateY(0px)", ease: Bounce.easeOut }, "+=0.5")
            .addCallback(startMachine);
        },

        startMachine: function () {
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



            var playMachine = function () { $("#machine").get(0).play(); };

            // start spinning
            master
            .add("start")
            .to(light, 1, { opacity: "0", ease: Back.easeOutBounce })
            .to(light, 1, { opacity: "1", ease: Back.easeOutBounce })
            .add("spin")
            .to(inner, 6, { rotationX: spin })
            .add("showSigns", "-=0.5")
            .addCallback(playMachine, "showSigns")
            .addCallback(playMachine, "showSigns+=0.25")
            .to(".sprite-test", 0.8, { backgroundPosition: "-1920px 0", ease: SteppedEase.config(15)})
            .set(".sprite-test", { backgroundPosition: "0px 0px"})
            .to(".sprite-test", 0.8, { backgroundPosition: "-1920px 0", ease: SteppedEase.config(15)})
            .set(".sprite-test", { backgroundPosition: "0px 0px"})
            // add timeline marker half second before end of spin
            // show sign at marker
            .to(winnerSign, 0.5, { transform: "translateY(-280px)", ease: Back.easeOut }, "showSigns")
            // show second sign relative to marker
            .to(dareSign, 0.5, { transform: "translateY(-280px)", ease: Back.easeOut }, "showSigns+=0.25");
        },

        refreshPage: function () {
            location.reload();
        }
    };

    $(window).load(function () { party.init(); });

} (jQuery));
