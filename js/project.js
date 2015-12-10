(function ($) {
    "use strict";

    var party = {

        wait: 600, // in seconds before starting the party (3 - 15 mins)

        init: function () {
            party.wait = party.getRandomArbitrary(180, 900);
            party.countDown();
            party.bindActions();
        },

        getRandomArbitrary: function (min, max) {
            return Math.random() * (max - min) + min;
        },

        bindActions: function () {
            $(".reset").on("click", function () { party.partyAgain(); });
            $(".choice-shot").on("click", function () { party.hideChoice("shot"); });
            $(".choice-dare").on("click", function () { party.hideChoice("dare"); });
        },

        countDown: function () {
            var bird = $(".bird");

            var clock = $(".timer").FlipClock(party.wait, {
                countdown: true,
                clockFace: "MinuteCounter"
            });

            // clock plugin callbacks don't seem to work properly so we have to add our own
            var myInterval = setInterval(function () {
                if (clock.getTime().time === 0) {
                    clearInterval(myInterval);
                    // there's a slight diff between the reported time and whats visually on the timer
                    // so we wait a while before removing it
                    setTimeout(function () {
                        party.setStage();
                        TweenMax.to(bird, 0.5, { transform: "translateX(-800px)", ease: Bounce.easeOut });
                        birdflapTl.pause();
                    }, 1500);
                }
            }, 1000);


            var birdflapTl = new TimelineMax({
                delay: 0,
                repeat: 999,
            });

            var birdmoveTl = new TimelineMax({
                delay: 10,
                repeatDelay: 10,
                repeat: 999
            });

            birdmoveTl.to(bird, 10, { transform: "translateX(0px)" })
            .to(bird, 1, { rotation: 360 }, 5)
            .to(bird, 10, { transform: "translateX(800px)" }, 20)
            .to(bird, 1, { rotation: 360 }, 5)
            .to(bird, 10, { transform: "translateX(-100px)" }, 20)
            .to(bird, 10, { transform: "translateX(800px)" }, 20);

            birdflapTl.to(bird, 0.48, { backgroundPosition: "-5500px 0", ease: SteppedEase.config(11)})
            .set(bird, { backgroundPosition: "0px 0px"});

        },

        setStage: function () {
            var timer = $(".timer-outer-wrapper");
            var machine = $(".outer-machine");
            var bg = $(".bgoriginal");
            var pole = $(".pole");

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
            .to(timer, 0.5, { transform: "translateY(-700px)", ease: Back.easeIn }, "+=0.5")
            .set(bg, { opacity: 0 }, "+=0.5")
            .addCallback(playHorn)
            .set(machine, { transform: "translateY(500px)", opacity: 1 })
            .add("showMachine")
            .to(machine, 1, { transform: "translateY(-120px)", ease: Bounce.easeOut }, "showMachine")
            .to(pole, 1, { transform: "translateY(-220px)", ease: Bounce.easeOut }, "showMachine")
            .addCallback(startMachine);
        },

        startMachine: function () {
            $(".bird").remove();
            // the wrapper we shall spin
            var inner = $("#inner");
            var winnerSign = $(".winner");
            var machine = $(".outer-machine");
            var pole = $(".pole");
            var choice = $(".choice");
            var light = $(".light");
            var shot = $(".choice-shot");
            var dare = $(".choice-dare");
            // random number between 1 -8
            var winner = Math.ceil(Math.random() * 8);
            // get winners name from DOM
            var winnerName = $(".panel:nth-child(" + winner + ")").data("name");
            $(winnerSign).text(winnerName);
            // spin two whole roatations plus amount for winner * deg for each panel
            var spin = ((9 - winner) + 16) * 45;

            var lightTl = new TimelineMax({
                delay: 0,
                repeat: 999,
            });

            lightTl.staggerTo(light, 0.3, { backgroundPosition: "-3434px 0", ease: SteppedEase.config(17)}, 0.3)
            .set(light, { backgroundPosition: "0px 0px"});

            var master = new TimelineMax({
                delay: 1,
                repeat: 0,
            });

            var stopLight = function () {
                lightTl.pause();
            };

            var playMachine = function () { $("#machine").get(0).play(); };
            var playPop1 = function () {
                $("#pop1").get(0).play();
            };
            var playPop2 = function () {
                $("#pop2").get(0).play();
            };

            // start spinning
            master.add("start")
            //.to(light, 1, { opacity: "0", ease: Back.easeOutBounce })
            //.to(light, 1, { opacity: "1", ease: Back.easeOutBounce })
            .add("spin")
            .to(inner, 6, { rotationX: spin })
            .add("showWinner", "-=0.5")
            .addCallback(playMachine, "showWinner")
            //.to(".sprite-test", 0.8, { backgroundPosition: "-1920px 0", ease: SteppedEase.config(15)})
            //.set(".sprite-test", { backgroundPosition: "0px 0px"})
            // add timeline marker half second before end of spin
            // show sign at marker
            .to(winnerSign, 0.5, { transform: "translateY(0)", ease: Bounce.easeOut }, "showWinner")
            .add("hideMachine", "showWinner+=3")
            .to(machine, 0.5, { transform: "translateY(800px)", ease: Bounce.easeOut }, "hideMachine")
            .to(pole, 0.5, { transform: "translateY(800px)", ease: Bounce.easeOut }, "hideMachine")
            .addCallback(playMachine, "hideMachine")
            .add("showChoice")
            // show second sign relative to marker
            .addCallback(playMachine, "showChoice")
            .to(choice, 0.5, { transform: "translateY(-40px)", ease: Back.easeOut }, "showChoice")
            .to(pole, 0.5, { transform: "translateY(-280px)", ease: Back.easeOut }, "showChoice")
            .to(dare, 0.3, { transform: "scale(1)", ease: Bounce.easeOut }, "showChoice+=1")
            .to(shot, 0.3, { transform: "scale(1)", ease: Bounce.easeOut }, "showChoice+=1.15")
            .addCallback(playMachine, "hideMachine")
            .addCallback(playPop1, "showChoice+=1")
            .addCallback(playPop2, "showChoice+=1.15")
            .addCallback(stopLight, "showChoice+=1.15");
        },

        partyAgain: function () {
            location.reload();
        },

        hideChoice: function (next) {
            var pole = $(".pole");
            var choice = $(".choice");
            var shot = $(".choice-shot");
            var dare = $(".choice-dare");


            $("#clap").get(0).play();

            var master = new TimelineMax({
                delay: 1,
                repeat: 0,
            });

            var goToNext = function () {
                if (next === "dare") {
                    party.dareChosen();
                } else {
                    party.shotChosen();
                }
            };

            master.add("start")
            .to(pole, 0.4, { transform: "translateY(600px)", ease: Back.easeIn }, "start")
            .to(choice, 0.4, { transform: "translateY(600px)", ease: Back.easeIn }, "start")
            .add("removeOptions")
            .to(shot, 0.3, { transform: "scale(0)", ease: Back.easeIn }, "removeOptions")
            .to(dare, 0.3, { transform: "scale(0)", ease: Back.easeIn }, "removeOptions+=0.2")
            .addCallback(goToNext);
        },

        shotChosen: function () {
            TweenMax.to(".the-shot", 1, { transform: "scale(1)", ease: Bounce.easeOut });
            TweenMax.to(".flames", 0.5, { transform: "translateY(0)" });
            party.showReset();
        },


        dareChosen: function () {
            TweenMax.to(".the-dare", 1, { transform: "scale(1)", ease: Bounce.easeOut });
            party.showReset();
        },

        showReset: function () {
            var show = new TimelineMax({
                delay: 1,
                repeat: 0,
            });

            show.add("start")
            .to(".reset", 0.5, { transform: "translateY(0)" }, "start+=5");
        },
    };

    $(window).load(function () { party.init(); });

} (jQuery));
