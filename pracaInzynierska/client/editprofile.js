Template.editprofile.events({
    'click #update': function () {
        profileData = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            PESEL: $("#pesel").val(),
            mail: $("#mail").val(),
            street: $("#street").val(),
            number: $("#number").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val()
        };
        if (profileData.login == "" || profileData.mail == "" || profileData.name == "" || profileData.surname == "" || profileData.street == "" || profileData.number == "" || profileData.postCode == "" || profileData.city == "") {
            $(".info").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wypełnij wszystkie wymagane pola!<strong></p></div>");
        } else {
            Meteor.call("editprofile", profileData, Meteor.userId(), function (error, result) {
                if (!error)
                    $(".info").html("<div class='alert alert-success'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Pomyślnie zaktualizowano profil!<strong></p></div>");
                else
                    $(".info").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd, profil nie został zaktualizowany!<strong></p></div>");
            });
        }
    }
});