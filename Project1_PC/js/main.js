var pcInteraction={
	navigation: function(){

		var $depth1=$("nav > ul > li");

		$depth1.hover(
			function(){
				$(this).addClass("active");
				$(this).parent().stop().animate({height:300}, 500);
			},
			function(){
				$(this).removeClass("active");
				$(this).parent().stop().animate({height:80}, 500);
			}
		);
		$depth1.children("a").focusin(function(){
			$(this).parent().addClass("active");
			$(this).parent().parent().stop().animate({height:300}, 500);
		});
		$("nav li li:last-child").focusout(function(){
			$(this).parent().parent().removeClass("active");
		});
		$("nav li:last-child li:last-child").focusout(function(){
			$("nav > ul").stop().animate({height:70}, 500);
		});
	}
}
