$(document).ready(function() {
$("#work-items li:visible").filter(":nth-child(3n)").css("margin-right", "0px");
	$('ul#filter li').click(function() {		
		$('ul#filter li.current').removeClass('current');
		$(this).addClass('current');
		
		var filterVal = $(this).text().toLowerCase().replace(/ /g,'-');
				
		// if(filterVal == 'all') {
			//$('ul#work-items li, img.absolute').animate({opacity: 1}, 1000);
		//} else {
			
		//	$('ul#work-items li').each(function() {
			//	if(!$(this).hasClass(filterVal)) {
			//		$(this).animate({opacity: 0.1}, 1000);
			//		if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			//		$(this).find(".photo-holder").css("position", "static");													
			//		$(this).find("img.absolute").animate({opacity: 0.1}, 1000);													
			//		}
			//	} else {
				//	$(this).animate({opacity: 1}, 1000);
				//	if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
				//	$(this).find(".photo-holder").css("position", "static");													
				//	$(this).find("img.absolute").animate({opacity: 1}, 1000);
				//	}
				//}
			//});
	//	}
		//return false;
		if(filterVal == 'all') {
			$('ul#work-items li, img.absolute').show('slow', function(){
				$("#work-items li").css("margin-right", "36px");
				$("#work-items li").filter(":nth-child(3n)").css("margin-right", "0px");
			});
			
		} else {
			
			$('ul#work-items li').each(function() {
				if(!$(this).hasClass(filterVal)) {
					$(this).hide('slow',function() {
					
					$("#work-items li").css("margin-right", "36px");
						var count=0;
					$("#work-items").find('li').each(function() {
						if($(this).css("display") != "none"){
							count++;
							if(count%3 == 0)
							{
								$(this).css("margin-right", "0");
							}
						}
					});
					
					});
					
									
				} else {
					$(this).show('slow',function() {
					
					$("#work-items li").css("margin-right", "36px");
						var count=0;
					$("#work-items").find('li').each(function() {
						if($(this).css("display") != "none"){
							count++;
							if(count%3 == 0)
							{
								$(this).css("margin-right", "0");
							}
						}
					});
					
					});
									
				}
			});
		}
		return false;
		
	});
});
function itemsDoLayout()
{
	$("#work-items li:visible:nth-child(3n)").css("margin-right", "0px");
}