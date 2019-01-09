var check_device =  null;
var ie_check = null;

var app = (function() {
	function initModule() {
		// common
		checkDevice(); // mobile check
		ieCheck(); // ie8 down check
		mainEffect() // main
		if($(".project_path").length > 0){
			path_link();
		};
	}
	// Mobile,PC check
	function checkDevice() {
		var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson','iPad');
		for (var info in mobileInfo){
			if (navigator.userAgent.match(mobileInfo[info]) != null){
				check_device = "mobile";
				break;
			}else{
				check_device = null;
			}
		}
		$("body").addClass(check_device);
		return check_device;
	}
	// Browser ie8 check
	function ieCheck(){
		if((document.all && !document.querySelector) || (document.all && document.querySelector && !document.addEventListener) ) {
			ie_check = "ie8"
		}else{
			ie_check = null
		}
		$("body").addClass(ie_check);
		return ie_check;
	}


	// MAIN
	function mainEffect(){
		$(".list_project li").hover(function(){
			$(this).find("a").stop().animate({opacity:0.9},500);
		},function(){
			$(this).find("a").stop().animate({opacity:0},500);
		});

		// PATH 레이어펼침
		$(".list_project li .link").on("click",function(e){
			e.preventDefault();
			bgDim();
			var layer_pos = $(this).parents("li").index();
			$(".layer_view .inner_layer").eq(layer_pos).css({display:"block",opacity:0});
			$(".layer_view .inner_layer").eq(layer_pos).css({
				display:"none",
				opacity:1
			}).slideDown();
		});
		function bgDim(obj){
			if($("#bgDim .bg_black").height() == 0){
				$("#bgDim .bg_black").css({
					height: $(document).height()
				});
			};
			if(obj == "close") {
				$("#bgDim .bg_black").animate({opacity:0},{duration: 500,easing:'easeInOutExpo',complete:function(){$(this).css({display:"none"});}});
			}else{
				$("#bgDim .bg_black").css({display:"block",opacity:0}).animate({opacity:0.8},{duration: 200,easing:'easeInOutExpo'});
			};
		}
		// 레이어닫기
		$(".layer_close").click(function(e){
			$(this).parent().slideUp();
			bgDim("close")
		});
	}

	// Path
	var path_link = function(){
		$(".project_path .tbl tr").each(function(idx){
			if($(this).hasClass("fst")){
				var getUrl = 3;
				var pushUrl = 4;
			}else{
				var getUrl = 2;
				var pushUrl = 3;
			}
			var linkUrl = $(this).find("td").eq(getUrl).text();
			$(this).find("td").eq(pushUrl).html('<a href="'+linkUrl+'" class="btn" target="_blank">LINK</a>');
		});
	}

	return {
		init : initModule
	};
}());

$(document).ready(function() {
	app.init();
});