Template.login.events({
    'click #login-button': function (e, t) {
        e.preventDefault();
        var email = $("#login-email").val(),
            password = $("#login-password").val();
        console.log("cos", email, password);
        Meteor.loginWithPassword(email, password, function (err) {
            if (err)
                alert("Błąd");
            else {
                alert("Zalogowano pomyślnie");
                Router.go("main");
            }
        });
        return false;
    }
});