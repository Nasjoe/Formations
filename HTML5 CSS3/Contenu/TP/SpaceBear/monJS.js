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


positionPrems = $(prems).offset();
positionDeuz = $(deuz).offset();
positionTrez = $(trez).offset();
positionQuatro = $(quatro).offset();

$(window).scroll(function(){
	var positionUser = $(window).scrollTop();
	console.log(positionUser);


/*	console.log(positionPrems, positionDeuz, positionTrez, positionQuatro);
*/
	if (positionUser > 0 && positionUser < positionDeuz.top ) {
		console.log('PROSITIONPREMS')
	};

	if (positionUser > positionDeuz.top && positionUser < positionTrez.top ) {
		console.log('PROSITIONDEUZ')
	};

	if (positionUser > positionTrez.top && positionUser < positionQuatro.top ) {
		console.log('PROSITIONTREZ')
	};

	if (positionUser > positionQuatro.top  ) {
		console.log('PROSITIONQUATRO')
	};

});



