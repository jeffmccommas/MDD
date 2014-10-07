$(window).bind('scroll resize', function() {	

	if ($(window).scrollTop() + 30 >= $('.main-menu').offset().top) {

		$('.main-menu').addClass('fixed');		

	} else if ($(window).scrollTop() < $('.main-menu').next().offset().top - 70.5) {		

		$('.main-menu').removeClass('fixed');

	}

	

	var currentSection = null;

	

	$('.section').each(function(){

		var element = $(this).attr('id');		

		if($(window).scrollTop() >= $('#'+element).offset().top - 71)

		{

			currentSection = element;

		}

	});

	

	$('.main-menu nav li').removeClass('active').find('a[href="#'+currentSection+'"]').parent().addClass('active');

	

});  



$('.main-menu nav li a').click(function() {

	$('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 800);

	return false;

});