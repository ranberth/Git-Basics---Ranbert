var pageTitle = "Ranbert's SpaceX Dashboard";
var file = "//ranberth.github.io/Git-Basics---Ranbert/input.txt?ver=1&build5";
var attentionCount = 0;
var attention = false;
var attentionClear = null;
var threat = false;
var startedJourney = false;
var journeyDateStarted = "";
var journeyDateEnded = "";
var dataHolder = null;
var jds = null;
var percentage = null;
var speeds = [];
var theSpeeds = [];
var showSpeed = 0;
var clicked = false;
var tipTimeout = null;
var tip = false;
var cameraWidth = null;
var theHolder = null;
var o2 = null;
var speedRead = false;
var pointer = 0;
var journeyFinished = false;
var totalPassengers = null;
var startDistance = null;
var currentDistance = null;
var timeLeft = null;
var elapsedHours = null;
var sumSpeed = 0;
var sSpeed = 0;
var avgSpeed = 0;
var avgCalc = false;
var estimatedArrival = null;
var timeDist = false;
var rocketMarsDistance = null;
var theHolder = null;

$(document).ready(function() {
    //window.oncontextmenu = function () { return false; }
    $("#tapSound")[0].load();

    if (!startedJourney) {
        startJourney();
        startedJourney = true;
    }

    $("#panel1").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel1", "#geninfo");
        }
    });

    $("#panel2").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel2", "#panel2");
        }
    });

    $("#panel3").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel3", "#distanceHolder");
        }
    });

    $("#panel4").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel4", "#o2co2Holder");
        }
    });

    $("#panel5").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel5", "#camera");
        }
    });

    $("#messageButton").click(function() {
        if (checkAttention(true) == false) {
            toggleInfo("#panel6", "#panel6");
        }
    });

    $("#safetybeltButton").click(function() {
        tipBubble();
    });

    $("#message1").click(function() {
        resetMessages();
        $("#message1 .message").css("cssText", "display: block !important;");
        tap();
    });

    $("#message2").click(function() {
        resetMessages();
        $("#message2 .message").css("cssText", "display: block !important;");
        tap();
    });

    $("#message3").click(function() {
        resetMessages();
        $("#message3 .message").css("cssText", "display: block !important;");
        tap();
    });

    $("#attentionOKButton").click(function() {
        dismissAttention();
    });

    $("#tipBubble").click(function() {
        hideBubble();
    });

    $("#backButton").click(function() {
        dismissScreen();
    });

    $("#backButton, #messageButton, #attentionOKButton").click(function() {
        tap();
    });

    function startJourney() {
        $("#data").text("JOURNEY STARTED");
        countDown();
        $(".dashboard").css("opacity", 0).delay(1000).animate({
            opacity: 1
        }, 1000);
    }

    function dismissScreen() {
        window.history.pushState("dashboard", pageTitle, "?page=index");
        clicked = false;
        $("#fullScreen").css("opacity", 1).delay(0).animate({
            opacity: 0
        }, 100, function() {
            $("#fullScreen " + dataHolder).css("height", "");
            $("#fullScreen " + dataHolder).css("overflow", "");
            if (dataHolder == "#panel6") {
                $(dataHolder).hide();
            }
            $(dataHolder).appendTo($(".informationHolder"));
            $("#fullScreen").hide();
            $("#fullScreen").html("");
            $(".informationHolder").show();
            $(".informationHolder").css("opacity", 0).delay(0).animate({
                opacity: 1
            }, 100);
        });
        $("#backButton").hide();
        resetMessages();
        $("#messageButton").show();
    }

    function dismissAttention() {
        $("#attention").css("border", "");
        $("#safetybeltButton").css("display", "");
        $("#safetybeltButton").css("cssText", "background-image:");
        $("#safetybeltButton").hide();
        $("#attentionTitle").css("color", "");
        $("#attentionMessage").css("color", "");
        $("#attention").css("display", "");
        $("#attentionOKButton").css("display", "none");
        $("#attention").hide();

        $(".dashboard").show();
        if (clicked == true) {
            $("#fullScreen").show();
        }
        $(".dashboard").css("display", "block");

        if (dataHolder != "#panel6" && dataHolder != null || dataHolder != "") {
            $("#messageButton").show();
            $("#backButton").show();
            $("#backButton").css("display","block");
        }

        clearTimeout(attentionClear);
        attentionClear = null;
        attention = false;
        threat == false;
    }

    function resetMessages() {
        $("#message2 .message").css("display", "");
        $("#message1 .message").css("display", "");
        $("#message3 .message").css("display", "");
    }

    function tipBubble() {
        if (tip == false) {
            tap();
            $("#tipBubble").css("display", "block");
            $("#tipBubble").css("opacity", 0).animate({
                opacity: 1
            }, 500);
            tip = true;
            tipTimeout = setTimeout(function() {
                hideBubble();
            }, 7000);
        } else {
            $("#tipBubble").click();
        }
    }

    function hideBubble() {
        if (tip == true) {
            clearTimeout(tipTimeout);
            $("#tipBubble").css("opacity", 1).animate({
                opacity: 0
            }, 500, function() {
                $("#tipBubble").css("display", "");
            });
            tip = false;
            tap();
        }
    }

    function tap() {
        $("#tapSound")[0].play();
    }

    function toggleInfo(dataholder, clickElement) {
        if (clicked == false) {
            clicked = true;
            if (dataHolder != "#panel6") {
                tap();
            }
            dataHolder = dataholder;
            $("#messageButton").hide();
            $("#backButton").show();
            $("#backButton").css("display","block");
            $(".dashboard").animate({
                opacity: 0
            }, 100);
            $(".informationHolder").delay(0).fadeOut("fast", function() {
                $(dataholder).appendTo($("#fullScreen"));
                $("#fullScreen " + dataholder).css("height", "unset");
                $("#fullScreen " + dataHolder).css("overflow", "unset");
                $("#fullScreen").show();
                $("#fullScreen " + dataholder).show();
                $("#fullScreen").css("opacity", 0).delay(0).animate({
                    opacity: 1
                }, 10);
                $("html, body").animate({
                    scrollTop: $("#fullScreen").offset().top - 80
                }, 100);
                $(".dashboard").css("opacity", "1");
            });
        }
    }

    function o2co2Graph() {
        var c1 = document.getElementById("o2co2");
        var ctx1 = c1.getContext("2d");

        ctx1.moveTo(10, 80);
        ctx1.lineTo(0, 90);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "#ff0000";
        ctx1.stroke();

        ctx1.moveTo(40, 70);
        ctx1.lineTo(10, 80);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "#ff0000";
        ctx1.stroke();

        ctx1.moveTo(100, 35);
        ctx1.lineTo(40, 70);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "#ff0000";
        ctx1.stroke();

        ctx1.moveTo(200, 100);
        ctx1.lineTo(100, 35);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "#ff0000";
        ctx1.stroke();
    }

    function readTextFile(type) {
        var type = type;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var lines = rawFile.responseText.split("\n");

                    var index = lines.indexOf("[" + type + "]");
                    var indexEnd = lines.indexOf("", index);

                    for (var line = index + 1; line < lines.length; line++) {
                        if ((type == "distance" || type == "passengers" || type == "rocketfuel" || type == "o2" || type == "co2") && line < indexEnd) {

                            if (type == "distance") {
                                startDistance = lines[line];
                                //$("#distanceHolder").append("</br>" + lines[line]);
                            }
                            if (type == "o2") {
                                $("#o2co2Holder").html("</br>" + lines[line]);
                            }
                            if (type == "co2") {
                                $("#o2co2Holder").html("</br>" + lines[line]);
                            }

                            if (type == "passengers") {
                                totalPassengers = lines[line];
                            }
                        }
                    }
                }
            }
        }
        rawFile.send(null);
    }

    function readDates() {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var lines = rawFile.responseText.split("\n");
                    var journeyStartedIndex = lines.indexOf("[journeystarted]");
                    var journeyEndedIndex = lines.indexOf("[journeyended]");
                    if (jds != lines[journeyStartedIndex + 1]) {
                        journeyDateStarted = lines[journeyStartedIndex + 1];
                        journeyDateEnded = lines[journeyEndedIndex + 1];
                        jds = journeyDateStarted;
                    }
                }
            }
        }
        rawFile.send(null);
    }

    function roundP(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function countDown() {
        // Retrieve the information we need
        readDates();
        spacexSpeed();
        startTime();
        readTextFile("passengers");

        // Update the count down every 1 second
        var x = setInterval(function() {
            var countDownDate = new Date(Date.parse(estimatedArrival)).getTime();
            var countDownDateString = new Date(Date.parse(estimatedArrival));

            var now = new Date().getTime();
            var started = new Date(Date.parse(journeyDateStarted));
            var distance = countDownDate - now;
            var elapsed = now - started.getTime();

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var daysE = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            var hoursE = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutesE = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            var secondsE = Math.floor((elapsed % (1000 * 60)) / 1000);
            elapsedHours = Math.floor(elapsed / (1000 * 60 * 60 * 24) * 24);

            var totalMillisInRange = countDownDate - started;
            var elapsedMillis = now - started;
            percentage = (Math.max(0, Math.min(100, 100 * (elapsedMillis / totalMillisInRange))));
            var percentageR = roundP(percentage, 2);

            //Display the results in their holders
            //General Information:
            $("#geninfo").html("<p class=\"label\">JOURNEY STARTED ON:</p><p class=\"info1\">" + formatDate(started.toDateString())[0] + " " + (started.getHours() < 10 ? "0" + started.getHours() : started.getHours()) + ":" + (started.getMinutes() < 10 ? "0" + started.getMinutes() : started.getMinutes()) + ":" + (started.getSeconds() < 10 ? "0" + started.getSeconds() : started.getSeconds()) + "</p>");
            $("#geninfo").append("<p class=\"label\">ARRIVAL EXPECTED ON:</p><p class=\"info\">" + formatDate(countDownDateString.toDateString())[0] + " " + (countDownDateString.getHours() < 10 ? "0" + countDownDateString.getHours() : countDownDateString.getHours()) + ":" + (countDownDateString.getMinutes() < 10 ? "0" + countDownDateString.getMinutes() : countDownDateString.getMinutes()) + ":" + (countDownDateString.getSeconds() < 10 ? "0" + countDownDateString.getSeconds() : countDownDateString.getSeconds()) + "</p>");

            $("#journeyDates1").html("<p class=\"label\">JOURNEY STARTED ON:</p><p class=\"info\">" + formatDate(started.toDateString())[0] + " " + (started.getHours() < 10 ? "0" + started.getHours() : started.getHours()) + ":" + (started.getMinutes() < 10 ? "0" + started.getMinutes() : started.getMinutes()) + ":" + (started.getSeconds() < 10 ? "0" + started.getSeconds() : started.getSeconds()) + "</p>");
            $("#journeyDates1").append("<p class=\"label\">ARRIVAL EXPECTED ON:</p><p class=\"info\">" + formatDate(countDownDateString.toDateString())[0] + " " + (countDownDateString.getHours() < 10 ? "0" + countDownDateString.getHours() : countDownDateString.getHours()) + ":" + (countDownDateString.getMinutes() < 10 ? "0" + countDownDateString.getMinutes() : countDownDateString.getMinutes()) + ":" + (countDownDateString.getSeconds() < 10 ? "0" + countDownDateString.getSeconds() : countDownDateString.getSeconds()) + "</p>");


            if (percentage == 100 && distance < 0) {
                $("#journeyTimes").html("<p class=\"label\">REMAINING TIME:</p><p class=\"info\">0 DAYS 00:00:00</p>");
            } else {
                $("#journeyTimes").html("</br><p class=\"label\">REMAINING TIME:</p><p class=\"info\">" + days + "d " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "</p>");
            }
            $("#journeyTimes").append("<p class=\"label\">ELAPSED TIME:</p><p class=\"info\">" + daysE + "d " + (hoursE < 10 ? "0" + hoursE : hoursE) + ":" + (minutesE < 10 ? "0" + minutesE : minutesE) + ":" + (secondsE < 10 ? "0" + secondsE : secondsE) + "</p>");
            $("#journeyTimes").append("<p class=\"label\">Total passengers:</p><p class=\"info\">" + totalPassengers + "</p>");

            $("#distanceHolder").html("<p class=\"label\">Distance between Earth and Mars:</p><p class=\"info\">54600000 </p><p class=\"info\" id=\"distKM\">km</p>");
            $("#distanceHolder").append("<p class=\"label\">Distance between craft and Mars:</p><p class=\"info\">" + rocketMarsDistance + " </p><p class=\"info\" id=\"distKM\">km</p>");

            $(".timeProgressInfo").html("<p class=\"label\">Distance between Earth and Mars:</p><p class=\"info\">54600000 </p><p class=\"info\" id=\"distKM\">km</p>");
            $(".timeProgressInfo").append("<p class=\"label\">Distance between spacecraft and Mars:</p><p class=\"info\">" + rocketMarsDistance + " </p><p class=\"info\" id=\"distKM\">km</p>");


            $(".progress").css("visibility", "visible");

            readTextFile("distance");
            readTextFile("o2");
            o2co2Graph();

            if (percentage < 99 && distance > 0) {
                $("#journeyProgressPercentage").html("<p class=\"label\">Journey:</p><p class=\"info\">" + percentageR + "%</p>");
                $("#percentageGenInfo").html("<p class=\"label1\">Journey:</p><p class=\"info1\">" + percentageR + "%</p>");
                $(".progress").val(percentageR);
            } else if (percentage > 99 && percentage < 100 && distance > 0) {
                $("#percentageGenInfo").html("<p class=\"label1\">Journey:</p><p class=\"info1\">99%</p>");
                $("#journeyProgressPercentage").html("<p class=\"label\">Journey:</p><p class=\"info\">99%</p");
                $(".progress").val("98");
            } else if (percentage == 100 && distance < 0) {
                clearInterval(x);
                $("#percentageGenInfo").html("<p class=\"info1\">Distination reached!</p></br><p class=\"label1\">Journey:</p><p class=\"info1\">" + percentageR + "%</p>");
                $("#journeyProgressPercentage").html("</br><p class=\"info\">Distination reached!</p></br><p class=\"label\">Journey:</p><p class=\"info\">" + percentageR + "%</p>");
                $(".progress").val(percentageR);
                $(".pointer").css("transition", "5s all");
                $(".pointer").css("transform", "rotate(0deg)");
                journeyFinished = true;
            }
        }, 1000);

        var timer = setInterval(function() {
            //Reload date check for changes during expo:
            readDates();
        }, 10000);

        var reloadThreatSimulation = setInterval(function() {
           if (attentionCount < 2) {
            checkAttention(false);
            attentionCount++
            }
        }, 45000);
    }

    function checkAttention(checkState) {
        attentionState = false;
        if (checkState == false && attentionClear == null && attention == false && threat == false) {
            threatAlert();
        } else if (checkState == false && attentionClear == null && attention == true && threat == true) {
            noThreat();
        } else if (checkState == true) {
            if (attention == true){
                attentionState = true;
            }
        }
        return attentionState;
    }

    function threatAlert() {
        attentionClear = null;
        attention = true;
        threat = true;
        var attentionTitle = "ATTENTION!";
        var attentionMessage = "Please return to your cabin. A meteor is approaching and we need to accelerate speed and drop altitude!</br>Remain in your cabin, use the oxygen mask and fasten your seatbealts.";
        $("#fullScreen").hide();
        $(".dashboard").hide();
        $("#messageButton").hide();
        $("#safetybeltButton").show();
        $("#backButton").hide();
        $("#backButton").css("display","none");
        $("#attention").css("display", "block");
        $("#attentionIcon").css("display", "block");
        $("#attention").css("border", "");
        $("#attentionTitle").css("color", "");
        $("#attentionMessage").css("color", "");
        $("#attentionTitle").html(attentionTitle);
        $("#attentionMessage").html(attentionMessage);
    }

    function noThreat() {
        attentionClear = setTimeout(function() {
            attention = true;
            threat = false;
            var attentionTitle = "ATTENTION!";
            var attentionMessage = "There was a colision threat alert. The threat alert is deactivated. You may also remove your safety belt again.</br>The spacecraft is safe again.";
            $("#fullScreen").hide();
            $(".dashboard").hide();
            $("#messageButton").hide();
            hideBubble();
            $("#safetybeltButton").hide();
            $("#safetybeltButton").css("display", "");
            $("#backButton").hide();
            $("#backButton").css("display","none");
            $("#attentionIcon").css("display", "");
            $("#attention").css("display", "block");
            $("#attention").css("border", "2px dashed #22EE00");
            $("#attentionTitle").css("color", "#22EE00");
            $("#attentionMessage").css("color", "#22EE00");
            $("#attentionTitle").html(attentionTitle);
            $("#attentionMessage").html(attentionMessage);
            $("#attentionOKButton").show().delay(3000);
        }, 500);
    }

    function setPointer() {
        if (journeyFinished == false) {
            var maxPointer = 272;
            var maxSpeed = 15000;
            var halfSpeed = 7500;
            var halfDegrees = 136;
            var pointerPercent = ((speeds[showSpeed] / maxSpeed) * 100);
            pointer = pointerPercent / 100 * maxPointer;
            $(".pointer").css("transform", "rotate(" + pointer + "deg)");
            $("#speedDigital1, #speedDigital2").html(speeds[showSpeed]);
        }
    }

    function spacexSpeed() {
        if (journeyFinished == false) {
            setTimeout(function() {
                //Give db some time before loading again. Too fast might cause the db not loading...
                if (speedRead == false && journeyFinished == false) {
                    readSpeed();
                    speedRead = true;
                }
            }, 1000);

            setTimeout(function() {
                //Give db some time before loading again. Too fast might cause the db not loading...
                if (showSpeed == speeds.length) {
                    showSpeed = 0;
                } else if (showSpeed != speeds.length) {
                    setPointer();
                    updateDistance();
                    showSpeed++;
                }
                spacexSpeed();
            }, 500);
        }
    }

    function readSpeed() {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var lines = rawFile.responseText.split("\n");

                    var speedsIndex = lines.indexOf("[speed]");
                    var speedsIndexEnd = lines.indexOf("", speedsIndex);
                    var totalRecords = speedsIndexEnd - speedsIndex;

                    for (var i = 0; i < totalRecords - 1; i++) {
                        if (i + 1 < totalRecords) {
                            speeds[i] = lines[i + 1];
                            sumSpeed = sumSpeed + parseInt(speeds[i]);
                        }
                    }
                }
            }
        }
        rawFile.send(null);
    }

    function updateDistance() {
        if (!avgCalc) {
            avgSpeed = Math.floor(sumSpeed / speeds.length);
            avgCalc = true;
        }

        timeLeft = Math.floor(startDistance / avgSpeed);
        currentDistance = (avgSpeed * elapsedHours);

        rocketMarsDistance = startDistance - currentDistance;

        $("#estimatedJourneyDuration1, #estimatedJourneyDuration2").html(hours(timeLeft));

        $("#averageSpeed1, #averageSpeed2").html("" + avgSpeed);

        $("#currentDistance1, #currentDistance2").html(currentDistance);
    }

    function hours(hrs) {
        var milliseconds = Math.floor(timeLeft * 3600000);
        var seconds = Math.floor(milliseconds / 1000) % 60;
        var minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        var hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
        var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        var startDate = new Date(Date.parse(journeyDateStarted));
        var theDate = parseInt(milliseconds) + parseInt(startDate.getTime());
        estimatedArrival = new Date(theDate);
        var countDownDateString = new Date(Date.parse(estimatedArrival));
        var theTime = days + " days " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        return theTime;
    }

    function formatDate(datetoformat) {
        var aDate = new Date(datetoformat);
        var formattedDate = [];
        var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var curr_day = aDate.getDay();
        var curr_date = aDate.getDate();
        var curr_month = aDate.getMonth();
        var curr_year = aDate.getFullYear();

        var h = aDate.getHours();
        var m = aDate.getMinutes();
        var s = aDate.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        curr_date = checkDate(curr_date.toString());

        aDate = (d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date + " " + curr_year);
        formattedDate[0] = aDate;
        formattedDate[1] = h + ":" + m + ":" + s;

        return formattedDate;
    }

    function startTime() {
        var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var date = new Date();

        var curr_day = date.getDay();
        var curr_date = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        curr_date = checkDate(curr_date.toString());

        date = (d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date + " " + curr_year);

        setTimeout(function() {
            $(".time").html("<p class=\"label1\">Date:</p><p class=\"info1\">" + date + "</p></br><p class=\"label1\">Time:</p><p class=\"info1\">" + h + ":" + m + ":" + s + "</p>");
            startTime();
        }, 1000);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function checkDate(j) {
        if (j == 1 || j == 21 || j == 31) {
            j = j + "<sup class=\"lowcase\">st</sup>";
        } else if (j == 2 || j == 22) {
            j = j + "<sup class=\"lowcase\">nd</sup>";
        } else if (j == 3 || j == 23) {
            j = j + "<sup class=\"lowcase\">rd</sup>";
        } else {
            j = j + "<sup class=\"lowcase\">th</sup>";
        }
        return j;
    }

});
