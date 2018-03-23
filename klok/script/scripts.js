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

	animatePage();
	initClock();
	startTime();

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
	 * Animate page with transitions and easing effects
	 */
	function animatePage() {
		headerAni.to(header, 1.5, {top: 0, ease:Bounce.easeOut});
		bodyAni.to(body, 1, {opacity: 1, top: 0, ease:Bounce.easeOut});
	}

	/*
	 * Attach background according to time of day
	 */
	function attachBackground(bg) {
		switch(bg) {
		    case 1:
				TweenMax.set(body,{backgroundImage:'url(images/ochtend.png)'});
		        break;
		    case 2:
				TweenMax.set(body,{backgroundImage:'url(images/middag.png)'});
		        break;
		    case 3:
				TweenMax.set(body,{backgroundImage:'url(images/avond.png)'});
				break;
		    case 4:
				TweenMax.set(body,{backgroundImage:'url(images/nacht.png)'});
		        break;
		    default:
		}
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
	  			{ top: 0, backgroundImage:'url(images/clockpanel.png)', opacity: 1,
	  			repeat: 0,
	  			yoyo: true,
	  			ease: Linear.easeIn
	  		});
		});
	}


	/*
	 * Sets the starting clock image icon
	 */
	function initClock() {
		$(".clockContainer").css("backgroundImage","url(images/clockpanel1.png)");
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
	        	$(".clockContainer").css("backgroundImage","url(images/clockpanel1.png)");
	        	clockContainerZoomOut.fromTo('.clockContainer', 0.8, 
		        	{scale: 1.0, opacity: 1.0, repeat: 0, yoyo: false},
		        	{scale: 0.2, opacity: 1.0, repeat: 0, yoyo: false}
		        );
	    }); 
	}


	/*
	 * This function animates the analog clock with the given variables
	 */
	function showTime(hours, minutes, seconds, date) {
  		var theSeconds = seconds;
    	var minutesAsSeconds = minutes * 60;    
    	var hoursAsSeconds = (((hours % 12) + (minutes / 60)) * 60 * 60);

    	hourTween.progress(hoursAsSeconds / twelveHours);
    	minuteTween.progress(minutesAsSeconds / oneHour);
    	secondTween.progress((theSeconds / sixtySeconds));

    	if (seconds > 0 && seconds < 15) {
    		$("#time").html("Date:&nbsp;" + date + "</br></br>Time:&nbsp;" + hours + ":" + minutes + ":" + seconds + "&nbsp;GMT+1:00");
    	} else if (seconds > 15 && seconds < 30) {
    		$("#time").html("Date:&nbsp;" + date + "</br></br>Time:&nbsp;" + parseInt(hours-5) + ":" + minutes + ":" + seconds + "&nbsp;GMT-4:00");
    	} else if (seconds > 30 && seconds < 59) {
    		$("#time").html("Date:&nbsp;" + date + "</br></br>Time:&nbsp;" + parseInt(hours-8) + ":" + minutes + ":" + seconds + "&nbsp;GMT-7:00");
    	}

        switch (seconds) {
        	case 15:
        		attachBackground(1);
        	break;

        	case 30:
        		attachBackground(2);
        	break;

        	case 45:
        		attachBackground(3);
        	break;

        	case 59:
        		attachBackground(4);
        	break;

        	default:
        }

        startAnimation();
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
        	showTime(h, m, s, date);
            startTime();
        }, 500);
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
