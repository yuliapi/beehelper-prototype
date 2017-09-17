// $(document).ready(function () {
//
//
// });
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var allDates = []

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
    var icon = getIcon($(this));
    if (!$(this).attr('aria-pressed') || $(this).attr('aria-pressed') === "false") {
        console.log(icon);
        icon.addClass('mark-checked');
    }
    if ($(this).attr('aria-pressed') && $(this).attr('aria-pressed') === "true") {
        icon.toggleClass('mark-checked')
    }
    var inputValue = $(this).find('input').val();
    var input;
    if (inputValue === "money") {
        input = $('#paySelected')
    }
    if (inputValue === "barter") {
        input = $("#barterSelected")
    }
    if (input) {
        input.toggleClass("hidden-sm-up");
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

//************************************************//
function makeActive(item) {
    $("." + item).addClass('active');
}
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

function radioHandleClick(e) {
    var checked = e.value;
    $(".datepicker").datepicker("remove");
    if (checked === 'days') {
        $(".selectByDays").removeClass('collapse');
        $(".selectByDates").addClass("collapse");

        var optionsDataRange = {

            container: '#range',
            weekStart: 1,
            forceParse: false,
            clearBtn: true
        }
        $('.input-daterange').datepicker(optionsDataRange);

    } else {

        var options = {
            multidate: true,
            todayHighlight: true,
            weekStart: 1,
            clearBtn: true,

        };
        $(".selectByDays").addClass('collapse');
        $(".selectByDates").removeClass('collapse');
        $(".datepicker").datepicker(options).on("changeDate", function () {
            allDates = getDates(this).sort(function (a, b) {
                return a < b ? -1 : (a > b ? 1 : 0);
            });
            displaySelectedDates(allDates);
        });
    }

}
function getDates(e) {
    return ($(e).datepicker("getDates"));
}

function displaySelectedDates(dates) {


    var parentDiv = $('#selectedDatesList');
    parentDiv.empty();

    dates.forEach(function (e) {

        var div = $("<div class='d-inline-block'></div>");
        var p = $("<p class='d-inline-block'></p>");
        var index = allDates.indexOf(e)
        var button = $("<button type='button' class='close' onclick='updateSelectedDates(this)'> <span aria-hidden='true'>&times;</span></button>");
        var text = (e.getDate() + " " + monthNames[e.getMonth()] + " "  + e.getFullYear());
        button.attr("data-index", index);
        p.text(text)
        div.append(p);
        div.append(button);
        parentDiv.append(div);
    })
}

function updateSelectedDates(target) {
    $(target).parent("div").remove();

    var indexToRemove = $(target).attr("data-index");
    if (indexToRemove > -1) {
        allDates.splice(indexToRemove, 1);
    }
    var updateDates = []
    allDates.forEach(function(e) {
        var date = (e.getFullYear()+ ", " + (e.getMonth()+1) + ", " + e.getDate())
        console.log(date);
        updateDates.push(new Date(date))
    })
    console.log(updateDates)
       $(".datepicker").datepicker('setDates', updateDates);
}

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        container: 'body'
    })
})
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    })
})

$('.recommend').popover(
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