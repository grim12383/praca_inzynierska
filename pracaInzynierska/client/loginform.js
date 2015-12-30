Template.login.events({
    'click #login-button': function (e, t) {
        e.preventDefault();
        var username = $("#login").val(),
            password = $("#password").val();
        Meteor.loginWithPassword(username, password, function (err) {
            if (err)
                $(".errors").slideDown().text("Błędny login lub hasło");
            else {
                Router.go("main");
            }
        });
        return false;
    }
});