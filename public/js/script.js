$(function () {
    $('.smooth-scroll').smoothScroll({offset: -100});

    if (!Modernizr.svg) {
        $('#logo-img').attr('src', '/images/logo.png');
    }
});

