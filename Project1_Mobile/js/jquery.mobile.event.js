﻿(function($){
	$.fn.mobileDragEvent=function(options){
		options=$.extend({
			total: 10
		}, options);

		return this.each(function(){
			var $keyvisual=$(this); // 이벤트 대상입니다.
			var $total=$(options.total)[0]; // 갤러리의 개수를 지정할 변수입니다.
			var w; // 윈도우의 가로 크기를 지정하는 변수입니다.
			var h; // 윈도우의 세로 크기를 지정하는 변수입니다.
			var imgw; // 이미지의 가로 크기 변수입니다.
			var imgh; // 이미지의 세로 크기 변수입니다.
			var n=0; // 갤러리의 변수를 지정할 추가 변수입니다.
			var amount=0; // 갤러리의 메인 번호를 지정할 변수입니다.
			var moving=false; // 현재 움직이고 있는지 아닌지를 점검할 변수입니다. true이면 또 다른 이벤트 동작이 구현되지 않습니다.
			var xDown=null; // 모바일 드래그 이벤트의 가로 지정 변수입니다.
			var yDown=null; // 모바일 드래그 이벤트의 세로 지정 변수입니다.
			var direction=""; // 모바일 드래그 이벤트의 방향 지정 변수입니다.
			$(".controller li").eq(n).addClass("active"); // 추가되는 코드입니다.

			$(window).resize(function(){ // 초기의 윈도우의 가로 크기를 지정합니다.
				w=$(window).width();
				h=$(window).height();
				$(".gallery").css({width:w*$total});
				$(".gallery li").css({width:w, height:h});

				if(w > h){ // 모바일 가로 방향입니다.
					imgw=w;
					$(".gallery img").css({width:imgw, marginLeft:(-1)*imgw/2});
					imgh=$(".gallery img").height();
					console.log("imgw : "+imgw+", imgh : "+imgh);
				}
				else{ // 모바일 세로 방향입니다.
					imgh=h;
					$(".gallery img").css({height:imgh});
					imgw=$(".gallery img").width();
					$(".gallery img").css({marginLeft:(-1)*imgw/2});
					console.log("imgw : "+imgw+", imgh : "+imgh);
				}
			});
			$(window).trigger("resize");

			$(".left").click(function(e){ // 오른쪽으로 이동합니다.
				e.preventDefault();
				if(moving){
					return;
				}
				amount-=w;
				moving=true;

				if(n > 0){ // 추가되는 코드입니다.
					n--;
				}
				else{
					n=($total-1);
				}
				$(".controller li").removeClass("active");
				$(".controller li").eq(n).addClass("active");
				$(".keytext li").removeClass("active");
				$(".keytext li").eq(n).addClass("active");

				$(".gallery").css({left:amount});
				$(".gallery").prepend($(".gallery li").last());
				amount+=w;

				$(".gallery").animate({left:amount}, 500, function(){
					moving=false;
				});
			});
			$(".right").click(function(e){ // 왼쪽으로 이동합니다.
				e.preventDefault();
				if(moving){
					return;
				}
				amount-=w;
				moving=true;

				if(n < ($total-1)){ // 추가되는 코드입니다.
					n++;
				}
				else{
					n=0;
				}
				$(".controller li").removeClass("active");
				$(".controller li").eq(n).addClass("active");
				$(".keytext li").removeClass("active");
				$(".keytext li").eq(n).addClass("active");

				$(".gallery").animate({left:amount}, 500, function(){
					moving=false;
					amount+=w;
					$(this).css({left:amount});
					$(this).append($(".gallery li").first());
				});
			});
			$keyvisual.on("touchstart", function(e){
				var evt=e.originalEvent;
				clearInterval(id);
				xDown=evt.touches[0].clientX;
				yDown=evt.touches[0].clientY;
			});
			$(".keyvisual").on("touchend", function(e){
				id=setInterval(function(){
					$(".right").trigger("click");
				}, 6000);
			});
			$keyvisual.on("touchmove", function(e){
				if(moving){
					return;
				}
				var evt=e.originalEvent;
				swipe(evt);

				if(direction == "left"){
					$(".right").trigger("click");
				}
				else if(direction == "right"){
					$(".left").trigger("click");
				}
			});

			var id=setInterval(function(){
				$(".right").trigger("click");
			}, 6000);

			// swipe API
			function swipe(evt){
				if(!xDown || !yDown){
					return;
				}
				var xUp=evt.touches[0].clientX;
				var yUp=evt.touches[0].clientY;
				var xDiff=xDown-xUp;
				var yDiff=yDown-yUp;

				if(Math.abs(xDiff) > Math.abs(yDiff)){
					if(xDiff > 0){
						// left swipe
						direction="left";
					}else{
						// right swipe
						direction="right";
					}
				}else{
					if(yDiff > 0){
						// up swipe
					}else{
						// down swipe
					}
				}
				xDown=null;
				yDown=null;
			}
		});
	}
})(jQuery);