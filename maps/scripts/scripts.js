 /**
 * On load start map
 */

 // declare
var map;
var marker, i;
var infowindow;
var image;
var pokeball;
var prev_infowindow = false;
var locations;
var pokemonLocations;
var shape;
var myStyles;
var content = new Array();
var contentPopUp = new Array();
var pokemonContent = new Array();
var pokemonContentPopUp = new Array();
var activeInfo = null;
var zoomMap = 0;
var x = window.matchMedia("only screen and (max-width: 732px) and (orientation: landscape)");
var temp;
var date;
var time;
var iconUrl;
var resolution;
var bounds;
var maxWidth = 0;
var popup = false;
var pokemon = new Array();

$(document).ready(function() {

 	var menu = false;

 	var header = document.getElementById("header");
	var headerAni = new TimelineMax();

 	var nav = document.getElementById("left");
	var navAni = new TimelineMax();

	var main = document.getElementById("main");
	var mainAni = new TimelineMax();

	window.onresize = function(event) {
		if (window.matchMedia("only screen and (max-width: 732px) and (orientation: portrait)").matches) {
	    	x = window.matchMedia("only screen and (max-width: 732px) and (orientation: portrait)");
	    	resolution ="only screen and (max-width: 732px) and (orientation: portrait)";
	    }

    	if (window.matchMedia("only screen and (max-width: 640px) and (orientation: landscape)").matches) {
	    	x = window.matchMedia("only screen and (max-width: 640px) and (orientation: landscape)");
	    	resolution ="only screen and (max-width: 640px) and (orientation: landscape)";
	    }

	    if (window.matchMedia("only screen and (max-width: 412px) and (orientation: portrait)").matches) {
	    	x = window.matchMedia("only screen and (max-width: 412px) and (orientation: portrait)");
	    	resolution ="only screen and (max-width: 412px) and (orientation: portrait)";
	    }

	    if (window.matchMedia("only screen and (max-width: 360px) and (orientation: portrait)").matches) {
	    	x = window.matchMedia("only screen and (max-width: 360px) and (orientation: portrait)");
	    	resolution ="only screen and (max-width: 360px) and (orientation: portrait)";
	    }

	    zoom(x);
	    // alert(resolution);
	};

	$("#landinginfo").click(function() {
		displayPopup();
	});

	$("#refresh").click(function() {
		refreshPage();
	});

	$("#menu").click(function() {
	 	if (!menu && !popup) {
	 		openMenu();
	 	} else if (menu && !popup) {
	 		closeMenu();
	 	}
	});

	$("#menu").hover(function() {
		if (!menu && !popup) {
			$("#menu").css("backgroundColor","#999999");
		}
	});

	$("#left li, #refresh").click(function(){
		closeMenu();
	});

	$("main, #map").click(function(){
		closeMenu();
	});

	$("#thehague").click(function(){
		moveToLocation("thehague");
	});

	$("#area51").click(function(){
		moveToLocation("area51");
	});

	function openMenu() {
		if (!menu) {
			$("#menu").focus();
			headerAni.to(header, 0.35, {left: 230});
			mainAni.to(main, 0.35, {left: 230});
			navAni.to(nav, 0.30, {left: 0});
		 	$("#menu").css("backgroundColor","#999999");
		 	menu = true;
	 	}
	}

	function closeMenu() {
		if (menu) {
			// setTimeout(function(){
				headerAni.to(header, 0.30, {left: 0});
			 	mainAni.to(main, 0.30, {left: 0});
			 	navAni.to(nav, 0.35, {left: -275});
			 	$("#menu").css("backgroundColor","#181C1F");
			 	menu = false;
		 	// },0);
		}
	}


	function refreshPage() {
		if (menu) {
	 		closeMenu();
	 	}
		location.reload();
	}

	function moveToLocation(spot){
	var center;
    if (spot == "thehague") {
    	center = new google.maps.LatLng(52.076723, 4.268540);
    	map.setZoom(12);
    	map.panTo(center);
    } else if (spot == "area51") {
    	center = new google.maps.LatLng(37.234332396, -115.80666344);
    	map.setZoom(zoomMap);
    	map.panTo(center);
    }
}

	initMap(pokemon);

 });


function setMaxWidth(maxWidth) {
		this.maxWidth = maxWidth;
	}

	function getMaxWidth() {
		return maxWidth;
	}


function initTheMap(pokemon) {
	//create empty LatLngBounds object
	bounds = new google.maps.LatLngBounds();

	// store location

	contentPopUp[0] = 'Malieveld, Den Haag';
	contentPopUp[1] = 'Zuiderpark, Den Haag';
	contentPopUp[2] = 'Scheveningse Bosjes - Ten Vijverpad, Den Haag';
	contentPopUp[3] = 'Ockenburg, Den Haag';

	content[0] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + contentPopUp[0] + '</p>'+temp+'</br><img class="placepic" src="https://ranberth.github.io/Git-Basics---Ranbert/maps/images/malieveld.jpg" alt="'+contentPopUp[0]+'"/></div></div>';
	content[1] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + contentPopUp[1] + '</p>'+temp+'</br><img class="placepic" src="https://ranberth.github.io/Git-Basics---Ranbert/maps/images/zuiderpark.jpg" alt="'+contentPopUp[1]+'"/></div></div>';
	content[2] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + contentPopUp[2] + '</p>'+temp+'</br><img class="placepic" src="https://ranberth.github.io/Git-Basics---Ranbert/maps/images/tenvijverpad.jpg" alt="'+contentPopUp[2]+'"/></div></div>';
	content[3] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + contentPopUp[3] + '</p>'+temp+'</br><img class="placepic" src="https://ranberth.github.io/Git-Basics---Ranbert/maps/images/ockenburg.jpg" alt="'+contentPopUp[3]+'"/></div></div>';

	locations = [
      [content[0], 52.085502, 4.319468, contentPopUp[0], 1],
      [content[1], 52.057003, 4.284668, contentPopUp[1], 2],
      [content[2], 52.097995, 4.293091, contentPopUp[2], 3],
      [content[3], 52.060519, 4.214591, contentPopUp[3], 4]
    ];


    pokemonContentPopUp[0] = pokemon[0];
	pokemonContentPopUp[1] = pokemon[1];
	pokemonContentPopUp[2] = pokemon[2];

	pokemonContent[0] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + pokemonContentPopUp[0] + '</p></br><p class="normaltext">It seems that a level 5 ' + pokemonContentPopUp[0] + ' appeared in that area! Catch it!</p></br><div class="pokemonpic"><img class="placepic" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="'+pokemonContentPopUp[0]+'"/></div></div></div>';
	pokemonContent[1] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + pokemonContentPopUp[1] + '</p></br><p class="normaltext">It seems that a level 20 ' + pokemonContentPopUp[1] + ' appeared in that area! Catch it!</p></br><div class="pokemonpic"><img class="placepic" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" alt="'+pokemonContentPopUp[1]+'"/></div></div></div>';
	pokemonContent[2] = '<div class="infoWrapper"><div class="infowindow"><p class="place">' + pokemonContentPopUp[2] + '</p></br><p class="normaltext">It seems that a level 55 ' + pokemonContentPopUp[2] + ' appeared in that area! Catch it!</p></br><div class="pokemonpic"><img class="placepic" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="'+pokemonContentPopUp[2]+'"/></div></div></div>';

	pokemonLocations = [
      [pokemonContent[0], 52.082865, 4.321859, pokemonContent[0], 1],
      [pokemonContent[1], 52.057003, 4.294648, pokemonContent[1], 2],
      [pokemonContent[2], 52.090427, 4.252497, pokemonContent[2], 3]
    ];


    // set styles
    myStyles =[{
		        featureType: "poi",
		        elementType: "labels",
		        stylers: [
		              { visibility: "on" }
		        ]
		    }
		];

	// set pointer coordinates 
	map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoomMap,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: myStyles,
      streetViewControl: false
    });

    zoom(x); // Call listener function at run time
	x.addListener(zoom); // Attach listener function on state changes

    image = {
	    url: 'https://ranberth.github.io/Git-Basics---Ranbert/maps/images/spacexmarker.png',
	    // This marker is 20 pixels wide by 32 pixels high.
	    size: new google.maps.Size(20, 32),
	    // The origin for this image is (0, 0).
	    origin: new google.maps.Point(0, 0),
	    // The anchor for this image is the base of the flagpole at (0, 32).
	    anchor: new google.maps.Point(0, 32)
	  };

	pokeball = {
	    url: 'https://ranberth.github.io/Git-Basics---Ranbert/maps/images/pokeball_icon.png',
	    // This marker is 20 pixels wide by 32 pixels high.
	    size: new google.maps.Size(32, 32),
	    // The origin for this image is (0, 0).
	    origin: new google.maps.Point(0, 0),
	    // The anchor for this image is the base of the flagpole at (0, 32).
	    anchor: new google.maps.Point(0, 32)
	  };

	shape = {
		    coords: [0, 2, 0, 29, 20, 29, 29, 0],
		    type: 'poly'
	  	};

	for (i = 0; i < locations.length; i++) {
      dropMarker(i, marker, image, locations, map, content, bounds);
    }

    for (i = 0; i < pokemonLocations.length; i++) {
      dropMarker(i, marker, pokeball, pokemonLocations, map, pokemonContent, bounds);
    }

    infowindow = new google.maps.InfoWindow({
		maxWidth: 200,
		maxHeight: 200
	});
}


/*
 * Drops markers one after the other with delay
 */
function dropMarker(i, marker, image, locations, map, contentPopUp, bounds) {
    setTimeout(function() {
		marker = new google.maps.Marker({
	        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	        map: map,
	        icon: image,
			draggable: false,
			animation: google.maps.Animation.DROP,
			shape: shape,
		    title:locations[i][3],
		    zIndex: location[4]
		});

		//extend the bounds to include each marker's position
  		bounds.extend(marker.position);

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	          infowindow.setContent(locations[i][0]);
	          infowindow.open(map, marker);
	          marker.setAnimation(null);
	          toggleBounce(map, marker);
	        }
		})(marker, i));

		//now fit the map to the newly inclusive bounds
		map.fitBounds(bounds);

		google.maps.event.addListener(infowindow, 'closeclick', function() {
    		marker.setAnimation(null);
		});

    }, i * 800);
}


/*
 * Animates the marker to bounce and what to show or hide on click
 */
function toggleBounce(map, marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
    infowindow.close(map, marker);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.open(map, marker);
  }
}


/*
 * Check how much to zoom using media query
 */
 function zoom(x) {
	if (x.matches) {
        zoomMap = 19;
        map.setZoom(zoomMap);
    } else {
    	zoomMap = 19.25;
    	map.setZoom(zoomMap);
	}

    // if (x.matches == false) {
    	if (window.matchMedia("only screen and (max-width: 732px) and (orientation: landscape)").matches) {
    		zoomMap = 19.25;
	    	map.setZoom(zoomMap);
	    }

    	if (window.matchMedia("only screen and (max-width: 640px) and (orientation: landscape)").matches) {
    		zoomMap = 18.75;
	    	map.setZoom(zoomMap);
	    	setMaxWidth(350);
	    	map.setMapTypeId('hybrid');

	    }

	    if (window.matchMedia("only screen and (max-width: 412px) and (orientation: portrait)").matches) {
	    	zoomMap = 18.25;
	    	map.setZoom(zoomMap);
	    }

	    if (window.matchMedia("only screen and (max-width: 360px) and (orientation: portrait)").matches) {
	    	zoomMap = 18;
	    	map.setZoom(zoomMap);
	    }
    // }
    // alert(zoomMap);
	map.fitBounds(bounds);
 }


 /*
  * OpenWeatherAPI
  */
  function initMap(pokemon){

    firstAPI();
    // setTimeout(function(){
    	secondAPI(pokemon);
    // }, 500);
  }


function secondAPI(pokemon) {
	fetch("pokeapi.salestock.net/api/v2/pokemon/?limit=2")

	// parse to JSON format
	.then(function(response) {
		return response.json();
	})
	
	.then(function(response) {

		onAPISucces2(response, pokemon);
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}


function firstAPI() {
	fetch("api.openweathermap.org/data/2.5/forecast?q=the%20Hague,nl&units=metric&APPID=0e1fa79e84c1e49f820858649108a21c")

	// parse to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {

		// render weatherCondition
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}

function onAPISucces2(response, pokemon) {
	// get all
	for (var i=0;i < 3; i++) {
		pokemon[i] = response.results[i].name;
	}

	initTheMap(pokemon);

	//$("#temp").html(pokemon);
}
  
function onAPISucces(response) {
	// get all temps (now)
	var now = response.list[0].main;

	//console.log(now);

	// get type of weather in string format
	var type = response.list[0].weather[0].main

	//console.log(response.list[0]);

	// get Celcius
	var degC = Math.floor(now.temp);

	temp = degC + "&#176;C";

	var dateTime = new Date(response.list[0].dt_txt);
	date = formDate(dateTime);
	time = formTime(dateTime);
	iconUrl = 'http://openweathermap.org/img/w/'+response.list[0].weather[0].icon+'.png';

	$("#tempicon").css("background-image","url("+iconUrl+")");
	$("#temp").append(temp);
}

/**
 * Format date
 */
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}

/**
 * Format time
 */
function formTime(date) {
	var hours = date.getHours();
	if(hours<10){
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0'+ minutes;
	}
	return hours +':'+ minutes;
}


/*
 * Show popup
 */
 function displayPopup() {
 	$("#popUpWrapper").css("display","block");
 	$("#popUpWrapper").css("opacity","1");
 	$("#popUpWrapper").css("top", "-20px");
    $("#popUpWrapper").css("left", "50%");

    $("#content").html("Landing places in The Hague city: 4</br></br>"+contentPopUp[0]+", "+contentPopUp[1]+", "+contentPopUp[2]+" and "+contentPopUp[3]+".");

 	popup = true;

 	var mousePosition;
	var offset = [0,0];
	var div;
	var isDown = false;

 	var div = document.getElementById('popUpWrapper');
	if (popup) {
		div.addEventListener('touchmove', function(event) {
		    var touch = event.targetTouches[0];
		    div.style.left = (touch.pageX) + 'px';
		    div.style.top  = (touch.pageY-100) + 'px';
		    event.preventDefault();
	  	}, false);

	  	div.addEventListener('mousedown', function(e) {
		    isDown = true;
		    offset = [
		        div.offsetLeft - e.clientX,
		        div.offsetTop - e.clientY
		    ];
		}, true);

		document.addEventListener('mouseup', function() {
		    isDown = false;
		}, true);

		document.addEventListener('mousemove', function(event) {
		    event.preventDefault();
		    if (isDown) {
		        mousePosition = {

		            x : event.clientX,
		            y : event.clientY

		        };
		        div.style.left = (mousePosition.x + offset[0]) + 'px';
		        div.style.top  = (mousePosition.y + offset[1]) + 'px';
		    }
		}, true);
	}
 }


 /*
 * Dismiss popup
 */
 function dismissPopup() {
 	$("#popUpWrapper").css("display","none");
 	$("#popUpWrapper").css("opacity","0");
 	popup = false;
 	document.getElementById("popUpWrapper").removeEventListener("touchmove", null);
 	document.getElementById("popUpWrapper").removeEventListener("mousemove", null);
 	document.getElementById("popUpWrapper").removeEventListener("mouseup", null);
 	document.getElementById("popUpWrapper").removeEventListener("mousedown", null);
 }
