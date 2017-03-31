$(function() {

  var player = new Tone.Player({
    "url" : "./images/music.mp3",
    "loop" : true
  }).toMaster();

    var fadeOut = function(tone, duration, complete) {
      var vars = jQuery.extend($("<div>")[0], { volume: 0 });
        $(vars).stop().animate({ volume: -60 }, {
            easing: "linear",
            duration: duration,
            step: function() {
                tone.volume.value = this.volume; // this == vars
            },
            complete: complete
        });
    }

    $('#my-slider').hide();
    var cover = $("#my-slider-cover");
    var playSlide = function() {
        $('#my-slider').show();
        $('#my-slider').sliderPro({
            loop: false,
            slideDistance: 0,
            fade: true,
            fadeDuration: 4000,
            autoplayDelay: 5000,
            width: "100%",
            aspectRatio: 1.5,
            autoplayOnHover: "none",
            buttons: false,
            waitForLayers: false,
        });

        $('#my-slider').off("gotoSlideComplete");
        $('#my-slider').on("gotoSlideComplete", function(event) {
          console.log(event.index);
            if (event.index >= 11) {
              fadeOut(player, 6000, function() {
                player.volume.value = 0.0;
                player.stop();
                player.seek(0);
              });

              var cover = $("#my-slider-cover");
              cover.show();
              cover.fadeTo(2000, 1.0);

              setTimeout(function() {
                var slider = $('#my-slider').data("sliderPro");
                slider.destroy();
                $('#my-slider').hide();
              }, 2000);
            }
        });

        player.start();

        var cover = $("#my-slider-cover");
        cover.fadeTo(400, 0, function() {
            cover.hide();
        });
    };

    $(".slider-cover__nosound-icon").on("click", function() {
        playSlide();
        player.volume.value = -100;
        $(".slider-cover__mute-icon").show();
        $(".slider-cover__unmute-icon").hide();
    });

    $(".slider-cover__sound-icon").on("click", function() {
        playSlide();
        $(".slider-cover__mute-icon").hide();
        $(".slider-cover__unmute-icon").show();
    });

    $(".slider-cover__mute-icon").on("click", function() {
        player.volume.setValueAtTime(0, 0);
        $(".slider-cover__mute-icon").hide();
        $(".slider-cover__unmute-icon").show();
    });

    $(".slider-cover__unmute-icon").on("click", function() {
        fadeOut(player, 1000, function() {
        });
        $(".slider-cover__mute-icon").show();
        $(".slider-cover__unmute-icon").hide();
    });

    $(window).on('focus', function() {
      var slider = $('#my-slider').data("sliderPro");
      if (slider != undefined) {
        slider.update();
      }
    });
});
