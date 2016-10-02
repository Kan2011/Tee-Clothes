/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*----- Top menu ------*/
if (topmenu) {
    $mega(document).ready(function () {
        if (isMobile != null && label_hassub.attr('href') != null) {
            label_hassub.removeAttr('href');
        }
        if (topmenu_effect == 3 || isMobile != null) {
            label.bind('click', function () {
                var $_this = $mega(this);
                if ($_this.hasClass('flag')) {
                    $_this.removeClass('flag');
                    $_this.parent().removeClass('active');
                    $_this.next().hide();
                } else {
                    label.removeClass('flag');
                    label.parent().removeClass('active');
                    label.next().hide();
                    $_this.addClass('flag');
                    $_this.parent().addClass('active');
                    $_this.next().slideDown(150);
                }
            });
        } else {
            ms_level0.bind('mouseenter', function () {
                var $_this = $mega(this);
                ms_level0.removeClass('active');
                ms_level0.children('.ms-submenu').hide();
                $_this.addClass('active');
                if (topmenu_effect == 2) {
                    $_this.children('.ms-submenu').stop().slideDown(150);
                } else {
                    $_this.children('.ms-submenu').stop().fadeIn(150);
                }
            });
            ms_level0.bind('mouseleave', function () {
                var $_this = $mega(this);
                $_this.removeClass('active');
                $_this.children('.ms-submenu').hide();
            });
        }
        //---> Set Width auto resize and Position auto
        var width_default = topmenu.outerWidth();
        var height_default = topmenu.outerHeight();
        for (var i = 0; i < label_hassub.length; i++) {
            var submenu = label_hassub[i].next();
            width_value = arr_width[i] * width_default / 100 + 'px';
            $mega(submenu).css({
                width: width_value,
                top: $mega(label_hassub[i]).parent().outerHeight() + $mega(label_hassub[i]).parent().position().top + 'px'
            });
        }
        sub_left.each(function () {
            $_this = $mega(this);
            if ($_this.hasClass('position_auto')) {
                var left_value = $_this.parent().position().left;
                if (($_this.outerWidth() + left_value) > width_default) {
                    left_value = width_default - $_this.outerWidth();
                }
                if (left_value < 0)
                    left_value = 0;
                $_this.css({
                    left: left_value + 'px'
                });
            } else {
                $_this.css({
                    left: 0
                });
            }
        });
        sub_right.each(function () {
            $_this = $mega(this);
            if ($_this.hasClass('position_auto')) {
                var right_value = width_default - $_this.parent().position().left - $_this.parent().outerWidth();
                if (($_this.outerWidth() + right_value) > width_default) {
                    right_value = width_default - $_this.outerWidth();
                }
                if (right_value < 0)
                    right_value = 0;
                $_this.css({
                    right: right_value + 'px'
                });
            } else {
                $_this.css({
                    right: 0
                });
            }
        });
        $mega(window).resize(function () {
            var width_resize = topmenu.outerWidth();
            if (width_resize > width_default)
                width_default = width_resize;
            for (var i = 0; i < label_hassub.length; i++) {
                var submenu = label_hassub[i].next();
                width_value = arr_width[i] * width_default / 100 + 'px';
                $mega(submenu).css({
                    width: width_value,
                    top: $mega(label_hassub[i]).parent().outerHeight() + $mega(label_hassub[i]).parent().position().top + 'px'
                });
            }
            sub_left.each(function () {
                $_this = $mega(this);
                if ($_this.hasClass('position_auto')) {
                    var left_value = $_this.parent().position().left;
                    if (($_this.outerWidth() + left_value) > width_resize) {
                        left_value = width_resize - $_this.outerWidth();
                    }
                    if (left_value < 0)
                        left_value = 0;
                    $_this.css({
                        left: left_value + 'px'
                    });
                }
            });
            sub_right.each(function () {
                $_that = $mega(this);
                if ($_this.hasClass('position_auto')) {
                    var right_value = width_resize - $_this.parent().position().left - $_this.parent().outerWidth();
                    if (($_this.outerWidth() + right_value) > width_resize) {
                        right_value = width_resize - $_this.outerWidth();
                    }
                    if (right_value < 0)
                        right_value = 0;
                    $_this.css({
                        right: right_value + 'px'
                    });
                }
            });
        });
        // Show/hide level 3 category
        if ($mega('.ms-topmenu .ms-category-level .parent')) {
            $mega('.ms-topmenu .ms-category-level .parent').bind('mouseenter', function () {
                var $_this = $mega(this);
                $_this.addClass('active');
            });
            $mega('.ms-topmenu .ms-category-level .parent').bind('mouseleave', function () {
                var $_this = $mega(this);
                $_this.removeClass('active');
            });

        }
        if ($mega('.ms-topmenu .ms-category-dynamic .col-level div.form-group')) {
            $mega('.ms-topmenu .ms-category-dynamic .col-level div.form-group').bind('mouseenter', function () {
                var $_this = $mega(this);
                var parent_id = $_this.attr('alt');
                var active_id = $_this.attr('href');
                $mega('.ms-topmenu #'+parent_id+' .ms-category-dynamic .col-level div.form-group').removeClass('active');
                $_this.addClass('active');
                $mega('.ms-topmenu #'+parent_id+' .ms-category-dynamic .col-dynamic').removeClass('active');
                $mega('.ms-topmenu #'+parent_id+' #' + active_id).addClass('active');
            });

        }
    });



}

/* ----- Moibile version ------*/
if (mbmenu) {
    anchor.bind('click', function () {
        var $_this = $mega(this);
        if ($_this.hasClass('flag')) {
            $_this.removeClass('flag');
            $_this.parent().removeClass('show-menu');
            mbmenu.slideUp(200);
        } else {
            $_this.addClass('flag');
            $_this.parent().addClass('show-menu');
            mbmenu.slideDown(200);
        }
    });
    if (mobile_effect == 1) {
        mclick.bind('click', function () {
            var $_this = $mega(this);
            if ($_this.hasClass('flag')) {
                $_this.removeClass('flag');
                $_this.children('span').removeClass('glyphicon-minus');
                $_this.next().slideUp(200);
            } else {
                mclick.removeClass('flag');
                mclick.children('span').removeClass('glyphicon-minus');
                mclick.next().slideUp(200);
                $_this.addClass('flag');
                $_this.children('span').addClass('glyphicon-minus');
                $_this.next().slideDown(200);
            }
        });
    } else {
        mclick.bind('click', function () {
            var $_this = $mega(this);
            mclick.parent().removeClass('active');
            $_this.parent().addClass('active');
            $_this.next().animate({
                left: 0
            }, 300);
        });
        mreturn.bind('click', function () {
            var $_this = $mega(this);

            mclick.next().animate({
                left: 100 + '%'
            }, 300, function () {
                mclick.parent().removeClass('active');
            });
        });
    }
    if ($mega('.mb-level-click')) {
        $mega('.mb-level-click').bind('click', function () {
            var $_this = $mega(this);
            if ($_this.hasClass('glyphicon-minus')) {
                $_this.removeClass('glyphicon-minus');
                $_this.parent().parent().removeClass('active');
            } else {
                $_this.addClass('glyphicon-minus');
                $_this.parent().parent().addClass('active');
            }

        });
    }
}

/*---- Change Mobile <---> TopMenu  ----- */
if (type_menu == 2) {
    $mega(document).ready(function () {
        var $_this = $mega(this);
        if ($_this.width() < width_change) {
            pc_megamenu.hide();
            mb_megamenu.show();
        } else {
            pc_megamenu.show();
            mb_megamenu.hide();
        }
    });
    $mega(window).resize(function () {
        var $_this = $mega(this);
        if ($_this.width() < width_change) {
            pc_megamenu.hide();
            mb_megamenu.show();
        } else {
            pc_megamenu.show();
            mb_megamenu.hide();
        }
        //resetAll();
    });
    function resetAll() {
        label.removeClass('flag');
        label.parent().removeClass('active');
        label.next().hide();
        mclick.removeClass('flag');
        mclick.children('span').removeClass('glyphicon-minus');
        mclick.next().hide();
        mclick.parent().removeClass('active');
        if (mobile_effect != 1) {
            mclick.next().css({
                left: 100 + '%'
            });
        }
    }
}
