// JavaScript Document

$('#dangnhap').click(function(){
	 $('.dangnhap1').modal({
						opacity:80,
						overlayCss: {backgroundColor:"#000"},
						containerCss:{border:0,width:460,height:305},
						closeClass:"btnclose"
					});
						$('.modalCloseImg').hide();
	
	});

$(document).ready(function() {
		$(".topmenu li").hover(function() {
			$(this).find('ul:first').css({visibility: "visible", display: "none"}).show(500);
		},function() {	
				$(this).find('ul:first').css({visibility: "hidden"});
		});
	});
//showlist
			$('.showlist').hide();									
			$('.hidelist').click(function(){
				$('.content-list').hide('slow'); 
				$('.hidelist').hide();
				$('.showlist').show();
				return false;
				});
				
			$('.showlist').click(function(){
				$('.content-list').show('slow'); 
				$('.showlist').hide();
				$('.hidelist').show(); 
				return false;
				});
<!-- Tab sản phẩm trang chu -->
	$('#tab-01').find('li').click(function()
{
		$.each($('._tab-01'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-01').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
<!-- Tab tin tức trang chu -->
	$('#tab-02').find('li').click(function()
{
		$.each($('._tab-02'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-02').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
	
<!-- Tab video trang chu -->
	$('#tab-03').find('li').click(function()
{
		$.each($('._tab-03'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-03').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
	
	<!-- Tab album trang chu -->
	$('#tab-04').find('li').click(function()
{
		$.each($('._tab-04'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-04').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
	
		<!-- Tab lung tung trang chu -->
	$('#tab-05').find('li').click(function()
{
		$.each($('._tab-05'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-05').find('li'),function(){
					$(this).removeClass('acti2');
			});
			$(this).addClass('acti2');
			return false;
	});
		<!-- Tab thong tin chi tiet -->
	$('#tab-06').find('li').click(function()
{
		$.each($('._tab-06'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-06').find('li'),function(){
					$(this).removeClass('acti6');
			});
			$(this).addClass('acti6');
			return false;
	});
	<!-- End Tab js -->
	
	$('#tab-07').find('li').click(function()
{
		$.each($('._tab-07'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-07').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
	
	
			$('#tab-08').find('li').click(function()
{
		$.each($('._tab-08'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab-08').find('li'),function(){
					$(this).removeClass('acti');
			});
			$(this).addClass('acti');
			return false;
	});
	<!-- End Tab js -->
	
	<!--- -- San pham hover -- -->
	$('.bg_white').hover(function(){
		
		$(this).find('.bg_white_hover').slideToggle("slow");
		$(this).find('.bg_white_hover_text').slideToggle("slow");
		
		},function(){
			
				$(this).find('.bg_white_hover').slideToggle("slow");
					$(this).find('.bg_white_hover_text').slideToggle("slow");
			});
	
	<!--- -- san pham  hover -- -->
	<!--- -- tin tuc hover -- -->
	$('.bg_white_nb').hover(function(){
		$(this).find('.bg_white_nb_white').slideToggle("slow");
		},function(){
					$(this).find('.bg_white_nb_white').slideToggle("slow");
			});
	
	<!--- -- tintuc hover -- -->
	<!--- -- menutop -- -->
		<!-- Tab js -->
	$('#menu').find('li').click(function()
	{
				$.each($('#menu').find('li'),function(){
						$(this).removeClass('activeMNT');
				});
				$(this).addClass('activeMNT');
		});
	
	
	<!--- End menutop -->
		<!--product_list_item -->
	$('#list_product').find('li').click(function()
	{
				$.each($('#list_product').find('li'),function(){
						$(this).removeClass('active_list_tem');
				});
				$(this).addClass('active_list_tem');
		});
	
	
	<!--tao binh chon->
	
		$('.ykien').click(function () {
			
			$("#table_binhchon_02").append($('#row_themykien').html());
			//var i=1;
			var i=  $('#div_ykien_poll p').size()+1;
			$.each($("#table_binhchon_02").find('.tieude_01'),function(){
				i++;
				$(this).html('Ý kiến '+i + ' :');				
				
				});
				$('.xoa_yk').unbind('click');
			$('.xoa_yk').click(function(){				
		$(this).parent().parent().parent().remove();
		var i=1;
		
			$.each($("#table_binhchon_02").find('.tieude_01'),function(){
				i++;
				$(this).html('Ý kiến '+i + ' :');				
				
				});
		return false;
			});
		});
<!--End tao binh chon->
<!-- Video  hover -->
$('.box_video').hover(function (){
	
	$(this).find('.box_video_hover').show();
		$(this).find('.box_video_play').show();
	
	},function(){
		
		$(this).find('.box_video_hover').hide();
		$(this).find('.box_video_play').hide();
		
		});
		
<!-- Video  hover -->
$('.box_video_tk').hover(function (){
	
	$(this).find('.box_video_hover').show();
		$(this).find('.box_video_play').show();
	
	},function(){
		
		$(this).find('.box_video_hover').hide();
		$(this).find('.box_video_play').hide();
		
		});
		
<!-- menu -->
<!-- Video  hover trang chu video mac dinh -->
$('.bg_white_md').hover(function (){
	
	$(this).find('.box_video_hover_md').show();
		$(this).find('.box_video_play_md').show();
	
	},function(){
		
		$(this).find('.box_video_hover_md').hide();
		$(this).find('.box_video_play_md').hide();
		
		});
		
		
<!-- menu -->
<!-- Video  hover trang chủ sieu se dinh -->
$('.bg_white_video_md').hover(function (){
	$(this).find('.box_video_hover_video_md').show();
	},function(){
		$(this).find('.box_video_hover_video_md').hide();
		
		});
		
		
<!-- menu -->
<!-- Video  hover trang video -->
$('.bg_video').hover(function (){
	
	$(this).find('.box_video_hover_video').show();
		$(this).find('.box_video_play_video').show();
	
	},function(){
		
		$(this).find('.box_video_hover_video').hide();
		$(this).find('.box_video_play_video').hide();
		
		});
		
		
<!-- menu -->
<!-- Video  hover trang video _tag -->
$('.bg_video_tag').hover(function (){
	
	$(this).find('.box_video_hover_video').show();
		$(this).find('.box_video_play_video').show();
	
	},function(){
		
		$(this).find('.box_video_hover_video').hide();
		$(this).find('.box_video_play_video').hide();
		
		});
		
		
<!-- menu -->
<!-- Video  hover trang tim kiem video-->
$('.bg_video_tk').hover(function (){
	
	$(this).find('.box_video_hover_video').show();
		$(this).find('.box_video_play_video').show();
	
	},function(){
		
		$(this).find('.box_video_hover_video').hide();
		$(this).find('.box_video_play_video').hide();
		
		});
		
		
<!-- menu -->
<!-- active list_item_color -->
	$('.list_item_content').find('li').click(function()
	{
				$.each($('.list_item_content').find('li'),function(){
						$(this).removeClass('active_block_corlor');
				});
				$(this).addClass('active_block_corlor');
		});
	
	
<!--- End active list_item_color -->
// set hover and open detail 
		$('.hoi-dap-box-row').hover(function(){
											 $(this).find('.hoi-dap-box-center-row-cm-body-nx-nx2').show();
											 $(this).find('.hoi-dap-box-center-row-bar-ctrol').show();
											 var tem1= $(this).find('.hoi-dap-box-center-row-cm-body-nx1');
											 var tem= $(this).find('.hoi-dap-box-center-row-cm-body-nx1-view-more');											
											 $(this).find('.hoi-dap-box-center-row-cm-body-nx1-more').click(function(){tem1.hide();tem.show('slow');});
											  $(this).find('.hoi-dap-box-center-row-cm-body-nx1-less').click(function(){tem.hide();tem1.show('slow');})
											 },function(){																										 											 $(this).find('.hoi-dap-box-center-row-cm-body-nx-nx2').hide('slow');
 											 $(this).find('.hoi-dap-box-center-row-bar-ctrol').hide('slow');										 
											 
											 });
		
		var artit= Array(['icon14','Yahoo'],['icon15','Skype'],['icon16','Tin nhắn'],['icon17','Hiện'],['icon17b','Ẩn'],['icon18','Làm mới'],['icon19','Sửa'],['icon20','Xóa'],['icon21','Lượt xem'],['icon24','Trả lời'],['icon25','không thích'],['icon26','Thích'],['icon27','Chia sẻ zing me'],['icon28','Chia sẻ Facebook'],['icon29','Theo dõi'],['icon30','Báo xấu']);
		for(var i=0;i<artit.length;i++)	
		{
			$('.'+artit[i][0]).attr('title',artit[i][1]);
		
	
		}
//tuyen dung javascript
$('.box_binh_luan_item').hover(function(){
											
											var tem1= $(this).find('.box_binh_luan_item_nx1');
											 var tem= $(this).find('.box_binh_luan_item_view_more');											
											 $(this).find('.box_binh_luan_item_nx1_more').click(function(){tem1.hide();tem.show('slow');});
											 $(this).find('.box_binh_luan_item_nx1_less').click(function(){tem.hide();tem1.show('slow');})
																				 
											 
											 });


//xem cac cau tra loi
/*$('.traloi_txt').click(function(){
	
	$(this).parent().parent().parent().parent().find('.div_textarea').toggle('slow');

});
$('.so_cau_traloi').click(function(){
	$(this).parent().parent().parent().parent().find('.xem_cac_binhluan').toggle('slow');
	
	
});*/
//menu lEFT
//binh luan********************************************
$('.box_binh_luan_item').hover(function(){
											
											var tem1= $(this).find('.box_binh_luan_item_nx1');
											 var tem= $(this).find('.box_binh_luan_item_view_more');											
											 $(this).find('.box_binh_luan_item_nx1_more').click(function(){tem1.hide();tem.show('slow');});
											 $(this).find('.box_binh_luan_item_nx1_less').click(function(){tem.hide();tem1.show('slow');})
																				 
											 
											 });
//tab binh luan*****************************************
$('#tab_binhluan_item').find('li').click(function()
{
		$.each($('.content_tab_binhluan'),function(){$(this).css('display','none')});//an toan bo tab_content
		$('.'+$(this).attr('id')).css('display','block');
			$.each($('#tab_binhluan_item').find('li'),function(){
					$(this).removeClass('active_tab_bl');
			});
			$(this).addClass('active_tab_bl');
	});										 
			

////////////////////Tum lum*****************************************		
$(function() {
    
    $('.tip').tipsy({gravity: $.fn.tipsy.autoNS});
    
  });
	// Drop menu
	$(function(){
    $("ul.dropdown li").hover(function(){
    
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    
    }, function(){
    
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    
    });
    
	$("ul.dropdown li:has(ul)").find("a:first").append("<span>&rsaquo;</span>");
    $("ul.dropdown li ul li:has(ul)").find("a:first").append("<span>&rsaquo;</span>");

});
    $(window).load(function() {
		// go top
		$('.gotop').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		

});


					$(function() {
					 $(".jcarou2").jCarouselLite({
					circular: true,
					hoverPause:true,
					visible: 1,
					auto:1000,
					speed:2000,
					btnNext:'.nut_top_01',
					btnPrev:'.nut_bottom_02'
					});
					});
//Đối tác ngang//	

               
<!-- ALbum hover trang chu video mac dinh -->
$('.hinh_album').hover(function (){
	
	$(this).find('.album_hover_md').show();
		$(this).find('.album_play_md').show();
	
	},function(){
		
		$(this).find('.album_hover_md').hide();
		$(this).find('.album_play_md').hide();
		
		});