$(function () {
    $('.smooth-scroll').smoothScroll({offset: -100});

    if (!Modernizr.svg) {
        $('#logo-img').attr('src', '/images/logo.png');
    }

    var addScript = function(src, id) {
        var scriptTag = document.createElement('script');
        scriptTag.src = src;
        scriptTag.id = id;
        document.body.appendChild(scriptTag);
        document.getElementById(id).remove();
    }

    var loaded = false;

    $('.view-full-performance').click(function() {
        if ($('#view-full-performance').text() === 'View Full Performance Data') {
            $('#view-full-performance').html($('#view-full-performance').html().replace('View Full Performance Data', 'Hide Full Performance Data'));
            $('#portfolio-filter').removeClass('hidden');
            $('#portfolio-results').removeClass('hidden');
            setTimeout(function () {
                $('#view-full-performance-2').removeClass('hidden');
            });
            if (loaded) {
                return $('#performance-chart').show();
            }
            loaded = true;
            addScript('/js/highcharts.js', 'highcharts');
            addScript('/js/view-performance-data.js', 'view-performance-data');
            $('.view-full-performance-loader').addClass('ball-clip-rotate');
            $('#view-full-performance').attr('disabled', true);
        } else {
            $('#view-full-performance-2').addClass('hidden');
            $('#performance-chart').hide();
            $('#view-full-performance').html($('#view-full-performance').html().replace('Hide Full Performance Data', 'View Full Performance Data'));
            $('#portfolio-filter').addClass('hidden');
            $('#portfolio-results').addClass('hidden');
            $('#performance-link').click();
        }
    });

    if (window.devicePixelRatio >= 2) {
        $('#ios-forex-sms-iphone').attr('src', 'https://malaysia-6d6d.kxcdn.com/images/ios-forex-sms-signal_iphone6splusgold_portrait_retina.png');
    }
});

