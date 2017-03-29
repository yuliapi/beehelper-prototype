/**
 * Created by yulia on 2/7/2017.
 */
function collapseParent(e) {
    var parent = $(e).parent();
    $(parent).addClass("collapse");
}

function getLabel(e) {
    var label = $("label[for='" + e + "']");
    return label;
}

function getIcon(i) {
    var icon = $(i).find('i');
    return icon;
}

// function changeUrl(e) {
//     var url = window.location.href;
//     url = url.split(".")
//     console.log(url[1]);
//     var urlNew = url[0] + e + '.' + url[1];
//     var stateObj = {entry: e};
//     history.pushState(stateObj, "", stateObj.entry);
//
// }

$('.btnFind').click(function () {
    collapseParent(this)
});
//remove text from placeholder and add it to label
$("input").focus(function () {
    var placeholder = $(this).attr('placeholder');
    if (placeholder === 'move marker on map or start typing address') {
        placeholder = "Location";
    }
    ;
    if (placeholder) {
        var label = getLabel($(this).attr('id'))
        // var label = $("label[for='" + $(this).attr('id') + "']");
        var labelText = placeholder;
        label.html(labelText);
        $(this).attr('placeholder', '')
    }
});
//change pseudo check-marks color(make them visible) when checkbox is selected, and inverse
$('.label-btn').click(function () {
    var icon = getIcon($(this))
    if (!$(this).attr('aria-pressed') || $(this).attr('aria-pressed') === "false") {
        icon.addClass('mark-checked')
        $('#selectDate').val('')
        console.log($('#selectDate'))
    }
    if ($(this).attr('aria-pressed') && $(this).attr('aria-pressed') === "true") {
        icon.toggleClass('mark-checked')

    }
});

//
$('#selectDate').on("focusout", function () {
    var value = $(this).val();
    if (value) {
        var allCheckbox = $('#dayPicker').find(':checkbox');
        for (var i = 0; i < allCheckbox.length; i++) {
            var label = getLabel($(allCheckbox[i]).attr('id'));
            var icon = getIcon($(label));
            $(icon).removeClass('mark-checked')
            $(label).attr('aria-pressed', "false");
        }
    }
});

//spinner for number of kids input
(function ($) {
    $('.spinner .spin:first-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .spin:last-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
    });
})(jQuery);


var hash = 4;
$(".btn-add-panel").on("click", function () {
    var template = $("#accordeonTemplate");
    var newPanel = $(template).clone();
    newPanel.removeClass("hidden-xs-up");
    newPanel.removeAttr('id');
    console.log(newPanel.find(".accordionToggler"))
    newPanel.find(".accordionToggler").attr("aria-controls", "collapse-" + (hash));
    newPanel.find(".card-header").attr("id", "cardheader-" + (hash));

    //     .text("Dynamic panel #" + hash);
    // $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
    $("#accordion").append(newPanel);

});

$(".saveForLater").click(function () {
    window.location.replace()
})


$(".visibility-toggler").click(function () {
    var icons = $(this).children();
    for (var i = 0; i < icons.length; i++) {
        $(icons[i]).toggleClass("hidden-xs-up");
    }
})

var firstContact = true;
$('#send-myHelp').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    // modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient);

    modalActions(button);
});
function modalActions(button) {
    $("#send-myHelp").find(".sendBtn").click(function () {
        var modalBody = $(this).parent().parent().find('.modal-body');
        var modalHeader = $(this).parent().parent().find('.modal-header')
        var modalFooter = $(this).parent().parent().find('.modal-footer')
        modalFooter.find('.btn-primary').remove();
        modalFooter.find('p').remove();
        modalFooter.find(".btn-secondary").text('Close')
        modalHeader.remove();
        modalBody.empty();
        var template = $(".success-message");
        var message = template.clone().removeClass("hidden-xs-up");
        modalBody.append(message);
        modalFooter.find(".btn-secondary").click(function () {

            $(button).hide();
            var node = $("<div><i class='fa fa-envelope-o' aria-hidden='true'></i>" +
                "<p class='small d-inline-block'>Сообщение отправлено</p></div>");
            $(button).parent().append(node)
            if (firstContact) {
                var inner = $(".saveRequest").find(".inner");
                for (var i = 0; i < inner.length; i++) {
                    $(inner[i]).toggleClass('hidden-xs-up');
                }
                firstContact = false;
            }
        })
    })
}

$('.confirm').click(function () {
    var confirmedUser = $(this).siblings().data('whatever');
    var otherUsers = $(this).parent().siblings();
    for (var i = 0; i < otherUsers.length; i++) {
        $(otherUsers[i]).find(".confirm").prop('disabled', true);
    }
});

$('.writeAnswer').click(function () {
    var template = $('.composeResponseTemplate');
    var parent = $(this).parent().parent().parent();
    var newCard = template.html();
    parent.append(newCard);
    var respondButton = $(this);
    respondButton.prop('disabled', true);

    $('.sendAnswer').click(function () {
        respondButton.prop('disabled', false);
        var message = $(this).siblings().children('textarea').val();
        var template = $('.showMyResponseTemplate')
        var div = parent.children().last()
        console.log(div);
        $(div).removeClass('outbox');
        div.empty();
        div.prepend(template.html());
        $(div).find('.card-block').prepend(message)

    });
});
/*********************************************/
$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'hover'
    })
})
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    })
})


$(function () {

    $('[data-toggle="collapse"]').click(function () {
        // var collapse = $(this).attr('aria-expanded')
        // var collapseDiv = $(this).attr('href');
        var button = $(this).parent().siblings();
        button.toggleClass('transform-down')
        // if (collapse === 'false') {
        //     $(button).addClass('transform-down');
        //     $(button).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
        //         function () {
        //             $(collapseDiv).find('.help-status-description').addClass('transform');
        //         });
        // }
        // else (
        //     $(button).removeClass('transform-down')
        // )

    })
});

$('.visibilityToggler').click(function () {
    var previousStatus = $(this).attr('aria-pressed');
    var popover = $(this).parent().data('bs.popover')
    popover.config.trigger = 'manual';
    if (previousStatus === 'true') {
        popover.config.content = 'Invisible for search';
        $(this).parent().popover('show');
        $(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');


    } else {
        popover.config.content = 'Visible for search';
        $(this).parent().popover('show');
        $(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');

    }
})
function modalRedirect(form) {
    var allInputs = $(form + ' :input').toArray();
    var checkedValue;
    $(allInputs).each(function () {
        var isChecked = $(this).prop('checked');
        if (isChecked) {
            checkedValue = $(this).val();
            console.log(checkedValue)
        }
    });
    if (checkedValue === 'option1') {
        $("#rateModal").modal('show');
        $('#rateModal').on('shown.bs.modal', function () {
            $('body').addClass('modal-open')
        })


    }
}

$("#my-address").tooltip(
    {
        'container': 'body',
        'trigger': 'focus',
        'placement': 'right',
        'title': 'We recommend specify your approximate location. It will help you find help or job ' +
        'close. You can do it by using map-marker or manually'

    }
)
$('.recomend').popover(
    {
        'template': "<div class='popover' role='tooltip'><div class='popover-arrow'></div><div class='popover-content'></div></div>",
        'html': true,
        'content': function () {
            return $('#recommended-popover-content').html();
        }
    });
$('.rating').popover(
    {
        'template': "<div class='popover' role='tooltip'><div class='popover-arrow'></div><div class='popover-content'></div></div>",
        'html': true,
        'content': function () {
            return $('#rating-popover-content').html();
        }
    });
// var popover = $('.recomend').data('bs.popover');


function showInfo(e) {
    // var paragraph = '<p>rrrrr</p>'
    var myTimeout = setTimeout(function () {

        $(e).parent().parent('.userpic-info').addClass('inlarge');
        $(e).parent().parent('.userpic-info').on('transitionend', function () {
            $(e).parent().parent('.userpic-info').find('p').removeClass("hidden-xs-up");
        })
        $(e).find('img').addClass('userpic-inlarge');

    }, 500);
    $(e).mouseleave(function () {
        clearTimeout(myTimeout);
    });


    $(e).parent().parent('.userpic-info').mouseleave(function () {
        $(e).parent().parent('.userpic-info').find('p').addClass("hidden-xs-up");
        $(e).parent().parent('.userpic-info').off('transitionend')
        $(e).parent().parent('.userpic-info').removeClass('inlarge');
        $(e).find('img').removeClass('userpic-inlarge')
    })
}

function emailNotRegistered(e) {
    var value = $(e).val();
    var button = $(e).parent().parent().siblings('button')
    var div =  $(e).parent().parent().siblings('div');
    var p = $(e).parent().siblings('p')
    if (value === "yulia.pi@gmail.com") {
      div.addClass("hidden-xs-up");
        p.addClass("hidden-xs-up");
        button.text("Log in");
    } else {
        p.removeClass('hidden-xs-up');
        button.text("Sign up");
        div.removeClass('hidden-xs-up');
    }
    button.removeClass('hidden-xs-up');
}
var email = false;
var pass = false
function emailValidation(e) {

    var value = $(e).val();
    if (value === "yulia.pi@gmail.com") {
        $(e).parent().addClass('has-success').removeClass('has-danger')
        $(e).addClass('form-control-success')
        $("#noAccount").addClass("hidden-xs-up");
        email= true;
    } else {
        $("#noAccount").removeClass("hidden-xs-up");
        $(e).parent().addClass("has-danger").removeClass('has-success');
        $(e).addClass('form-control-danger').removeClass('form-control-success')
    }
}

function passwordValidation(e) {
   var value = $(e).val();
    if (value === "123456") {
        $(e).parent().addClass('has-success').removeClass('has-danger')
        $(e).addClass('form-control-success')
        $("#notPass").addClass("hidden-xs-up");
        pass = true;
    } else {
        $("#notPass").removeClass("hidden-xs-up");
        $(e).parent().addClass("has-danger").removeClass('has-success');
        $(e).addClass('form-control-danger').removeClass('form-control-success')
    }
    if (email && pass) {
        $('#loginBtn').removeClass('disabled')
    }
}
 function signUp() {
     console.log("d");
    window.location.href = "file:///C:/Users/yulia/IdeaProjects/BeeHelperPages/regDone.html";

}





