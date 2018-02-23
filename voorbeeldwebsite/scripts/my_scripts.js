$(document).ready(function(){

	kruip();

});

function kruip(){
	$("#gerrit").animate({
				  	left: "+=10px",
				  	width: "210px"
			  	}, 600)
				.animate({
					left: "+=10px",
				  	width: "200px"
			  	}, 600);

	setTimeout("kruip()", 1200);
}
