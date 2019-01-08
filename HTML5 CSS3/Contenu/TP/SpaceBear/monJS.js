$(miniMenu).on( 'click', function () {
	console.log('deroule');
	$(menuDeroulant).toggle(); 
});

$(menuDeroulant).on( 'click', function () {
	console.log('enroule');
	$(menuDeroulant).slideToggle();
});

$('nav li')
	.on("mouseenter", function() {
	  	$(this).css({
	  		"background-color": "white",
	  	});
	  	$(this).children('a').css({
	  		"color": "#4acaa8",
	  	});
	})
	.on("mouseleave", function() {
	  	$(this).css({
	  		"background-color": "#4acaa8" 
	  	});
	  	$(this).children('a').css({
	  		"color": "white",
	  	});
	});


positionPrems = $(premsMarqeur).offset();
positionDeuz = $(deuzMarqeur).offset();
positionTrez = $(trezMarqeur).offset();
positionQuatro = $(quatroMarqeur).offset();

$(window).scroll(function(){
	var positionUser = $(window).scrollTop();
	console.log(positionUser);


/*	console.log(positionPrems, positionDeuz, positionTrez, positionQuatro);
*/
	if (positionUser > 0 && positionUser < positionDeuz.top ) {
		console.log('PROSITIONPREMS')
		$('.liPrems').css({
			"background-color": "white",
		});
		$('.liPrems').children('a').css({
			"color": "#4acaa8",
		});
		$("nav li:not('.liPrems')").css({
			"background-color": "#4acaa8",
		});
		$("nav li:not('.liPrems')").children('a').css({
			"color": "white",
		});
	};

	if (positionUser > positionDeuz.top && positionUser < positionTrez.top ) {
		console.log('PROSITIONDEUZ')
		$('.liDeuz').css({
			"background-color": "white",
		});
		$('.liDeuz').children('a').css({
			"color": "#4acaa8",
		});
		$("nav li:not('.liDeuz')").css({
			"background-color": "#4acaa8",
		});
		$("nav li:not('.liDeuz')").children('a').css({
			"color": "white",
		});
	};

	if (positionUser > positionTrez.top && positionUser < positionQuatro.top ) {
		console.log('PROSITIONTREZ')
		$('.liThree').css({
			"background-color": "white",
		});
		$('.liThree').children('a').css({
			"color": "#4acaa8",
		});
		$("nav li:not('.liThree')").css({
			"background-color": "#4acaa8",
		});
		$("nav li:not('.liThree')").children('a').css({
			"color": "white",
		});
	};

	if (positionUser > positionQuatro.top  ) {
		console.log('PROSITIONQUATRO')
		$('.liFour').css({
			"background-color": "white",
		});
		$('.liFour').children('a').css({
			"color": "#4acaa8",
		});
		$("nav li:not('.liFour')").css({
			"background-color": "#4acaa8",
		});
		$("nav li:not('.liFour')").children('a').css({
			"color": "white",
		});
	};

});




