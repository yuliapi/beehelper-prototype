updateOrientedContent()
window.addEventListener("orientationchange", function () {
    updateOrientedContent();
});


function updateOrientedContent() {
    var mobile = detectMob();
    var iphone4 = (window.screen.height == (960 / 2)) || (window.screen.width == (960 / 2));
    var iphone5 = (window.screen.height == (1136 / 2)) || (window.screen.width == (1136 / 2));


    if (mobile && iphone4 || mobile && iphone5) {
        console.log('done');
        $('aside').removeClass('hidden-xs-down');
        $('.page-content').addClass('iphone5');
        // $('footer').addClass('hidden-xs-up');
        adjastContentLandscape()
    }
    if (mobile) {
        iconMobileMode();
        var screen = getOrientation();

        if (screen.indexOf('landscape') > -1) {
            adjastContentLandscape()
        } else {
            adjastContentPortrait()
        }
    } else {
        iconDesktopMode();
        adjastContentLandscape()
    }

}


function detectMob() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}
function getOrientation() {
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    return (orientation.type)
}
function adjastContentLandscape() {
    $('aside').removeClass('d-none');
    $('.page-content').removeClass('portrait');
    $('footer').addClass('hidden-sm-up');
}
function adjastContentPortrait() {
    $('aside').addClass('d-none')
    $('.page-content').addClass('portrait');
    $('.page-content').removeClass('iphone5');
    $('footer').removeClass('hidden-sm-up');


}

function iconMobileMode() {
    $('.sidebar').find('.fa').addClass('fa-2x');
    $('aside').addClass('mobile');
    $('.sidebar').addClass('mobile');
    $('.page-content').addClass('mobile');
    $('.btn-find').addClass('mobile')

}
function iconDesktopMode() {
    $('.sidebar').find('.fa').addClass('fa-3x');
}
