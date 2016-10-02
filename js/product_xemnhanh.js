var curUrl = window.location.href;
function loadProduct(idsp,h2t,webhome,loaisp){
if (idsp) {
                $('#xn-loading').show();

                if (h2t == 2205) {
                    $('.loadding-ajax').css('top','0px').show();
                }else{
                    $('.loadding-ajax').show();
                }
                $('.pro-overlay').remove();
                // var mangid='';
                // if (loaisp=='new') {
                //     mangid = $('#mangid_new').val();
                // }else if (loaisp=='nb') {
                //     mangid = $('#mangid_nb').val();
                // }else if (loaisp=='az'){
                //     mangid = $('#mangid_az').val();
                // }
                // loaisp = '..';
                // $(this).parents('.loaddataxn').each(function(){
                //    loaisp += $(this).data('xn')+','; 
                // })
                 //alert(loaisp);
                getdt_load='';
                if (loaisp=='groupcolor') {
                    $('#g_'+idsp).parents('ul.colorProduct').find('.ligroup').each(function(){
                        getdt_load += $(this).attr('dataload')+'_';
                    });
                }else if(loaisp=='splq'){
                    $('#splq_'+idsp).parents('ul.splq').find('.li_splq').each(function(){
                        getdt_load += $(this).attr('dataload')+'_';
                    });
                }else{
                    $('#id_'+idsp).parents('.content_xemnhanh').find('.item_xemnhanh').each(function(){
                        getdt_load += $(this).attr('dataload')+'_';
                    });
                }
                //alert(getdt_load);
                
                var objdata={
                    'action':'huong',
                    'idw':$('.mangid').attr('www'),
                    'webhome':'',
                    'idsp':idsp,
                    'arr_id':getdt_load,
                    'loaisp':loaisp
                    };
                   
                $.ajax({
                      url:webhome+'/ajax&do=load_xemnhanh',
                      type:'POST',
                      data:objdata,
                      success: function(response) {
                            var getData = $.parseJSON(response);
                          //  alert(response);

                            $('#pro_xemnhanh').empty().append("<div class='pro-alert'><span class='pro-close' title='Đóng' style='cursor: pointer;position: absolute;top: -12px;right: -12px;'><img src='http://bncvn.net/themes/web/common/product_detail/images/cancel-circle.png' alt='Đóng xem nhanh'/></span>"
                                +getData.html
                                +"</div>");
                            
                            $('.pro-alert').css({
                                'position' : 'fixed',
                                'top' : $(window).height()/2-300,
                                'left' : $(window).width()/2-475
                            });
                            $('#pro_xemnhanh').show();
                            $('#img_01').elevateZoom({
                                gallery:'mycarousel',
                                cursor: 'pointer',
                                zoomWindowWidth:400,
                                zoomWindowOffetx: 50,
                                zoomWindowOffety: 0,
                                zoomWindowHeight:420,
                                galleryActiveClass: 'active'
                            });
                            $('#mycarousel').jcarousel({
                                visible:5,
                                animation:'snow',
                                start:2,
                                itemFallbackDimension: 300
                            });
                            
                            $('.showyahoo').live('mouseover',function(){
                                $('.popup-contact').hide();
                                $('.xn-contact i').removeClass('icon-active');
                                $(this).addClass('icon-active-y');
                                $('.popyahoo').show();
                                });
                            $('.showyahoo').live('mouseout',function(){
                                $('.popyahoo').hide();
                                $('.xn-contact i').removeClass('icon-active-y');
                            });

                            $('.showskype').live('mouseover',function(){
                                $('.popup-contact').hide();
                                $('.xn-contact i').removeClass('icon-active');
                                $('.xn-contact i').removeClass('icon-active-y');
                                $(this).addClass('icon-active');
                                 $('.popskype').show();
                                });
                            $('.showskype').live('mouseout',function(){
                                $('.popskype').hide();
                                $('.xn-contact i').removeClass('icon-active');
                                $('.xn-contact i').removeClass('icon-active-y');
                            });
                            $('.showmobile').live('mouseover',function(){
                                $('.popup-contact').hide();
                                $('.xn-contact i').removeClass('icon-active-y');
                                $('.xn-contact i').removeClass('icon-active');
                                $(this).addClass('icon-active');
                                $('.popmobile').show();
                                });
                            $('.showmobile').live('mouseout',function(){
                                $('.popmobile').hide();
                                $('.xn-contact i').removeClass('icon-active');
                                $('.xn-contact i').removeClass('icon-active-y');
                            });
                            $('.xn-close').click(function(){
                                $('.popup-contact').hide();
                                $('.xn-contact i').removeClass('icon-active');
                                $('.xn-contact i').removeClass('icon-active-y');
                                $('.popyahoo').hide();
                                });
                            //group mau
                            //$('.sizeProduct').data('flag', 0);

                            $('.sizeProduct li').click(function(){
                                $.data(document.body,'flag'+idsp, 1);
                                $('.sizeProduct li').removeClass('active');
                                $(this).addClass('active');

                                var str = '';
                                var num = $(this).find('._quantity').val();
                                if(num == 0){
                                    str = "<span class='priceChanfer'>Đã hết hàng</span>";
                                   // $('#_slhang').html(str);
                                    $('.buy').parent().hide();
                                }else{
                                    str = "<select name='quantity' id='slhang'>";
                                    for(i=1; i<=num; i++){
                                        str += "<option value='"+i+"'>"+i+"</option>";
                                    }
                                    str += "</select>";
                                    $('#_slhang').html(str);
                                    $('.buy').parent().show();
                                }
                                var giasp = $(this).find('._price').val();
                                var giakm = $(this).find('._discount').val();
                                var giatk = $(this).find('._save').val();
                                if (giakm=='') {
                                    $('#_giasp').show();
                                    $('#_giasp .c_giasp').html(giasp);
                                    $('#_giasp .c_giasp').removeClass('color-market').addClass('color-red');
                                    $('#_giasp ._vat').show();
                                    $('#_giakm').hide();
                                    $('#_giatk').hide();
                                }else{
                                    $('#_giakm').show();
                                    $('#_giakm .c_giakm').html(giakm);
                                    $('#_giakm .c_giakm').removeClass('color-market').addClass('color-red');
                                    $('#_giasp .c_giasp').html(giasp);
                                    $('#_giasp .c_giasp').removeClass('color-red').addClass('color-market');
                                    $('#_giasp ._vat').hide();
                                }

                                $('.timeOut').hide();
                                $('#'+$(this).attr('ref')).parent().show();
                            });
                            $('#slhang').live('change', function(){
                                if($('#checksize').val() == 'cosize'){
                                    $('body').append("<div class='cart-overlay'></div>");
                                    $('.cart-overlay').css({
                                        'background':'#222222',
                                        'border': '1px solid #F22000 !important',
                                        'opacity':'0.5',
                                        'width' : $(document).width(),
                                        'height' : $(document).height(),
                                        'z-index' : 9998,
                                        'position' : 'absolute',
                                        'top' : '0px',
                                        'left' : '0px'
                                    });
                                    $('body').append("<div class='cart-alert'><span class='close-alert' title='Đóng'></span><h3>Thông báo</h3><p>Bạn chưa chọn kích cỡ sản phẩm</p></div>");
                                    $('.cart-alert').css({
                                        'position' : 'fixed',
                                        'top' : $(window).height()/2-100,
                                        'left' : $(window).width()/2-150
                                    });
                                }
                            });
                            //end group mau

                    //Cuộn cho sản phẩm
                            $('#scroll-pro-poup').slimscroll({
                            height:'500px',
                            width:'475px',
                            railVisible: true,
                            railOpacity: 0.6,
                            wheelStep: 3,
                            });//kết thúc cuộn cho thông tin.
                            /*
                            $('#scroll-pro-splq').slimscroll({
                            height:'150px',
                            width:'460px',
                            railVisible: true,
                            railOpacity: 0.6,
                            wheelStep: 3,
                          });*/
                    //cuon thumb


                            //thumb
                            $("#mycarousel a").click(function(){
                                $(this).parent().addClass('selected').
                                siblings().removeClass('selected');
                            });

                            //pass the images to Fancybox
                            $('#img_01').bind('click', function(e) {
                                //$('.zoomLens').hide();
                                $('.zoomContainer').hide();
                          var ez =   $('#img_01').data('elevateZoom');
                          $('#pro_xemnhanh').hide();
                          $('.pro-overlay').hide();
                            $.attr('rel', 'gallery');
                            $.fancybox(
                                ez.getGalleryList(),
                                {
                                    nextMethod : 'resizeIn',
                                    nextSpeed  : 550,
                                    prevMethod : false,
                                    helpers : {
                                            title : {
                                                type : 'inside'
                                            },
                                            buttons : {},
                                            thumbs : {
                                                width  : 66,
                                                height : 66
                                            },
                                            overlay : {closeClick: false},
                                        },
                                    //Đóng fancy box và bật lại popup sản phẩm
                                    afterClose  : function() {
                                            $('.zoomContainer').show();
                                            $('#fancybox-thumbs').remove();
                                            $('#pro_xemnhanh').show();
                                            $('.pro-overlay').show();
                                            //alert('hon');
                                        }
                                }

                            );

                          return false;
                            });
                            $('.pro-close').live('click',function(){
                                $('body').removeClass('body_overflow');
                                //$('.zoomContainer').remove();
                                $('.pro-alert').remove();
                                $('.pro-overlay').remove();
                                $('.cart-overlay').remove();
                                $('.cart-alert').remove();
                                });

                        },
                    error:function(response){
                       // alert('Xin lỗi !');
                    }
                }).done(function(){
                   $('.loadding-ajax').hide();
                   $('.zoomContainer').remove();
                    $('#img_01').mouseout(function(){
                        $('.zoomContainer').css('display','none !important');
                    });
                });
            }//ket thuc if kiem tra ton tai idsp
            else{
                alert('Trường hợp ngoại lệ rồi HưởngNB ơi!');
            }
}//end function  loadProduct
 //tab san pham lien quan
function xn_addcart(idsp,buy,webhome){
    if (idsp) {
        var checkdb = $('#ck'+idsp).val();
        //alert(checkdb);
        var checksize = $('#checksize'+idsp).val();
        if (checkdb=='0') {
            $.data(document.body,'flag'+idsp,0);
            if (checksize == 'cosize') {
                $('.sizeProduct li').live('click',function(){
                    $('#checktemp'+idsp).val('dachonsize');
                });//ket thuc click li
                if ($('#checktemp'+idsp).val()!='dachonsize' ) {
                    $('body').append("<div class='cart-alert'><span class='close-alert' title='Đóng'></span><h3>Thông báo</h3><p>Bạn chưa chọn kích cỡ sản phẩm</p></div>");
                    $('.cart-alert').css({
                        'position' : 'fixed',
                        'top' : $(window).height()/2-100,
                        'left' : $(window).width()/2-150
                    });
                }
            }else{
                  $.data(document.body,'flag'+idsp,1);
            }


        }else{
                $.data(document.body,'flag'+idsp,1);
        }

        if ($('#checktemp'+idsp).val()=='dachonsize') {
            $.data(document.body,'flag'+idsp,1);
        }
        if ($.data(document.body,'flag'+idsp)==1) {

                    var gia = $('.c_giakm').html();
                    var dataorder = {
                        idsp: idsp,
                        sl: $('#slhang').val(),
                        color: $('#color').text(),
                        size: $(".sizeProduct li.active a").text(),
                        ship : 0,
                        gia: gia,
                        hinh:$('#hinh').val(),
                    }
                    $.post(webhome+"/ajax&do=order",dataorder ,function(data){
                        if (buy==156) {
                            window.location.href = webhome+"/san_pham/cart/1/gio_hang.html";
                        }else{
                            $('#cart_loader').html(data);
                            $('html, body').animate({ scrollTop: 0 }, 800);
                            $('body').append("<div class='cart-overlay'></div>");
                            $('.cart-overlay').css({
                                'background':'#222222',
                                'opacity':'0.3',
                                'width' : $(document).width(),
                                'height' : $(document).height(),
                                'z-index' : 9999,
                                'position' : 'absolute',
                                'top' : '0px',
                                'left' : '0px'
                            });
                            $('#cart_mini').show(400);
                            $('#xn-addtocart-'+idsp).removeAttr('onclick').attr('href','javascript:void(0)').css('background','#818181').html("<i class='xn-icon-cart'></i> Đã thêm vào giỏ");

                            $('.cart-remove').click(function(){
                                var getidsps = $(this).parent().find('span').attr('class');
                                //alert('vaoday'+getidsp);
                                if (getidsps) {
                                    var getidsp = getidsps.split('_');
                                    $('#xn-addtocart-'+getidsp[1]).removeAttr('style').attr('onclick','xn_addcart('+idsp+',157,webhome)').attr('href','javascript:void(0)').html('<i class="xn-icon-cart"></i>Thêm vào giỏ ');
                                }
                            });
                        }
                    });//ket thuc post

        }//ket thuc if kiem tra flag =1
    }//ekt thuc kiem tra if(idsp)
}//Ket thuc function xn_addtocart(idsp)

$('#sp_lq').live('click',function(){
    $('.tab_splq li').removeClass('tab_splq_active');
    $(this).addClass('tab_splq_active');
    $('.splq_list').hide();

    $('.sanphamlienquan').show();

});
$('#sp_cdm').live('click',function(){
    $('.tab_splq li').removeClass('tab_splq_active');
    $(this).addClass('tab_splq_active');
    $('.splq_list').hide();

    $('.sanphamcungdm').show();
});

//end tab
$('.pro-close').live('click',function(){
    $('#xn-loading').hide();
    $('#pro_xemnhanh').hide();
    $('.popup-contact').hide();
    $('.zoomContainer').remove();
    $.pjax({
      url: curUrl,
      container: '#huongcontent'
    });

});

/*--------------------------------------------------------*/
 function fastorder(idsp,idw,anhsp,webhome){
    var checksize = $('#cks'+idsp).attr('class');
    if (checksize == 'cosize') {
        var objdata={
                    'action':'cosize',
                    'webhome':webhome,
                    'idsp':idsp,
                    'idw':idw
                    };

                $.ajax({
                      url:webhome+'/ajax&do=load_xemnhanh',
                      type:'POST',
                      data:objdata,
                      success: function(response) {
                         var getData = $.parseJSON(response);
                         $('#xn-loading').show();
                        $('body').append("<div class='cart-alert'><span class='close-alert' title='Đóng'></span><h3>Thông báo</h3><p>"+getData.html_cosize+"</p></div>");
                        $('.cart-alert').css({
                            'position' : 'fixed',
                            'top' : $(window).height()/2-100,
                            'left' : $(window).width()/2-150
                        });
                      }
                    });
                $('#listSize-'+idsp+' li').live('click',function(){
                    var size   = $(this).find('a').text();
                    var giaban = $(this).find('._price').val();
                    var dis    = $(this).find('._discount').val();
                    if (dis!='') {
                        giaban = dis;
                    }
                    var dataorder2= {
                                        idsp: idsp,
                                        sl:1,
                                        color:'',
                                        size: size,
                                        ship : 0,
                                        gia: giaban,
                                        hinh: anhsp
                                    };
                    $("#in_cart").html(parseInt($("#in_cart").html()) + 1);
                    $.post(webhome+"/ajax&do=order",dataorder2 ,function(data){
                        $('#xn-loading').hide();
                        $('#'+idsp).addClass('dathemvaogio');
                        $('#cart_loader').html(data);
                        $('.cart-alert').remove();
                        $('html, body').animate({ scrollTop: 0 }, 800);
                        $('body').append("<div class='cart-overlay'></div>");
                        $('.cart-overlay').css({
                            'background':'#222222',
                            'opacity':'0.3',
                            'width' : $(document).width(),
                            'height' : $(document).height(),
                            'z-index' : 9999,
                            'position' : 'absolute',
                            'top' : '0px',
                            'left' : '0px'
                        });
                        $('#cart_mini').show(400);
                    });//end post
                });//end click #listSize
                $('.close-alert').live('click',function(){
                    $('#xn-loading').hide();
                });
                
    }else{
        var dataorder = {
            idsp: idsp,
            sl:1,
            color:'',
            size: 'M',
            ship : 0,
            gia: '21324',
            hinh: anhsp
        };
        //$("#in_cart").html(parseInt($("#in_cart").html()) + 1);
        $.post(webhome+"/ajax&do=order",dataorder ,function(data){
                    $('#cart_loader').html(data);
                    $('#xn-loading').hide();
                    $('#'+idsp).addClass('dathemvaogio');
                    $('html, body').animate({ scrollTop: 0 }, 800);
                    $('body').append("<div class='cart-overlay'></div>");
                    $('.cart-overlay').css({
                        'background':'#222222',
                        'opacity':'0.3',
                        'width' : $(document).width(),
                        'height' : $(document).height(),
                        'z-index' : 9999,
                        'position' : 'absolute',
                        'top' : '0px',
                        'left' : '0px'
                    });
                    $('#cart_mini').show(400);
                    $('.close-alert').live('click',function(){
                        $('#xn-loading').hide();
                    });
        });//end post
    }
}//end function fastorder


$('.cart-remove').live('click',function(){
    var getidsps = $(this).parent().find('span').attr('class');
    //alert('vaoday'+getidsps[1]);
    if (getidsps) {
        var getidsp = getidsps.split('_');
        $('#'+getidsp[1]).removeClass('dathemvaogio');

    }
});
