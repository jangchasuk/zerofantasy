var maxWidth = $(window).width();
$(document).ready(function(){
	var mainBanner = $('.topVisual').bxSlider({
		auto: true,
		autoControls: true,
		autoControlsCombine: true
	});

   var totalWidthVisualTD = 0;
   $(".main_banner .bx-pager-item").each(function(index) {
		totalWidthVisualTD += parseInt($(this).width(), 10);
	});
   //$(".main_banner .bx-controls-auto").css("margin-left", -totalWidthVisualTD/2 - 12);
	if(LOGIN_YN =='Y'){
	   $('.offer_banner').attr("onClick","trackClicks('mShop_메인','^mShop_메인^020_중단^020_고객님께딱^010_로그인후')")
	}else{
	   $('.offer_banner').attr("onClick","trackClicks('mShop_메인','^mShop_메인^020_중단^020_고객님께딱^010_로그인전')")
	 }

	// 이지파인더
	var easyWidth = 0;
	var easyMin = 0;
	var easyMax = 0;
	if($(window).width() > 451){
		easyMin = 1;
		easyMax = Math.floor($(window).width() / 161);
		easyWidth = 161;
	}else{
		easyMin = 1;
		easyMax = 2;
		easyWidth = $(window).width()*0.503;
	}
    var easySlider = $('.easyFinder ul').bxSlider({
        infiniteLoop:false,
        controls: false,
        pager: false,
        maxSlides: 2,
        slideWidth: $(window).width() / 2,
        moveSlides : 2
    });
	/*if($(window).width() > 451){
		$('.easyFinder .bx-wrapper').css({'max-width':$(window).width()});
	}*/

	/*$(window).on('resize',function(){
		if($(window).width() > 451){
			easyMin = 1;
			easyMax = Math.floor($(window).width() / 161);
			easyWidth = 161;
		}else{
			easyMin = 1;
			easyMax = 2;
			easyWidth = $(window).width()*0.503;
		}
		easySlider.reloadSlider({
			infiniteLoop:false,
			controls: false,
			pager: false,
			minSlides:easyMin,
			maxSlides:easyMax,
			slideWidth: easyWidth
		});
		if($(window).width() > 451){
			$('.easyFinder .bx-wrapper').css({'max-width':$(window).width()});
		}
	});*/

	// 베스트 상품 & 최근본상품 =추천상품
	var mySliderType = new Array( $('.itemProduct').length );
	var $target;
	$('.itemProduct').each(function(index){
		// 페이징
		var $countPage ="<span class='blind'>페이징</span>";
		if($(this).find('ul').hasClass('listType2')){
			$target = $(this).find('.listType2'); // 타겟
			$pageLength = $(this).find('.listType2').children('li').length-1;
			for(var i=0;i<= $pageLength;i++){
				$countPage += '<a data-slide-index="'+i+'" href="#none">'+(i+1)+' 번 배너이미지</a>';
			};
		}else{
			$target = $(this).find('.listType'); // 타겟
			$pageLength = $(this).find('.listType').children('li').length;
			for(var i=0;i< Math.ceil($pageLength/2);i++){
				$countPage += '<a data-slide-index="'+i+'" href="#none">'+(i+1)+' 번 배너이미지</a>';
			};
		}
		$(this).find('.wrapPaging').html($countPage)
		$(this).find('.wrapPaging').addClass('page'+(index+1));
		$(this).find('.wrapPaging').find('a').first().addClass('active');

		if($(this).find('ul').hasClass('listType2')){
			mySliderType[index] = $target.bxSlider({
				infiniteLoop: true,
				controls: false,
				pagerCustom: '.page'+(index+1),
				captions: true
			});
		}else{
			mySliderType[index] = $target.bxSlider({
				infiniteLoop: true,
				controls: false,
				pagerCustom: '.page'+(index+1),
				slideWidth: $(window).width(),
				minSlides: 2,
				maxSlides: 2,
				captions: true
			});
		}

		// 이전 버튼 클릭시 이전 슬라이드 전환
		$(this).find('.btnPrev').on('click',function(){
			mySliderType[index].goToPrevSlide();
		});
		// 다음 버튼 클릭시 이전 슬라이드 전환
		$(this).find('.btnNext').on('click',function(){
			mySliderType[index].goToNextSlide();
		});

		$(document).on('pageshow', '#ktshopMain', function(){
			mySliderType[index].reloadSlider();
		});
	});

	$(document).on("swipeleft", ".dlSubWrap",function(){
		if(maxWidth <= $(this).width()){
			var mnMax = $(this).width() - $(window).width();
			if($(this).position().left >= -mnMax){
				$(this).animate({left: "-=100px"}, 200, function() {});
			}
		}
	});

	$(document).on("swiperight", ".dlSubWrap",function(){
		if(maxWidth <= $(this).width()){
			if($(this).position().left < 10){
				$(this).animate({left: "+=100px"}, 200, function() {});
			}
		}
	});

	$(document).on('pageshow', '#ktshopMain', function(){
		mainBanner.reloadSlider();
		easySlider.reloadSlider({
            infiniteLoop:false,
            controls: false,
            pager: false,
            maxSlides: 2,
            slideWidth: $(window).width() / 2,
            moveSlides : 2
		});
	});
});


/* 디바이스 회전시 width 값 reset */
$(window).on("orientationchange",function(e){
	var orientation = window.orientation;

	$(".mainPromotion li").css("width",$("body").width()+"px");
	$(".prod").each(function(){
		var prod = $(this).children("div").width(),
			page = $(this).find("li").length;

		$(this).find("ul").css("width",prod*page+"px");
		$(this).find("li").css("width",prod+"px");
	});
});

/* 터치 슬라이드 */
jQuery.fn.touchSlide = function(){
	var obj = this;
	var $imageLength = 0;
	this.touchMoveSW = true;
	var currentIndex = 0;

	$(this).bind("touchstart",function(e){
		var te = e.originalEvent.changedTouches[0];
		obj.startX = te.pageX;
		obj.startY = te.pageY;

		obj.targetX = $(this).children("ul").position().left;
		obj.touchMoveSW = false;

	}).bind("touchmove",function(e){
		var te = e.originalEvent.changedTouches[0];

		obj.endX = te.pageX;
		obj.endY = te.pageY;

		var distanceX = obj.endX-obj.startX;
		var distanceY = obj.endY-obj.startY;
		var	max = "-"+$(this).children("ul").width();
		var	move = obj.targetX+distanceX;

		if(distanceX != 0 || distanceY != 0)
			obj.touchMoveSW = true;

		if(Math.abs(distanceY) > Math.abs(distanceX)){return;}
		if(move < 0 && max < move-$(this).width()){
			$(this).children("ul").css({webkitTransform : "translate3d("+move+"px,0,0)",transition:"0ms","-webkit-transition":"0ms"});
		}

		e.preventDefault();

	}).bind("touchend",function(e){
		if(obj.touchMoveSW == true)
			e.preventDefault();

		var te = e.originalEvent.changedTouches[0];
		obj.endX = te.pageX;
		obj.endY = te.pageY;
		var distanceX = obj.endX-obj.startX;
		var direction = distanceX>0 ? "prev" : "next";
		$imageLength = $(this).find("li").length;

		if(Math.abs(distanceX)<50){
			$(this).children("ul").css({webkitTransform : "translate3d("+ -($(this).width()*currentIndex) +"px,0,0)",transition:"500ms","-webkit-transition":"500ms"});
			return;
		}
		if(direction == "next"){
			currentIndex++;
			if(currentIndex >= $imageLength){
				currentIndex = $imageLength-1;
			}
		}else{
			currentIndex--;
			if(currentIndex<0){
				currentIndex = 0;
			}
		}
		$(this).children("ul").css({webkitTransform : "translate3d("+ -($(this).width()*currentIndex) +"px,0,0)",transition:"500ms","-webkit-transition":"500ms"});

		$(this).next().children("span").removeClass("current");
		$(this).next().children("span").eq(currentIndex).addClass("current");
	});
};
var mShopGnb = function(){
	var mainGnb;
	var navWrap = $("#Depth1");
	$("#Depth1").load("test2.html #Temp", function(){
		mainGnb = $("#Depth1 #Temp").html();
		$("#Depth1 #STOR18, #Depth1 #STOR07").remove();
		var dep1 = new Array();
		var dep2 = new Array();
		var dep3 = new Array();

		$('#Temp > div > a').each(function(idx){
			dep1[idx] = '<a href='+$(this).attr('href')+'>'+$(this).text()+'</a>';
		});

		$('#Temp > div > div').each(function(idx){
			$(this).find('dl').each(function(idx){
				if($(this).find('dd').length > 0){
					$(this).find('dd').each(function(){
					});
				}else{
					$(this).find('dt').each(function(){
					});
				}
			});
		});


		$("#Depth1").html('<div class="navWrap"></div><div class="navWrap2"></div><div class="navWrap3"></div>');
		$("#Depth1 .navWrap").html(dep1);
		$("#Depth1 .navWrap2").html(dep2);
		$("#Depth1 .navWrap3").html(dep3);
		$("#Depth1 #Temp").remove();
	});

	//메인 gnb 메뉴코드 입력
	// var $gnbTarget = $('.navWrap');
	// menuTraclMobile($('.navWrap'),'_메인','_GNB');
};

$(document).on('click','div.bx-viewport a[href^="#easyDetails"]',function() {
	var eventId = $(this).attr('eventId');
	var offerDivCd = $(this).attr('offerDivCd');
	sendActionProc('exposure', eventId, offerDivCd);
});

$(document).on('click','section[id^="easyDetails"] .sendAction',function() {
	var eventId = $(this).parents('section').find('input[name=eventId]').val();
	var offerDivCd = $(this).parents('section').find('input[name=offerDivCd]').val();
	sendActionProc('response', eventId, offerDivCd);
});

$(document).on('click','section[id^="easyDetails"] div.footPopup a',function() {
	var eventId = $(this).parents('section').find('input[name=eventId]').val();
	var offerDivCd = $(this).parents('section').find('input[name=offerDivCd]').val();
	sendActionProc('reject', eventId, offerDivCd);
});

function sendActionProc(actionType, eventId, offerDivCd) {
	if(typeof eventId != "undefined" && eventId != '' && (offerDivCd == 'WR' || offerDivCd == 'WL')) {
		var action = {
			type : actionType
			,eventId : eventId
		};
		$.sendAction(action);
	}
}