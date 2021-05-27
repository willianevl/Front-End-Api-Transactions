$(window).on('scroll', function () {
    if($(window).scrollTop()){
        $('nav').addClass('navRoll');
    }
    else {
        $('nav').removeClass('navRoll');
    }
});

$('nav .aHref').on('click', function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('nav').innerHeight(),
			targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

