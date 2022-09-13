// Vimeo Vieo Function
Dhimay_Vimeo();
function Dhimay_Vimeo() {
  /*! vimeo-jquery-api 2016-05-05 */
  !(function (a, b) {
    var c = {
        catchMethods: { methodreturn: [], count: 0 },
        init: function (b) {
          var c, d, e;
          b.originalEvent.origin.match(/vimeo/gi) &&
            "data" in b.originalEvent &&
            ((e =
              "string" === a.type(b.originalEvent.data)
                ? a.parseJSON(b.originalEvent.data)
                : b.originalEvent.data),
            e &&
              ((c = this.setPlayerID(e)),
              c.length &&
                ((d = this.setVimeoAPIurl(c)),
                e.hasOwnProperty("event") && this.handleEvent(e, c, d),
                e.hasOwnProperty("method") && this.handleMethod(e, c, d))));
        },
        setPlayerID: function (b) {
          return a("iframe[src*=" + b.player_id + "]");
        },
        setVimeoAPIurl: function (a) {
          return "http" !== a.attr("src").substr(0, 4)
            ? "https:" + a.attr("src").split("?")[0]
            : a.attr("src").split("?")[0];
        },
        handleMethod: function (a) {
          this.catchMethods.methodreturn.push(a.value);
        },
        handleEvent: function (b, c, d) {
          switch (b.event.toLowerCase()) {
            case "ready":
              for (var e in a._data(c[0], "events"))
                e.match(
                  /loadProgress|playProgress|play|pause|finish|seek|cuechange/
                ) &&
                  c[0].contentWindow.postMessage(
                    JSON.stringify({ method: "addEventListener", value: e }),
                    d
                  );
              if (c.data("vimeoAPICall")) {
                for (var f = c.data("vimeoAPICall"), g = 0; g < f.length; g++)
                  c[0].contentWindow.postMessage(
                    JSON.stringify(f[g].message),
                    f[g].api
                  );
                c.removeData("vimeoAPICall");
              }
              c.data("vimeoReady", !0), c.triggerHandler("ready");
              break;
            case "seek":
              c.triggerHandler("seek", [b.data]);
              break;
            case "loadprogress":
              c.triggerHandler("loadProgress", [b.data]);
              break;
            case "playprogress":
              c.triggerHandler("playProgress", [b.data]);
              break;
            case "pause":
              c.triggerHandler("pause");
              break;
            case "finish":
              c.triggerHandler("finish");
              break;
            case "play":
              c.triggerHandler("play");
              break;
            case "cuechange":
              c.triggerHandler("cuechange");
          }
        },
      },
      d = (a.fn.vimeoLoad = function () {
        var b = a(this).attr("src"),
          c = !1;
        if (
          ("https:" !== b.substr(0, 6) &&
            ((b =
              "http" === b.substr(0, 4) ? "https" + b.substr(4) : "https:" + b),
            (c = !0)),
          null === b.match(/player_id/g))
        ) {
          c = !0;
          var d = -1 === b.indexOf("?") ? "?" : "&",
            e = a.param({
              api: 1,
              player_id:
                "vvvvimeoVideo-" +
                Math.floor(1e7 * Math.random() + 1).toString(),
            });
          b = b + d + e;
        }
        return c && a(this).attr("src", b), this;
      });
    jQuery(document).ready(function () {
      a("iframe[src*='vimeo.com']").each(function () {
        d.call(this);
      });
    }),
      a([
        "loadProgress",
        "playProgress",
        "play",
        "pause",
        "finish",
        "seek",
        "cuechange",
      ]).each(function (b, d) {
        jQuery.event.special[d] = {
          setup: function () {
            var b = a(this).attr("src");
            if (a(this).is("iframe") && b.match(/vimeo/gi)) {
              var e = a(this);
              if ("undefined" != typeof e.data("vimeoReady"))
                e[0].contentWindow.postMessage(
                  JSON.stringify({ method: "addEventListener", value: d }),
                  c.setVimeoAPIurl(a(this))
                );
              else {
                var f =
                  "undefined" != typeof e.data("vimeoAPICall")
                    ? e.data("vimeoAPICall")
                    : [];
                f.push({ message: d, api: c.setVimeoAPIurl(e) }),
                  e.data("vimeoAPICall", f);
              }
            }
          },
        };
      }),
      a(b).on("message", function (a) {
        c.init(a);
      }),
      (a.vimeo = function (a, d, e) {
        var f = {},
          g = c.catchMethods.methodreturn.length;
        if (
          ("string" == typeof d && (f.method = d),
          void 0 !== typeof e && "function" != typeof e && (f.value = e),
          a.is("iframe") && f.hasOwnProperty("method"))
        )
          if (a.data("vimeoReady"))
            a[0].contentWindow.postMessage(
              JSON.stringify(f),
              c.setVimeoAPIurl(a)
            );
          else {
            var h = a.data("vimeoAPICall") ? a.data("vimeoAPICall") : [];
            h.push({ message: f, api: c.setVimeoAPIurl(a) }),
              a.data("vimeoAPICall", h);
          }
        return (
          ("get" !== d.toString().substr(0, 3) && "paused" !== d.toString()) ||
            "function" != typeof e ||
            (!(function (a, d, e) {
              var f = b.setInterval(function () {
                c.catchMethods.methodreturn.length != a &&
                  (b.clearInterval(f), d(c.catchMethods.methodreturn[e]));
              }, 10);
            })(g, e, c.catchMethods.count),
            c.catchMethods.count++),
          a
        );
      }),
      (a.fn.vimeo = function (b, c) {
        return a.vimeo(this, b, c);
      });
  })(jQuery, window);
}

// global variable for the action
var action = [];
var iframe = document.getElementsByClassName("video-main-wraper");
var src;
var ratio_class;

Array.prototype.forEach.call(iframe, function (el) {
  // Do stuff here
  var id = el.getAttribute("data-id");
  jQuery(document).ready(function ($) {
    "use strict";

    src = $(el).find("iframe").attr("src");
    if (src) {
      if (src.indexOf("youtube.com") != -1) {
        $(el).find("iframe").attr("width", "");
        $(el).find("iframe").attr("height", "");
        $(el).find("iframe").attr("id", id);
        $(el).find("iframe").addClass("twp-iframe-video-youtube");
        $(el)
          .find("iframe")
          .attr(
            "src",
            src +
              "&enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=0&autohide=0&showinfo=0&controls=0&loop=1"
          );
      }

      if (src.indexOf("vimeo.com") != -1) {
        $(el).find("iframe").attr("id", id);
        $(el).find("iframe").addClass("twp-iframe-video-vimeo");
        $(el)
          .find("iframe")
          .attr(
            "src",
            src +
              "&title=0&byline=0&portrait=0&transparent=0&autoplay=1&controls=0&loop=1"
          );
        $(el).find("iframe").attr("allow", "autoplay;");

        var player = document.getElementById(id);
        $(player).vimeo("setVolume", 0);

        $("#" + id)
          .closest(".entry-video")
          .find(".twp-mute-unmute")
          .on("click", function () {
            if ($(this).hasClass("unmute")) {
              $(player).vimeo("setVolume", 1);
              $(this).removeClass("unmute");
              $(this).addClass("mute");

              $(this).find(".twp-video-control-action").empty();
              $(this)
                .find(".twp-video-control-action")
                .html(dhimay_custom.unmute);
              $(this)
                .find(".screen-reader-text")
                .html(dhimay_custom.unmute_text);
            } else if ($(this).hasClass("mute")) {
              $(player).vimeo("setVolume", 0);
              $(this).removeClass("mute");
              $(this).addClass("unmute");
              $(this).find(".twp-video-control-action").empty();
              $(this)
                .find(".twp-video-control-action")
                .html(dhimay_custom.mute);
            }
          });

        $("#" + id)
          .closest(".entry-video")
          .find(".twp-pause-play")
          .on("click", function () {
            if ($(this).hasClass("play")) {
              $(player).vimeo("play");

              $(this).removeClass("play");
              $(this).addClass("pause");
              $(this)
                .find(".twp-video-control-action")
                .html(dhimay_custom.pause);
              $(this)
                .find(".screen-reader-text")
                .html(dhimay_custom.pause_text);
            } else if ($(this).hasClass("pause")) {
              $(player).vimeo("pause");
              $(this).removeClass("pause");
              $(this).addClass("play");
              $(this)
                .find(".twp-video-control-action")
                .html(dhimay_custom.play);
              $(this).find(".screen-reader-text").html(dhimay_custom.play_text);
            }
          });
      }
    } else {
      var currentVideo;

      $(el).find("video").attr("loop", "loop");
      $(el).find("video").attr("autoplay", "autoplay");
      $(el).find("video").removeAttr("controls");
      $(el).find("video").attr("id", id);

      $("#" + id)
        .closest(".entry-video")
        .find(".twp-mute-unmute")
        .on("click", function () {
          if ($(this).hasClass("unmute")) {
            currentVideo = document.getElementById(id);
            $(currentVideo).prop("muted", false);

            $(this).removeClass("unmute");
            $(this).addClass("mute");
            $(this)
              .find(".twp-video-control-action")
              .html(dhimay_custom.unmute);
            $(this).find(".screen-reader-text").html(dhimay_custom.unmute_text);
          } else if ($(this).hasClass("mute")) {
            currentVideo = document.getElementById(id);
            $(currentVideo).prop("muted", true);
            $(this).removeClass("mute");
            $(this).addClass("unmute");
            $(this).find(".twp-video-control-action").html(dhimay_custom.mute);
          }
        });

      setTimeout(function () {
        if ($("#" + id).length) {
          currentVideo = document.getElementById(id);
          currentVideo.play();
        }
      }, 3000);

      $("#" + id)
        .closest(".entry-video")
        .find(".twp-pause-play")
        .on("click", function () {
          if ($(this).hasClass("play")) {
            currentVideo = document.getElementById(id);
            currentVideo.play();

            $(this).removeClass("play");
            $(this).addClass("pause");
            $(this).find(".twp-video-control-action").html(dhimay_custom.pause);
            $(this).find(".screen-reader-text").html(dhimay_custom.pause_text);
          } else if ($(this).hasClass("pause")) {
            currentVideo = document.getElementById(id);
            currentVideo.pause();

            $(this).removeClass("pause");
            $(this).addClass("play");
            $(this).find(".twp-video-control-action").html(dhimay_custom.play);
            $(this).find(".screen-reader-text").html(dhimay_custom.play_text);
          }
        });
    }
  });
});

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  jQuery(document).ready(function ($) {
    "use strict";

    $(".twp-iframe-video-youtube").each(function () {
      var id = $(this).attr("id");

      // create the global action from the specific iframe (#video)
      action[id] = new YT.Player(id, {
        events: {
          // call this function when action is ready to use
          onReady: function onReady() {
            action[id].playVideo();

            $("#" + id)
              .closest(".entry-video")
              .find(".twp-pause-play")
              .on("click", function () {
                var id = $(this).attr("attr-id");

                if ($(this).hasClass("play")) {
                  action[id].playVideo();

                  $(this).removeClass("play");
                  $(this).addClass("pause");
                  $(this)
                    .find(".twp-video-control-action")
                    .html(dhimay_custom.pause);
                  $(this)
                    .find(".screen-reader-text")
                    .html(dhimay_custom.pause_text);
                } else if ($(this).hasClass("pause")) {
                  action[id].pauseVideo();
                  $(this).removeClass("pause");
                  $(this).addClass("play");
                  $(this)
                    .find(".twp-video-control-action")
                    .html(dhimay_custom.play);
                  $(this)
                    .find(".screen-reader-text")
                    .html(dhimay_custom.play_text);
                }
              });

            $("#" + id)
              .closest(".entry-video")
              .find(".twp-mute-unmute")
              .on("click", function () {
                var id = $(this).attr("attr-id");
                if ($(this).hasClass("unmute")) {
                  action[id].unMute();

                  $(this).removeClass("unmute");
                  $(this).addClass("mute");
                  $(this)
                    .find(".twp-video-control-action")
                    .html(dhimay_custom.unmute);
                  $(this)
                    .find(".screen-reader-text")
                    .html(dhimay_custom.unmute_text);
                } else if ($(this).hasClass("mute")) {
                  action[id].mute();
                  $(this).removeClass("mute");
                  $(this).addClass("unmute");
                  $(this)
                    .find(".twp-video-control-action")
                    .html(dhimay_custom.mute);
                  $(this)
                    .find(".screen-reader-text")
                    .html(dhimay_custom.mute_text);
                }
              });
          },
        },
      });
    });
  });
}

// Inject YouTube API script
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function Dhimay_SetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Dhimay_GetCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

jQuery(document).ready(function ($) {
  "use strict";

  $(window).load(function () {
    $("body").addClass("page-loaded");
  });

  // Scroll To
  $(".scroll-content").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#content").offset().top,
      },
      500
    );
  });

  // Hide Comments
  $(
    ".dhimay-no-comment .booster-block.booster-ratings-block, .dhimay-no-comment .comment-form-ratings, .dhimay-no-comment .twp-star-rating"
  ).hide();

  // Rating disable
  if (dhimay_custom.single_post == 1 && dhimay_custom.dhimay_ed_post_reaction) {
    $(".tpk-single-rating").remove();
    $(".tpk-comment-rating-label").remove();
    $(".comments-rating").remove();
    $(".tpk-star-rating").remove();
  }

  // Add Class on article
  $(".theme-article.post").each(function () {
    $(this).addClass("twp-article-loded");
  });

  // Aub Menu Toggle
  $(".submenu-toggle").click(function () {
    $(this).toggleClass("button-toggle-active");
    var currentClass = $(this).attr("data-toggle-target");
    $(currentClass).toggleClass("submenu-toggle-active");
  });

  // Header Search Popup End
  $(".navbar-control-search").click(function () {
    $(".header-searchbar").toggleClass("header-searchbar-active");
    $("body").addClass("body-scroll-locked");
    $("#search-closer").focus();
  });

  $(".header-searchbar").click(function () {
    $(".header-searchbar").removeClass("header-searchbar-active");
    $("body").removeClass("body-scroll-locked");
  });

  $(".header-searchbar-inner").click(function (e) {
    e.stopPropagation(); //stops click event from reaching document
  });

  // Header Search hide
  $("#search-closer").click(function () {
    $(".header-searchbar").removeClass("header-searchbar-active");
    $("body").removeClass("body-scroll-locked");
    setTimeout(function () {
      $(".navbar-control-search").focus();
    }, 300);
  });

  // Focus on search input on search icon expand
  $(".navbar-control-search").click(function () {
    setTimeout(function () {
      $(".header-searchbar .search-field").focus();
    }, 300);
  });

  $("input, a, button").on("focus", function () {
    if ($(".header-searchbar").hasClass("header-searchbar-active")) {
      if (!$(this).parents(".header-searchbar").length) {
        $(".header-searchbar .search-field").focus();
        $(".header-searchbar-area .search-field-default").focus();
      }
    }
  });

  $(".skip-link-search-start").focus(function () {
    $("#search-closer").focus();
  });

  $(".skip-link-search-end").focus(function () {
    $(".header-searchbar-area .search-field").focus();
  });

  $(".skip-link-menu-start").focus(function () {
    if (!$("#offcanvas-menu #primary-nav-offcanvas").length == 0) {
      $("#offcanvas-menu #primary-nav-offcanvas ul li:last-child a").focus();
    }

    if (!$("#offcanvas-menu #social-nav-offcanvas").length == 0) {
      $("#offcanvas-menu #social-nav-offcanvas ul li:last-child a").focus();
    }
  });

  // Action On Esc Button For Search
  $(document).keyup(function (j) {
    $("body").removeClass("body-scroll-locked");
    if (j.key === "Escape") {
      // escape key maps to keycode `27`
      if ($(".header-searchbar").hasClass("header-searchbar-active")) {
        $(".header-searchbar").removeClass("header-searchbar-active");

        setTimeout(function () {
          $(".navbar-control-search").focus();
        }, 300);

        setTimeout(function () {
          $(".aside-search-js").focus();
        }, 300);
      }
    }
  });

  // Action On Esc Button For Offcanvas
  $(document).keyup(function (j) {
    if (j.key === "Escape") {
      // escape key maps to keycode `27`

      if ($("#offcanvas-menu").hasClass("offcanvas-menu-active")) {
        $(".header-searchbar").removeClass("header-searchbar-active");
        $("#offcanvas-menu").removeClass("offcanvas-menu-active");
        $(".navbar-control-offcanvas").removeClass("active");
        $("body").removeClass("body-scroll-locked");

        setTimeout(function () {
          $(".navbar-control-offcanvas").focus();
        }, 300);
      }
    }
  });

  // Toggle Menu Start
  $(".navbar-control-offcanvas").click(function () {
    $(this).addClass("active");
    $("body").addClass("body-scroll-locked");
    $("#offcanvas-menu").toggleClass("offcanvas-menu-active");
    $(".button-offcanvas-close").focus();
  });

  $(".offcanvas-close .button-offcanvas-close").click(function () {
    $("#offcanvas-menu").removeClass("offcanvas-menu-active");
    $(".navbar-control-offcanvas").removeClass("active");
    $("body").removeClass("body-scroll-locked");
    $("html").removeAttr("style");
    $(".navbar-control-offcanvas").focus();
  });

  $("#offcanvas-menu").click(function () {
    $("#offcanvas-menu").removeClass("offcanvas-menu-active");
    $(".navbar-control-offcanvas").removeClass("active");
    $("body").removeClass("body-scroll-locked");
  });

  $(".offcanvas-wraper").click(function (e) {
    e.stopPropagation(); //stops click event from reaching document
  });

  $(".skip-link-menu-end").focus(function () {
    $(".button-offcanvas-close").focus();
  });

  // Toggle Menu End

  // Data Background
  var pageSection = $(".data-bg");
  pageSection.each(function (indx) {
    var src = $(this).attr("data-background");
    if (src) {
      $(this).css("background-image", "url(" + src + ")");
    }
  });

  var rtled = false;

  if ($("body").hasClass("rtl")) {
    rtled = true;
  }

  // Content Gallery Slide Start
  $(
    "ul.wp-block-gallery.columns-1, .wp-block-gallery.columns-1 .blocks-gallery-grid, .gallery-columns-1,  twp-content-gallery .blocks-gallery-grid"
  ).each(function () {
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: false,
      autoplaySpeed: 8000,
      infinite: true,
      nextArrow:
        '<button type="button" class="slide-btn slide-next-icon"></button>',
      prevArrow:
        '<button type="button" class="slide-btn slide-prev-icon"></button>',
      dots: false,
      rtl: rtled,
    });
  });

  // Content Gallery End

  // Content Gallery popup Start
  $(
    ".entry-content .gallery, .widget .gallery, .wp-block-gallery, .zoom-gallery"
  ).each(function () {
    $(this).magnificPopup({
      delegate: "a",
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.attr("title");
        },
      },
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
        opener: function (element) {
          return element.find("img");
        },
      },
    });
  });

  // Content Gallery popup End

  function dhimay_masonry() {
    $(".theme-panelarea-blocks").addClass("twp-active-masonry");
    // Masonry Grid
    if ($(".theme-panelarea-blocks").length > 0) {
      var rtl = false;
      var oLeft = true;
      if ($("body").hasClass("rtl")) {
        var rtl = true;
        var oLeft = false;
      }

      /*Default masonry animation*/
      var grid;
      var hidden = "scale(0.5)";
      var visible = "scale(1)";
      grid = $(".theme-panelarea-blocks").imagesLoaded(function () {
        grid.masonry({
          itemSelector: ".theme-panel-blocks",
          isRTL: rtl,
          originLeft: oLeft,
          hiddenStyle: {
            transform: hidden,
            opacity: 0,
          },
          visibleStyle: {
            transform: visible,
            opacity: 1,
          },
        });
      });
    }
  }

  // Masanory
  if ($(window).width() > 991) {
    dhimay_masonry();
  }

  // Masanory on resize
  $(window).resize(function () {
    if (
      $(window).width() < 991 &&
      $(".theme-panelarea-blocks").hasClass("twp-active-masonry")
    ) {
      $(".theme-panelarea-blocks").masonry("destroy");

      $(".theme-panelarea-blocks").removeClass("twp-active-masonry");
    }

    if (
      $(window).width() > 991 &&
      !$(".theme-panelarea-blocks").hasClass("twp-active-masonry")
    ) {
      dhimay_masonry();
    }
  });

  // Widgets Tab

  $(".twp-nav-tabs .tab").on("click", function (event) {
    var tabid = $(this).attr("tab-data");
    $(this).closest(".tabbed-container").find(".tab").removeClass("active");
    $(this).addClass("active");
    $(this)
      .closest(".tabbed-container")
      .find(".tab-content .tab-pane")
      .removeClass("active");
    $(this)
      .closest(".tabbed-container")
      .find(".content-" + tabid)
      .addClass("active");
  });
});

/*  -----------------------------------------------------------------------------------------------
    Intrinsic Ratio Embeds
--------------------------------------------------------------------------------------------------- */

var Dhimay = Dhimay || {},
  $ = jQuery;

var $dhimay_doc = $(document),
  $dhimay_win = $(window),
  viewport = {};
viewport.top = $dhimay_win.scrollTop();
viewport.bottom = viewport.top + $dhimay_win.height();

Dhimay.instrinsicRatioVideos = {
  init: function () {
    Dhimay.instrinsicRatioVideos.makeFit();

    $dhimay_win.on("resize fit-videos", function () {
      Dhimay.instrinsicRatioVideos.makeFit();
    });
  },

  makeFit: function () {
    var vidSelector = "iframe, .format-video object, .format-video video";

    $(vidSelector).each(function () {
      var $dhimay_video = $(this),
        $dhimay_container = $dhimay_video.parent(),
        dhimay_iTargetWidth = $dhimay_container.width();

      // Skip videos we want to ignore
      if (
        $dhimay_video.hasClass("intrinsic-ignore") ||
        $dhimay_video.parent().hasClass("intrinsic-ignore")
      ) {
        return true;
      }

      if (!$dhimay_video.attr("data-origwidth")) {
        // Get the video element proportions
        $dhimay_video.attr("data-origwidth", $dhimay_video.attr("width"));
        $dhimay_video.attr("data-origheight", $dhimay_video.attr("height"));
      }

      // Get ratio from proportions
      var dhimay_ratio =
        dhimay_iTargetWidth / $dhimay_video.attr("data-origwidth");

      // Scale based on ratio, thus retaining proportions
      $dhimay_video.css("width", dhimay_iTargetWidth + "px");
      $dhimay_video.css(
        "height",
        $dhimay_video.attr("data-origheight") * dhimay_ratio + "px"
      );
    });
  },
};

$dhimay_doc.ready(function () {
  Dhimay.instrinsicRatioVideos.init(); // Retain aspect ratio of videos on window resize
});

// header banner section

let body = document.querySelector("body");

if (body.classList.contains("home") || body.classList.contains("blog")) {
  let headBanner = document.querySelector(".twp-header-banner");
  let gridLeft = headBanner.querySelector(
    ".twp-header-banner.theme-split-grid .theme-grid-left"
  );
  let gridRight = headBanner.querySelector(
    ".twp-header-banner.theme-split-grid .theme-grid-right"
  );

  if (gridLeft === null) {
    headBanner.classList.add("active");
    gridRight.classList.add("active");
  }
}

// scroll on click

$(document).ready(function ($) {
  $(".scroll-container").click(function () {
    $("html,body").animate(
      {
        scrollTop: $(".site-content").offset().top,
      },
      "slow"
    );
  });
});

// scroll to top

$(document).ready(function ($) {
  var btn = $(".loader__content");
  var btnHide = $(".theme-page-wrapper > .loader__content");
  $(window).scroll(function () {
    if ($(window).scrollTop() > 1000) {
      btnHide.addClass("show");
    } else {
      btnHide.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
});

$(document).ready(function ($) {
  $(".theme-main-slider").slick({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: $(".slider-btn-prev"),
    nextArrow: $(".slider-btn-next"),
    autoplay: true,
    autoplaySpeed: 3000,
  });
});

// tab

let tabBlock = document.querySelector(".theme-tab-block");

if (tabBlock) {
  let tabContainer = document.querySelector(".theme-tab-container");
  let tabContent = document.querySelectorAll(".tab-content");
  let tabs = document.querySelectorAll(".theme-tabs li a");

  Array.from(tabs);
  Array.from(tabContent);

  tabContent[0].classList.add("active");
  tabs[0].classList.add("active");

  tabContainer.addEventListener("click", function (e) {
    let id = e.target.dataset.id;
    let tabClass = e.target;

    if (id) {
      e.preventDefault();
      tabContent.forEach(function (item) {
        item.classList.remove("active");
      });

      let element = `#${id}`;

      let tabItem = document.querySelector(element);
      tabItem.classList.add("active");

      tabs.forEach(function (item) {
        item.classList.remove("active");
      });

      tabClass.classList.add("active");
    }
  });
}

// music player

let wpContainer = document.querySelector(".wp-playlist");

function musicPlayer() {
  if (wpContainer) {
    let controls = document.querySelector(".mejs-controls");
    let playList = document.createElement("span");
    playList.classList.add(
      "dashicons",
      "dashicons-playlist-audio",
      "theme-playlist"
    );
    wpContainer.append(playList);

    playList.addEventListener("click", function () {
      wpContainer.lastChild.classList.toggle("active");
    });
  }
}

musicPlayer();

// footer section

let siteFooter = document.querySelector("#site-footer");

if (wpContainer) {
  siteFooter.classList.add("pd");
  checkHome();
}

function checkHome() {
  let body = document.querySelector("body");
  let scrollContainer = document.querySelector(".scroll-container");

  if (body.classList.contains("home")) {
    scrollContainer.classList.add("active");
  }
}
