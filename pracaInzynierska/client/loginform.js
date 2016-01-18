Template.login.events({
    'click #login-button': function (e, t) {
        e.preventDefault();
        var username = $("#login").val(),
            password = $("#password").val();
        Meteor.loginWithPassword(username, password, function (err) {
            if (err)
                $(".errors").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Niepoprawny login lub hasło!<strong></p></div>");
            else {
                Router.go("main");
            }
        });
        return false;
    }
});