jQuery(window).load(function() {

  

  $('.doc-loader').fadeOut('slow');

  

    addTweets();

			

	$("#home_slider").carouFredSel({	

		responsive: true,

		width: '100%',

		auto: true,		

		pagination: "#home_slide_pager",	

		scroll: {

			fx: 'uncover-fade'

		},

		swipe: {

			onMouse: true,

			onTouch: true

		}, items: {

			height: 'variable'			

		}

	});

		

	$('#service_slider').carouFredSel({	

		responsive: true,

		auto: false,

		prev: '#testimonial-prev',

		next: '#testimonial-next',

		swipe: {

			onMouse: true,

			onTouch: true

		}, items: {		

			height: 'variable'

		}

	});			



	jQuery('.carousel_pagination').each(function(){

		var pagination_width = jQuery(this).width();

		var windw_width = jQuery(window).width();

		jQuery(this).css("margin-left", (windw_width-pagination_width)/2);

	});

	

	jQuery('#testimonial-prev, #testimonial-next').hover(function(){

        jQuery(this).find('img').css({

            'margin-top':'-42px'

        });

    }, function() {

        jQuery(this).find('img').css({

            'margin-top':'0px'

        });

    });

	

	jQuery('#about .social-about a').hover(function(){

        jQuery(this).find('img').css({

            'margin-top':'-33px'

        });

    }, function() {

        jQuery(this).find('img').css({

            'margin-top':'0px'

        });

    });

	

	jQuery('#news-items li a.read-more').hover(function(){

        jQuery(this).find('img').css({

            'margin-top':'-30px'

        });

    }, function() {

        jQuery(this).find('img').css({

            'margin-top':'0px'

        });

    });

	

	displayHints();

		

	jQuery('.read-more').click(function(e){

			

		e.preventDefault();	

		window.location.hash = '#popup_' + jQuery(this).attr("id");		

		jQuery('.leveltenPopupHolder').empty();

		jQuery('.leveltenPopupHolder').load(jQuery(this).attr("href"), function(){

			jQuery("<a/>").prependTo('article.modal .article-content')

			.addClass('popup-close')

			.hover(function(){

				jQuery(this).find('img').css({

					'margin-top':'-26px'

				});

			}, function() {

				jQuery(this).find('img').css({

					'margin-top':'0px'

				});

			})

			.append(jQuery("<div/>")

					.addClass('image-holder')

					.append(jQuery("<img/>").attr({

								src: 'images/close_icon.png',

								alt: ''					

							}).addClass('absolute')));	

						

			var $modal = jQuery('.leveltenPopupHolder article.modal')

				.center({

					minY: ($(window).scrollTop() < $('.main-menu').next().offset().top - 35.5) ? 10 : parseInt($('.main-menu').position().top + 110)

				})

				.omniWindow({			

					modal: {

						hideClass: 'hidden'

					},

					callbacks: { 

						positioning: function(subjects) {

							subjects.modal.css('margin-left','0px');

						},

						afterHide: function(subjects, internalCallback) { 

							jQuery('.leveltenPopupHolder').empty();

						}

					}

				})

				.trigger('show');

	

	// Fix for Vimeo Video to be Full Screen

    jQuery(".vimeo").each(function() {

        var vimeo_width = jQuery(this).width();    

        var vimeo_height = vimeo_width*16*7/(90*2.2);

        jQuery(this).find('iframe').css('height',vimeo_height);    

    });

	

			$('.popup-close').click(function(e){

				e.preventDefault();

				$modal.trigger('hide');

			});

		});

	});	



	var hashID = window.location.hash.replace("popup_", "");

	jQuery(hashID).trigger('click');

});





jQuery(window).resize(function(){



jQuery('.carousel_pagination').each(function(){

		var pagination_width = jQuery(this).width();

		var windw_width = jQuery(window).width();

		jQuery(this).css("margin-left", (windw_width-pagination_width)/2);

	});



	jQuery('.leveltenPopupHolder article').center({

		minY:parseInt($('.main-menu').position().top + 110)

	});

	

	  // Fix for Vimeo Video to be Full Screen

    jQuery(".vimeo").each(function() {

        var vimeo_width = jQuery(this).width();    

        var vimeo_height = vimeo_width*16*7/(90*2.2);

        jQuery(this).find('iframe').css('height',vimeo_height);    

    });  

});



//------------------------------------------------------------------------

//Helper Methods -->

//------------------------------------------------------------------------

var displayHints = function()

{

	if(jQuery().attachHint) {		

		jQuery('#name').attachHint('Name:');

		jQuery('#email').attachHint('Email:');

		jQuery('#message').attachHint('Message:');

	}

}

var StringFormat = function() {

    var s = arguments[0];

    for (var i = 0; i < arguments.length - 1; i++) {

        var regExpression = new RegExp("\\{" + i + "\\}", "gm");

        s = s.replace(regExpression, arguments[i + 1]);

    }

    return s;

};



var ResetInput = function(){

    jQuery('input, textarea').each(function() {

        jQuery(this).val('').text('');

    });	

};



$(".photo-holder").hover(function(){

	$(this).css("opacity",0.8);

	$(this).find('img.portfolio-plus').first().show('normal');	

	},

	function(){

	$(this).find('img.portfolio-plus').first().hide();

	$(this).css("opacity",1);

});



var SendMail = function(){

    var isValid = true;

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(!emailReg.test($('#email').val()) || $('#email').val() == ""){

        isValid = false;

        alert('Your email is not in valid format');

    }

    if(isValid){

        var params = {

            'action'    : 'SendMessage',

            'name'      : $('#name').val(),

            'email'     : $('#email').val(),

            'subject'   : 'Email from Jeff McCommas',

            'message'   : $('#message').val()

        };

        $.ajax({

            type: "POST",

            url: "php/mainHandler.php",

            data: params,

            success: function(response){

                if(response){

                    var responseObj = jQuery.parseJSON(response);

                    if(responseObj.ResponseData)

                    {

                        alert(responseObj.ResponseData);  

                    }

                }

                ResetInput();   

				displayHints();	

            },

            error: function (xhr, ajaxOptions, thrownError){

                //xhr.status : 404, 303, 501...

                var error = null;

                switch(xhr.status)

                {

                    case "301":

                        error = "Redirection Error!";

                        break;

                    case "307":

                        error = "Error, temporary server redirection!";

                        break;

                    case "400":

                        error = "Bad request!";

                        break;

                    case "404":

                        error = "Page not found!";

                        break;

                    case "500":

                        error = "Server is currently unavailable!";

                        break;

                    default:

                        error ="Unespected error, please try again later.";

                }

                if(error){

                    alert(error);

                }

            }

        });

    }

};