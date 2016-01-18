Template.changepw.events({
    'click #change': function () {
        var old = $("#password").val();
        var newpw = $("#passwordnew").val();
        Accounts.changePassword(old, newpw, function (err, res) {
            if (!err) {
                $(".errors").html("<div class='alert alert-success'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Pomyślnie zmieniono hasło<strong></p></div>");
            } else {
                $(".errors").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd, spróbuj ponownie<strong></p></div>");
            }
        });
    },
    'click #back': function () {
        history.back();
    }
});