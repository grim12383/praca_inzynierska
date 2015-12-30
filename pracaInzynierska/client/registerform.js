Template.register.events({
    'click #register-button': function (e, t) {
        e.preventDefault();
        data = {
            login: $("#login").val(),
            password: $("#password").val(),
            password2: $("#password2").val(),
            mail: $("#mail").val(),
            name: $("#name").val(),
            address: $("#address").val()
        };
        var email = data.mail.trim(" ");
        var trimmedLogin = data.login.trim(" ");
        if (trimmedLogin.length != 0) {
            if (isValidEmailAddress(data.mail) && email.length != 0) {
                if (isValidPassword(data.password, data.password2)) {
                    Meteor.call("addUser", data, function (err) {
                        if (!err) {
                            Router.go("login");
                        } else {
                            $(".errors").slideDown().text("Podany login już istnieje w bazie");
                        }
                    });
                } else {
                    $(".errors").slideDown().text("Hasła nie są takie same, lub mają mniej niż 8 znaków");
                }
            } else {
                $(".errors").slideDown().text("Niepoprawny format maila");
            }
        } else {
            $(".errors").slideDown().text("Proszę podać login");
        }
        return false;


    }
});
var isValidPassword = function (password, password2) {
    if (password.length > 7)
        if (password == password2)
            return true;
        else return false;
    else
        return false;
};
var isValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    return pattern.test(emailAddress);
};