Template.register.events({
    'click #register-button': function (e, t) {
        e.preventDefault();
        var email = $("#register-email").val(),
            password = $("#register-password").val();
        if (isValidEmailAddress(email)) {
            if (isValidPassword(password)) {
                Accounts.createUser({
                    email: email,
                    password: password
                }, function (err) {
                    if (err) {
                        alert("Podany mail już istnieje w bazie");
                    } else {
                        alert("Pomyślnie utworzono konto i zalogowano. Przenoszę na stronę główną");
                        Router.go("/main");
                    }

                });
            } else {
                alert("Hało musi mieć co najmiej 8 znaków");
            }
        } else {
            alert("Niepoprawny format maila");
        }
        return false;


    }
});
var isValidPassword = function (val) {
    if (val.length > 7)
        return true;
    else
        return false;
};
var isValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    return pattern.test(emailAddress);
};