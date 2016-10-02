/*
var $ = jQuery.noConflict();
$(document).ready(function() {
	//Tooltool_tipss
	$(".tool_tips_trigger").live('mouseover',function(){
	     tool_tips = $(this).parent().parent().find('.tool_tips');
		tool_tips.show(); //Hiển thị tooltool_tips
	}).live('mouseout',function() {
		tool_tips.hide(); //Ẩn tooltool_tips		  
	});
	$(".tool_tips_trigger").live('mousemove',function(e) {
		var mousex = e.pageX + 20; //Lấy tọa độ x
		var mousey = e.pageY + 10; //Lấy tọa độ y
		var tool_tipsWidth = tool_tips.width(); //Tìm độ rộng của tooltip
		var tool_tipsHeight = tool_tips.height(); //Tìm độ cao của tooltip
		
		//Khoảng cách của phần tử từ cạnh phải của màn hình
		var tool_tipsVisX = $(window).width() - (mousex + tool_tipsWidth);
		//Khoảng cách của phần tử từ cạnh dưới của màn hình
		// var tool_tipsVisY = $(window).height() - (mousey + tool_tipsHeight);
		var tool_tipsVisY=(mousey+tool_tipsHeight>$(document).scrollTop()+$(window).height()-15)? $(document).scrollTop()+$(window).height()-tool_tipsHeight-30 : mousey;
		mousey = tool_tipsVisY;
		  
		if ( tool_tipsVisX < 180 ) { //If tooltool_tips exceeds the X coordinate of viewport
			mousex = e.pageX - tool_tipsWidth - 40;
		} 
		// if ( tool_tipsVisY < 0 ) { //If tooltool_tips exceeds the Y coordinate of viewport
		//	mousey = e.pageY - tool_tipsHeight;
		//}
		
		tool_tips.css({  top: mousey -30, left: mousex });
	});
});

*/
(function($){

	$(document).ready(function(){

		$(function() {
    	$('.bnc_tooltips').each(function() {
        var tip = $(this).find('.tool_tips');

        $(this).hover(
            function() {
            tip.show();
             tip.appendTo('body');
        },
        function() { tip.appendTo(this).hide(); }
        ).mousemove(function(e) {
            var x = e.pageX + 60,
                y = e.pageY - 40,
                w = tip.width(),
                h = tip.height(),
                dx = $(window).width() - (x + w),
                sroll = $(document).scrollTop();
                wHeight = $(window).height();
			if((y+h) > (sroll+wHeight-15)){	var dy = $(document).scrollTop()+$(window).height()-h-100;}else{var dy = y;}
			y= dy;
            if ( dx < 50 ) x = e.pageX - w - 60;
            tip.css({ left: x, top: y });
        });
    });

});


		});

})(window.jQuery);


