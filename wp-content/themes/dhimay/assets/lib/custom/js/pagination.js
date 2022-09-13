jQuery(document).ready(function ($) {

    var ajaxurl = dhimay_pagination.ajax_url;

    function dhimay_is_on_screen(elem) {

        if ($(elem)[0]) {

            var tmtwindow = jQuery(window);
            var viewport_top = tmtwindow.scrollTop();
            var viewport_height = tmtwindow.height();
            var viewport_bottom = viewport_top + viewport_height;
            var tmtelem = jQuery(elem);
            var top = tmtelem.offset().top;
            var height = tmtelem.height();
            var bottom = top + height;
            return (top >= viewport_top && top < viewport_bottom) ||
                (bottom > viewport_top && bottom <= viewport_bottom) ||
                (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
        }
    }

    var n = window.TWP_JS || {};
    var paged = parseInt(dhimay_pagination.paged) + 1;
    var maxpage = dhimay_pagination.maxpage;
    var nextLink = dhimay_pagination.nextLink;
    var loadmore = dhimay_pagination.loadmore;
    var loading = dhimay_pagination.loading;
    var nomore = dhimay_pagination.nomore;
    var pagination_layout = dhimay_pagination.pagination_layout;

    function dhimay_load_content_ajax(){

        if ((!$('.theme-no-posts').hasClass('theme-no-posts'))) {

            $('.theme-loading-button .loading-text').text(loading);
            $('.theme-loading-status').addClass('theme-ajax-loading');
            $('.theme-loaded-content').load(nextLink + ' .article-panel-blocks', function () {
                if (paged < 10) {
                    var newlink = nextLink.substring(0, nextLink.length - 2);
                } else {

                    var newlink = nextLink.substring(0, nextLink.length - 3);
                }
                paged++;
                nextLink = newlink + paged + '/';
                if (paged > maxpage) {
                    $('.theme-loading-button').addClass('theme-no-posts');
                    $('.theme-loading-button .loading-text').text(nomore);
                } else {
                    $('.theme-loading-button .loading-text').text(loadmore);
                }

                $('.theme-loaded-content .theme-article-main').each(function(){
                    $(this).addClass(paged + '-twp-article-ajax after-ajax-load');
                    $(this).find('.video-main-wraper').removeClass('video-main-wraper').addClass('video-main-wraper-ajax');
                });

                var lodedContent = $('.theme-loaded-content').html();
                $('.theme-loaded-content').html('');

                if ($('.theme-panelarea').hasClass('theme-panelarea-blocks')) {

                    if ($('.theme-panelarea-blocks').length > 0) {

                        var content = $(lodedContent);
                        content.hide();
                        grid = $('.theme-panelarea-blocks');
                        grid.append(content);
                        grid.imagesLoaded(function () {
                            content.show();

                            var rtled = false;

                            if( $('body').hasClass('rtl') ){
                                rtled = true;
                            }

                            $( '.'+paged + '-twp-article-ajax ul.wp-block-gallery.columns-1, .'+paged + '-twp-article-ajax .wp-block-gallery.columns-1 .blocks-gallery-grid, .'+paged + '-twp-article-ajax .gallery-columns-1, .'+paged + '-twp-article-ajax twp-content-gallery .blocks-gallery-grid').each(function () {
                                
                                $(this).slick({
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    fade: true,
                                    autoplay: false,
                                    autoplaySpeed: 8000,
                                    infinite: true,
                                    nextArrow: '<button type="button" class="slide-btn slide-next-icon"></button>',
                                    prevArrow: '<button type="button" class="slide-btn slide-prev-icon"></button>',
                                    dots: false,
                                    rtl: rtled,
                                });
                                
                            });

                            var winwidth = $(window).width();
                            $(window).resize(function () {
                                winwidth = $(window).width();
                            });

                            if (winwidth > 990) {
                                grid.masonry('appended', content).masonry();
                            } else {
                                grid.masonry('appended', content);
                            }

                        });

                    }

                } else {

                    $('.content-area .theme-panelarea').append(lodedContent);

                }

                $('.theme-loading-status').removeClass('theme-ajax-loading');

                // Youtube Video Custom Controls Start
                var action = [];
                var iframe = document.getElementsByClassName("video-main-wraper-ajax");
                var src;

                Array.prototype.forEach.call(iframe, function(el) {
                    // Do stuff here
                    var id = el.getAttribute("data-id");
                    jQuery(document).ready(function ($) {
                        "use strict";
                        
                        src = $(el).find('iframe').attr('src');

                        if( src ){

                            if( src.indexOf('youtube.com') != -1 ){

                                $(el).find('iframe').attr('id',id);
                                $(el).find('iframe').addClass('twp-iframe-video-youtube-ajax');
                                $(el).find('iframe').attr('src',src+'&enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=0&autohide=0&showinfo=0&controls=0&loop=1');

                            }

                            if( src.indexOf('vimeo.com') != -1 ){

                                Dhimay_Vimeo();
                                $(el).find('iframe').attr('id',id);
                                $(el).find('iframe').addClass('twp-iframe-video-vimeo');
                                $(el).find('iframe').attr('src',src+'&title=0&byline=0&portrait=0&transparent=0&autoplay=1&controls=0&loop=1');
                                $(el).find('iframe').attr('allow','autoplay;');

                                var player = document.getElementById(id);

                                $(player).vimeo("setVolume", 0);

                                $('#'+id).closest('.entry-video').find('.twp-mute-unmute').on('click',function(){

                                    
                                    if( $(this).hasClass('unmute') ){

                                        $(player).vimeo("setVolume", 1);
                                        $(this).removeClass('unmute');
                                        $(this).addClass('mute');
                                        $(this).find('.twp-video-control-action').html(dhimay_custom.unmute);
                                        $(this).find('.screen-reader-text').html(dhimay_custom.unmute_text);

                                    }else if( $(this).hasClass('mute') ){

                                        $(player).vimeo("setVolume", 0);
                                        $(this).removeClass('mute');
                                        $(this).addClass('unmute');
                                        $(this).find('.twp-video-control-action').html(dhimay_custom.mute);
                                        $(this).find('.screen-reader-text').html(dhimay_custom.mute_text);

                                    }

                                });

                                $('#'+id).closest('.entry-video').find('.twp-pause-play').on('click',function(){

                                    if( $(this).hasClass('play') ){

                                        $(player).vimeo('play');
                                        $(this).removeClass('play');
                                        $(this).addClass('pause');
                                        $(this).find('.twp-video-control-action').html(dhimay_custom.pause);
                                        $(this).find('.screen-reader-text').html(dhimay_custom.pause_text);

                                    }else if( $(this).hasClass('pause') ){
                                        
                                        $(player).vimeo('pause');
                                        $(this).removeClass('pause');
                                        $(this).addClass('play');
                                        $(this).find('.twp-video-control-action').html(dhimay_custom.play);
                                        $(this).find('.screen-reader-text').html(dhimay_custom.play_text);

                                    }

                                });

                            }

                        }else{

                            var currentVideo;
                            $(el).find('video').attr('loop','loop');
                            $(el).find('video').attr('autoplay','autoplay');
                            $(el).find('video').removeAttr('controls');
                            $(el).find('video').attr('id',id);

                            $('#'+id).closest('.entry-video').find('.twp-mute-unmute').on('click',function(){

                                if( $(this).hasClass('unmute') ){

                                    currentVideo = document.getElementById(id);
                                    $(currentVideo).prop('muted', false);
                                    $(this).removeClass('unmute');
                                    $(this).addClass('mute');
                                    $(this).find('.twp-video-control-action').html(dhimay_custom.unmute);
                                    $(this).find('.screen-reader-text').html(dhimay_custom.unmute_text);

                                }else if( $(this).hasClass('mute') ){

                                    currentVideo = document.getElementById(id);
                                    $(currentVideo).prop('muted', true);
                                    $(this).removeClass('mute');
                                    $(this).addClass('unmute');
                                    $(this).find('.twp-video-control-action').html(dhimay_custom.mute);
                                    $(this).find('.screen-reader-text').html(dhimay_custom.mute_text);

                                }

                            });

                            setTimeout(function(){

                                currentVideo = document.getElementById(id);
                                currentVideo.play();

                            },2000);

                            $('#'+id).closest('.entry-video').find('.twp-pause-play').on('click',function(){

                                if( $(this).hasClass('play') ){

                                    currentVideo = document.getElementById(id);
                                    currentVideo.play();
                                    $(this).removeClass('play');
                                    $(this).addClass('pause');
                                    $(this).find('.twp-video-control-action').html(dhimay_custom.pause);
                                    $(this).find('.screen-reader-text').html(dhimay_custom.pause_text);

                                }else if( $(this).hasClass('pause') ){

                                    currentVideo = document.getElementById(id);
                                    currentVideo.pause();
                                    $(this).removeClass('pause');
                                    $(this).addClass('play');
                                    $(this).find('.twp-video-control-action').html(dhimay_custom.play);
                                    $(this).find('.screen-reader-text').html(dhimay_custom.play_text);

                                }

                            });
            
                        }

                    });

                });

                onYouTubePlayerAPIReady();
                // this function gets called when API is ready to use
                function onYouTubePlayerAPIReady() {

                    jQuery(document).ready(function ($) {
                        "use strict";

                        $('.twp-iframe-video-youtube-ajax').each(function(){


                            var id = $(this).attr('id');

                            // create the global action from the specific iframe (#video)
                            action[id] = new YT.Player(id, {
                                events: {
                                    // call this function when action is ready to use
                                    'onReady': function onReady() {

                                        $('#'+id).closest('.entry-video').find('.twp-pause-play').on('click',function(){

                                            var id = $(this).attr('attr-id');
                                            
                                            if( $(this).hasClass('play') ){

                                                action[id].playVideo();
                                                
                                                $(this).removeClass('play');
                                                $(this).addClass('pause');
                                                $(this).find('.twp-video-control-action').html(dhimay_custom.pause);
                                                $(this).find('.screen-reader-text').html(dhimay_custom.pause_text);

                                            }else if( $(this).hasClass('pause') ){

                                                action[id].pauseVideo();
                                                $(this).removeClass('pause');
                                                $(this).addClass('play');
                                                $(this).find('.twp-video-control-action').html(dhimay_custom.play);
                                                $(this).find('.screen-reader-text').html(dhimay_custom.play_text);

                                            }
                                            

                                        });

                                        $('#'+id).closest('.entry-video').find('.twp-mute-unmute').on('click',function(){

                                            var id = $(this).attr('attr-id');
                                            if( $(this).hasClass('unmute') ){

                                                action[id].unMute();
                                                
                                                $(this).removeClass('unmute');
                                                $(this).addClass('mute');
                                                $(this).find('.twp-video-control-action').html(dhimay_custom.unmute);
                                                $(this).find('.screen-reader-text').html(dhimay_custom.unmute_text);

                                            }else if( $(this).hasClass('mute') ){

                                                action[id].mute();
                                                $(this).removeClass('mute');
                                                $(this).addClass('unmute');
                                                $(this).find('.twp-video-control-action').html(dhimay_custom.mute);
                                                $(this).find('.screen-reader-text').html(dhimay_custom.mute_text);

                                            }
                                            

                                        });

                                    },
                                }
                            });

                        });

                    });
                }

                // Youtube Video Custom Controls End

                $('.theme-article-main').each(function(){

                    $(this).removeClass('slick-slider-active');
                    $(this).find('.video-main-wraper-ajax').removeClass('video-main-wraper-ajax');
                    $(this).find('.video-main-wraper-ajax').removeClass('video-main-wraper-ajax');
                    $(this).find('.twp-iframe-video-youtube-ajax').removeClass('twp-iframe-video-youtube-ajax');

                });

            });

        }
    }

    $('.theme-loading-button').click(function () {

        dhimay_load_content_ajax();
        
    });

    if (pagination_layout == 'auto-load') {
        $(window).scroll(function () {

            if (!$('.theme-loading-status').hasClass('theme-ajax-loading') && !$('.theme-loading-button').hasClass('theme-no-posts') && maxpage > 1 && dhimay_is_on_screen('.theme-loading-button')) {
                
                dhimay_load_content_ajax();
                
            }

        });
    }

    $(window).scroll(function () {

        if (!$('.twp-single-infinity').hasClass('twp-single-loading') && $('.twp-single-infinity').attr('loop-count') <= 3 && dhimay_is_on_screen('.twp-single-infinity')) {

            $('.twp-single-infinity').addClass('twp-single-loading');
            var loopcount = $('.twp-single-infinity').attr('loop-count');
            var postid = $('.twp-single-infinity').attr('next-post');

            var data = {
                'action': 'dhimay_single_infinity',
                '_wpnonce': dhimay_pagination.ajax_nonce,
                'postid': postid,
            };

            $.post(ajaxurl, data, function (response) {

                if (response) {
                    var content = response.data.content.join('');
                    var content = $(content);
                    $('.twp-single-infinity').before(content);
                    var newpostid = response.data.postid.join('');
                    $('.twp-single-infinity').attr('next-post', newpostid);

                    if ($('body').hasClass('booster-extension')) {
                        likedislike('after-load-ajax-'+postid);
                        booster_extension_post_reaction('after-load-ajax-'+postid);
                    }
                    
                    // Content Gallery Slide Start
                    $(".after-load-ajax-"+postid+" ul.wp-block-gallery.columns-1,.after-load-ajax-"+postid+"  .wp-block-gallery.columns-1 .blocks-gallery-grid, .after-load-ajax-"+postid+"  .gallery-columns-1,  .after-load-ajax-"+postid+"  .twp-content-gallery .blocks-gallery-grid").each(function () {
                        $(this).slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            autoplay: false,
                            autoplaySpeed: 8000,
                            infinite: true,
                            nextArrow: '<button type="button" class="slide-btn slide-next-icon"></button>',
                            prevArrow: '<button type="button" class="slide-btn slide-prev-icon"></button>',
                            dots: false,
                        });
                    });
                    // Content Gallery End

                    // Content Gallery popup Start
                    $('.after-load-ajax .entry-content .gallery, .widget .gallery, .after-load-ajax .wp-block-gallery, .after-load-ajax .zoom-gallery').each(function () {
                        
                        $(this).magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            closeOnContentClick: false,
                            closeBtnInside: false,
                            mainClass: 'mfp-with-zoom mfp-img-mobile',
                            image: {
                                verticalFit: true,
                                titleSrc: function (item) {
                                    return item.el.attr('title');
                                }
                            },
                            gallery: {
                                enabled: true
                            },
                            zoom: {
                                enabled: true,
                                duration: 300,
                                opener: function (element) {
                                    return element.find('img');
                                }
                            }
                        });

                    });

                    // Content Gallery popup End

                    $('article').each(function () {
                        $(this).removeClass('after-load-ajax');
                    });

                }

                $('.twp-single-infinity').removeClass('twp-single-loading');
                loopcount++;
                $('.twp-single-infinity').attr('loop-count', loopcount);

            });

        }

    });

});