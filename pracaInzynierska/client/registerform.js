Template.register.events({
    'click #register-button': function (e, t) {
        e.preventDefault();
        data = {
            login: $("#login").val(),
            password: $("#password").val(),
            password2: $("#password2").val(),
            mail: $("#mail").val(),
            name: $("#name").val(),
            surname: $("#surname").val(),
            street: $("#street").val(),
            number: $("#number").val(),
            city: $("#city").val(),
            postCode: $("#postcode").val(),
            PESEL: $("#pesel").val()
        };
        var email = data.mail.trim(" ");
        var trimmedLogin = data.login.trim(" ");
        if (data.login == "" || data.mail == "" || data.name == "" || data.surname == "" || data.street == "" || data.number == "" || data.postCode == "" || data.city == "") {
            $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Proszę uzupełnić wszystkie wymagane pola!<strong></p></div>");
        } else {
            if (trimmedLogin.length != 0) {
                if (isValidEmailAddress(data.mail) && email.length != 0) {
                    if (isValidPassword(data.password, data.password2)) {
                        Meteor.call("addUser", data, function (err) {
                            if (!err) {
                                Router.go("login");
                            } else {
                                $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Podany login już istnieje w bazie<strong></p></div>");
                            }
                        });
                    } else {
                        $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Hasła nie są takie same, bądź są za krótkie<strong></p></div>");
                    }
                } else {
                    $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Niepoprawny format maila<strong></p></div>");
                }
            }
            return false;
        }

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