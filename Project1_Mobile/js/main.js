var $window;

var moblieInteration= {
	slideInter: function(){
		var $keyvisual=$(".keyvisual img");
		var $image=$(".image");

		$image.mobileDragEvent({total:4});

		var winw, winh, keyw, keyh;
		$window.resize(function(){
			$keyvisual.removeAttr("style");
			winw=$window.width();
			winh=$window.height();

			if(winw > winh){
				$keyvisual.css({"width":winw, "margin-left":(-1)*winw/2});
			}
			else{
				$keyvisual.css({"height":winh});
				keyw=$keyvisual.width();
				$keyvisual.css({"margin-left":(-1)*keyw/2});
			}
		})
		$window.trigger("resize");
	},

	navAction: function(){
		var $tab=$(".tab")
		var $menu=$(".menu")
		var $close=$(".close")
		var $depth1=$("#nav > ul > li")

		$tab.click(function(e){
			e.preventDefault();
			$menu.addClass("active");
		});
		$close.click(function(e){
			e.preventDefault();
			$menu.removeClass("active");

			$depth1.each(function(){
				if($(this).hasClass("active") == true){
					$(this).removeClass("active");
					$(this).find("ul").slideUp(300);
				}
			});
		});
		$depth1.click(function(e){
			e.preventDefault();

			if($(this).hasClass("active") == false){
				$depth1.removeClass("active");
				$(this).addClass("active");
				$("#nav ul ul").slideUp(300);
				$(this).find("ul").slideDown(300);
			}
			else{
				$(this).removeClass("active");
				$(this).find("ul").slideUp(300);
			}
		});
	}
}
