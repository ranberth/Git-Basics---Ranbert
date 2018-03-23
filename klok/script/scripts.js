/*
 *	Load javascript when HTML is ready
 */
$(document).ready(function() {
	var header = document.getElementById("header");
	var body = document.getElementById("body");
	var main = document.getElementById("main");

	var headerAni = new TimelineMax();
	var bodyAni = new TimelineMax();

	var clicked = false;
	var tick = 0;

	var myPointerH = $('#clockHour');
	var myPointerM = $('#clockMinute');
	var myPointerS = $('#clockSecond');

	var oneHour = 60 * 60;			//1 hour tween
  	var twelveHours = 12 * 60 * 60; //12 hour tween
  	var sixtySeconds = 60;			//60 seconds

	TweenMax.set(myPointerH, {transformOrigin:"50% 100%"});
	TweenMax.set(myPointerM, {transformOrigin:"50% 100%"});
	TweenMax.set(myPointerS, {transformOrigin:"50% 100%"});

	// Initialize the clockContainer and timeDisplay with tweening object: 
	var clockContainer = new TimelineMax();
	TweenMax.set(clockContainer, {transformOrigin:"50% 50%"});

	var clockContainerZoomOut = new TimelineMax({onComplete:floatClock});
	TweenMax.set(clockContainerZoomOut, {transformOrigin:"50% 50%"});

	// TWEEN the HOURS
	var hourTween = TweenMax.to(myPointerH, twelveHours, {rotation:"360_cw", ease:Linear.easeNone,repeat:-1, paused: true});
	var minuteTween = TweenMax.to(myPointerM, twelveHours, {rotation: "360_cw", ease:Linear.easeNone, repeat:-1, paused: true});
	var secondTween = TweenMax.to(myPointerS, twelveHours, {rotation: "360_cw", ease:Linear.easeNone, repeat:-1, paused: true});

	startClock();

	$(".clockContainer").click(function() {
		if (clicked == false) {
			//show clock maximizing:
			maximizeClock();
			clicked = true;
		} else {
			//hide clock minimizing:
			resetClock();
			clicked = false;
		}
	});

	/*
	 * Starts animating the whole page
	 */
	function startClock() {
		setTimeout(function() {
			animatePage();
			initClock();
			startTime();
		},3000);
	}


	/*
	 * Animate page with transitions and easing effects
	 */
	function animatePage() {
		headerAni.to(header, 1.5, {top: 0, ease:Bounce.easeOut});
		bodyAni.to(body, 1, {opacity: 1, top: 0, ease:Bounce.easeOut});
	}


	/*
	 * Sets the starting clock image icon
	 */
	function initClock() {
		$(".clockContainer").css("backgroundImage","url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/clockpanel1.png)");
	}


	/*
	 * Maximize the Clock
	 */
	function maximizeClock() {
		$("#clockOuterBorder").show().css("opacity", 0).animate({
            opacity: 1
        }, 0, function(){
        	clockContainer.to('.clockContainer', 0.8, {scale: 1, ease: Bounce.easeOut});
        	TweenMax.to(".clockContainer", 1, 
	  			{ top: 0, backgroundImage:'url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/clockpanel.png)', opacity: 1,
	  			repeat: 0,
	  			yoyo: true,
	  			ease: Linear.easeIn
	  		});
		});
	}


	/*
	 * Tweens the clock icon to float up and down
	 */
	function floatClock() {
		TweenMax.fromTo(".clockContainer", 0.5,
  			{ top: 5, opacity: 1.0, scale: 0.2},
  			{ top: 0, opacity: 0.9, scale: 0.23, repeat: -1, yoyo: true });
	}


	/*
	 * Resets clock size and background image
	 */
	function resetClock() {
		$("#clockOuterBorder").show().css("opacity", 1).animate({
	            opacity: 0
	        }, function(){
	        	$(".clockContainer").css("cssText","transition: background 1s linear;");
	        	$(".clockContainer").css("backgroundImage","url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/clockpanel1.png)");
	        	clockContainerZoomOut.fromTo('.clockContainer', 0.8, 
		        	{scale: 1.0, opacity: 1.0, repeat: 0, yoyo: false},
		        	{scale: 0.23, opacity: 0.8, repeat: 0, yoyo: false}
		        );
	    }); 
	}


	/*
	 * This function animates the analog clock with the given variables
	 */
	function showTime(hours, minutes, seconds, date) {
  		var theSeconds = parseInt(seconds);
    	var minutesAsSeconds = minutes * 60;    
    	var hoursAsSeconds = (((hours % 12) + (minutes / 60)) * 60 * 60);

    	hourTween.progress(hoursAsSeconds / twelveHours);
    	minuteTween.progress(minutesAsSeconds / oneHour);
    	secondTween.progress((theSeconds / sixtySeconds));

        var aruba = calcTime('Aruba','-4.00')[0];
        var arubaDateTime = dateBeautifier(calcTime('Aruba','-4.00')[1]);

        var netherlands = calcTime('The Netherlands','1.00')[0];
        var netherlandsDateTime = dateBeautifier(calcTime('The Netherlands','1.00')[1]);

        var losAngeles = calcTime('Los Angeles','-7.00')[0];
        var losAngelesDateTime = dateBeautifier(calcTime('Los Angeles','-7.00')[1]);

        var country = "launch";
        var theHours = parseInt(hours);
        var theMinutes = parseInt(minutes);

    	/*
    	 * Timezone:
    	 * 
    	 * Here the date and time for the three countries I decided to support will rotate for some seconds in a specific
    	 * I chose. To display an image of the country's view during that hour, a variable country will also be filled in
    	 * for a later use in the function to attach a background for a change. This is also part of the experience of this clock.
    	 *
    	 */
    	if (theSeconds >= 0 && theSeconds <= 19) {
    		country = "aruba";
    		$("#time").html(aruba + ":</br>" + arubaDateTime['date'] + "</br>" + arubaDateTime['h'] + ":" + arubaDateTime['m'] + ":" + arubaDateTime['s'] + " - GMT-4:00");
    	
    	} else if (theSeconds >= 20 && theSeconds <= 39) {
    		country = "thenetherlands";
    		$("#time").html(netherlands + ":</br>" + netherlandsDateTime['date'] + "</br>" + netherlandsDateTime['h'] + ":" + netherlandsDateTime['m'] + ":" + netherlandsDateTime['s'] + " - GMT+1:00");
    	
    	} else if (theSeconds >= 40 && theSeconds <= 59) {
    		country = "losangeles";
    		$("#time").html(losAngeles + ":</br>" + losAngelesDateTime['date'] + "</br>" + losAngelesDateTime['h'] + ":" + losAngelesDateTime['m'] + ":" + losAngelesDateTime['s'] + " - GMT-7:00");
    	}

    	// Call this function to have the background working with the clock and put function bellow in comment!
    	prepareBackground(theHours, theMinutes, country);

    	// Call this function to prepare background according to second as a test trial but put function above in comment!
    	// testBackground(theSeconds, country);	

    	// This function calls the startAnimation again so it will make sure the clock will keep ticking.
        startAnimation();
  	}

  	/*
  	 * Function to have the background working with the clock accordingly.
  	 * The background images will all be displaying the image of the day or night time
  	 * regardless of the real time on Earth. The reason behind this is that Mars travellers
  	 * need to be active during the day time and would enjoy seeing photos of their country
  	 * at that time as if it was day time there too and else night time. There are
  	 * four different photos for the day sequence: morning, noon, afternoon and night. In other
  	 * words, to stimulate the travellers when to be active and when it is almost night and sleeping time.
  	 */
  	function prepareBackground(hours, minutes, country) {
  		var theHours = parseInt(hours);
  		var theMinutes = parseInt(minutes);
  		var theCountry = country;

  		if (parseInt(theHours) > 0 && parseInt(theHours) < 6) {
  			attachBackground(4, country);
  		} else if (parseInt(theHours) >= 6 && parseInt(theHours) < 7) {
  			attachBackground(1, country);
  		} else if (parseInt(theHours) >= 7 && parseInt(theHours) < 17) {
  			attachBackground(2, country);
  		} else if (parseInt(theHours) >= 17 && parseInt(theMinutes) > 29 && parseInt(theHours) < 19) {
  			attachBackground(3, country);
  		} else if (parseInt(theHours) >= 19 && parseInt(theHours) <= 23) {
  			attachBackground(4, country);
  		}

  	}


  	/*
	 * Attach a background according to time of day for the current country being displayed
	 *
	 */
	function attachBackground(bg, country) {
		var theCountry = country;
		switch(bg) {
		    case 1:
				TweenMax.set(body,{backgroundImage:'url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/ochtend_'+theCountry+'.png)'});
		        break;
		    case 2:
				TweenMax.set(body,{backgroundImage:'url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/middag_'+theCountry+'.png)'});
		        break;
		    case 3:
				TweenMax.set(body,{backgroundImage:'url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/avond_'+theCountry+'.png)'});
				break;
		    case 4:
				TweenMax.set(body,{backgroundImage:'url(https://ranberth.github.io/Git-Basics---Ranbert/klok/images/nacht_'+theCountry+'.png)'});
		        break;
		    default:
		}
	}


  	/*
	 * In this there is a switch/case I am attaching background images to a fictive
	 * day/night time change, separated instead by each 15 seconds.
	 * This means in a minute you will see images rotating with easing effect.
	 * See the attachBackground(bg, country) function for details how it is done.
	 *
	 */
  	function testBackground(theSeconds, country) {
        switch (theSeconds) {
        	case 0:
        		attachBackground(1, country);
        	break;

        	case 5:
        		attachBackground(2, country);
        	break;

        	case 10:
        		attachBackground(3, country);
        	break;

        	case 14:
        		attachBackground(4, country);
        	break;



        	case 20:
        		attachBackground(1, country);
        	break;

        	case 25:
        		attachBackground(2, country);
        	break;

        	case 30:
        		attachBackground(3, country);
        	break;

        	case 34:
        		attachBackground(4, country);
        	break;



        	case 40:
        		attachBackground(1, country);
        	break;

        	case 45:
        		attachBackground(2, country);
        	break;

        	case 50:
        		attachBackground(3, country);
        	break;

        	case 55:
        		attachBackground(4, country);
        	break;

        	default:
        }
  	}


  	/*
  	 * This function starts the animation of the clock using TweenMax
  	 */
  	function startAnimation() {
  		TweenMax.fromTo("#clockOuterBorder", 0.2, 
  			{ boxShadow: "0px 0px 50px 25px #022A90", },
  			{ boxShadow: "0px 0px 50px 35px #022A70",
  			repeat: -1,
  			yoyo: true,
  			ease: Linear.easeOut
  		});
  	}


  	/*
  	 * This function loads the time and activates the analog clock as well.
  	 */
    function startTime() {
    	var input = dateBeautifier(null);
        var h = input['h'];
        var m = input['m'];
        var s = input['s'];
        var date = input['date'];

        setTimeout(function() {
        	showTime(h, m, s, date);
            startTime();
        });
    }


    /** 
	 * Function to calculate local time in a different city given the city's UTC offset
	 */
	function calcTime(city, offset) {
		// Create array for later
		var placeDateTime = new Array();

	    // create Date object for current location
	    var d = new Date();

	    // convert to msec add local time zone offset get UTC time in msec
		var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

	    // create new Date object for different city using supplied offset
	    var nd = new Date(utc + (3600000*offset));

	    // return time as a string in an array
	    placeDateTime[0] = city;
	    placeDateTime[1] = nd;
	    return placeDateTime; //"The local time in " + city + " is " + nd.toLocaleString();
	}

	/*
	 *
	 */
	function dateBeautifier(theDate) {
		var date;
		if (theDate == null) {
			date = new Date();
		} else {
			date = theDate;
		}

		var dateTime = new Array();

		var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var curr_day = date.getDay();
        var curr_date = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();

        var today = date;
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        curr_date = checkDate(curr_date.toString());

        date = (d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date + " " + curr_year);

        dateTime['date'] = date;
        dateTime['h'] = h;
        dateTime['m'] = m;
        dateTime['s'] = s;

        return dateTime;
	}


    /*
     * This function ads leading zero to numbers (hours) under 10.
     */
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


    /*
     * This function checks the date and ands suffixes for the different numbers.
     */
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
