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
        var modalHeader = $(this).parent().parent().find('.modal-header');
        var modalFooter = $(this).parent().parent().find('.modal-footer');
        modalFooter.find('.btn-primary').remove();
        modalFooter.find('p').remove();
        modalFooter.find(".btn-secondary").text('Close');
        modalHeader.remove();
        modalBody.empty();
        var template = $(".success-message");
        var message = template.clone().removeClass("hidden-xs-up");
        modalBody.append(message);
        modalFooter.find(".btn-secondary").click(function () {

            $(button).hide();
            var node = $("<div><i class='fa fa-envelope-o' aria-hidden='true'></i>" +
                "<p class='small d-inline-block'>Message have been sent</p></div>");
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
function sendMessage(button) {
    var firstContact = true;
    sendSuccess(button, ".success-privateMessage", firstContact)

}
function sendSuccess(button, template, e) {
    var modalBody = $(button).parent().parent().find('.modal-body');
    var modalHeader = $(button).parent().parent().find('.modal-header')
    var modalFooter = $(button).parent().parent().find('.modal-footer')
    modalFooter.find('.btn-primary').remove();
    modalFooter.find('p').remove();
    modalFooter.find(".btn-secondary").text('Close')
    modalHeader.remove();
    modalBody.empty();
    var template = $(template);
    var message = template.clone().removeClass("hidden-xs-up");
    modalBody.append(message);
    modalFooter.find(".btn-secondary").click(function () {

        $(button).hide();
        var node = $("<div><i class='fa fa-envelope-o' aria-hidden='true'></i>" +
            "<p class='small d-inline-block'>Message have been sent</p></div>");
        $(button).parent().append(node)
        if (e) {
            console.log(e)
            var inner = $(".saveRequest").find(".inner");
            for (var i = 0; i < inner.length; i++) {
                $(inner[i]).toggleClass('hidden-xs-up');
            }
            return e = false;
        }
    })
}