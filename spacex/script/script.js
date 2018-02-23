var journeyDateStarted = "";
var journeyDateEnded = "";
var percentage = null;
var speeds = [];

function startJourney() {
    $("#data").text("JOURNEY STARTED");
    countDown();
}

function readTextFile(type) {
	var file = "http://spacex.ranbert.com/input.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var lines = rawFile.responseText.split("\n");

                var index = lines.indexOf("[" + type + "]");
                var indexEnd = lines.indexOf("", index);
                
                for (var line = index + 1; line < lines.length; line++) {
                    if ((type == "km" || type == "distance" || type == "passengers" || type == "rocketfuel") && line < indexEnd) {
                            $("#data").append("</br>" + lines[line]);
                    }
                }
            }
        }
    }
    rawFile.send(null);
}

function readDates() {
	var file = "http://spacex.ranbert.com/input.txt";
    var rawFile = new XMLHttpRequest();
	journeyDateStarted = "";
	journeyDateEnded = "";
	
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var lines = rawFile.responseText.split("\n");
				
                var journeyStartedIndex = lines.indexOf("[journeystarted]");				
                journeyDateStarted = lines[journeyStartedIndex+1];
				
				var journeyEndedIndex = lines.indexOf("[journeyended]");
                journeyDateEnded = lines[journeyEndedIndex+1];
            }
        }
    }
    rawFile.send(null);
}

function readSpeed() {
    var file = "http://spacex.ranbert.com/input.txt";
    var rawFile = new XMLHttpRequest();
    speeds = [];
    
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var lines = rawFile.responseText.split("\n");
                
                var speedsIndex = lines.indexOf("[speed]");
                var speedsIndexEnd = lines.indexOf("", speedsIndex);
            
                for (var i = 0; i <lines.length; i++) {
                    if (i < speedsIndexEnd) {
                    speeds[i] = lines[speedsIndex+1];
                    }
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
    // Retrieve the dates we need
	readDates();

    // Update the count down every 1 second
    var x = setInterval(function() {
        var countDownDate = new Date(Date.parse(journeyDateEnded)).getTime();
        var countDownDateString = new Date(Date.parse(journeyDateEnded));

        // Get todays date and time
        var now = new Date().getTime();
		
        var started = new Date(Date.parse(journeyDateStarted));

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Find the elapsed time from started time and now
        var elapsed = now - started.getTime();

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var daysE = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        var hoursE = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesE = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        var secondsE = Math.floor((elapsed % (1000 * 60)) / 1000);

        // Display the result in the element with id="data"
        $("#journeyHolder").text("STARTED ON: " + started.toDateString() + " " + (started.getHours() < 10 ? "0" + started.getHours() : started.getHours()) + ":" + (started.getMinutes() < 10 ? "0" + started.getMinutes() : started.getMinutes()) + ":" + (started.getSeconds() < 10 ? "0" + started.getSeconds() : started.getSeconds()));
        $("#journeyHolder").append("</br>ARIVAL EXPECTED ON: " + countDownDateString.toDateString() + " " + (countDownDateString.getHours() < 10 ? "0" + countDownDateString.getHours() : countDownDateString.getHours()) + ":" + (countDownDateString.getMinutes() < 10 ? "0" + countDownDateString.getMinutes() : countDownDateString.getMinutes()) + ":" + (countDownDateString.getSeconds() < 10 ? "0" + countDownDateString.getSeconds() : countDownDateString.getSeconds()));

        $("#journeyHolder").append("</br></br>REMAINING TIME: " + days + "d " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "");
        $("#journeyHolder").append("</br>ELAPSED TIME: " + daysE + "d " + (hoursE < 10 ? "0" + hoursE : hoursE) + ":" + (minutesE < 10 ? "0" + minutesE : minutesE) + ":" + (secondsE < 10 ? "0" + secondsE : secondsE) + "");

        $("#distanceHolder").html("Earth and Mars</br>Minimum distance: 54.6 million km.</br>Maximum distance: 401 million km.</br>Average distance: 225 million km.");

        $("#distanceHolder").append("</br></br>Rocket and Mars:</br>Distance: 54.6 million km.</br>");

        var totalMillisInRange = countDownDate - started;
        var elapsedMillis = now - started;
        percentage = (Math.max(0, Math.min(100, 100 * (elapsedMillis / totalMillisInRange))));
        var percentageR = roundP(percentage, 2);

        if (distance > 0) {
            $("#journeyHolder").append("</br>Journey: " + percentageR + "%");
            $(".progress").attr("value", percentageR);
        } else if (percentage > 99 && percentage <100 && distance > 0) {
            $("#journeyHolder").append("</br>Journey: 99%");
            $(".progress").attr("value", "99");
        } else if (percentage == 100 && distance < 0) {
            clearInterval(x);
            $("#journeyHolder").append("</br>Distination reached! Journey: " + percentageR + "%");
            $(".progress").attr("value",percentageR);
            spacexSpeed();
        }
    }, 1000);
}

function spacexSpeed() {
    readSpeed();
    //time = km / kmh;
    setTimeout(function() { 
        //alert(speeds[1]);

    }, 1000);
}