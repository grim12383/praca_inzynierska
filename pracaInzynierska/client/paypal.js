Template.paypal.events({
    'submit #payForm': function (evt, tmp) {
        evt.preventDefault();
        var name = $('#name').val();
        var card = $('#card option:selected').val();
        var cardnumber = $('#cardnumber').val();
        var expmonth = $('#expmonth option:selected').val();
        var expyear = $('#expyear').val();
        var cvv = $('#cvv').val();
        $("#pay").attr("disabled", "disabled");
        Meteor.Paypal.purchase({
            name: name,
            number: cardnumber,
            type: card,
            cvv2: cvv,
            expire_year: expyear,
            expire_month: expmonth
        }, {
            total: '1.00',
            currency: 'USD'
        }, function (err, results) {
            if (err) console.log(err);
            else {
                if (results.saved == true) {
                    var data = Session.get("reservationDataWithPay");
                    Meteor.call("sendEmail", data.mail.from, data.mail.to, data.mail.subject2, data.mail.text2);
                    Meteor.call("sendEmail", data.mail.to, data.mail.from, data.mail.subject, data.mail.text, function (error, result) {
                        if (error)
                            $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podzas wysyłania maila<strong></p></div>");
                    });
                    console.log(results);
                    Meteor.call("reservation", data.resData, data.date, data.owner, "Tak", function (error, result) {
                        if (error) {
                            $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podczas rezerwacji, spróbuj ponownie!<strong></p></div>");
                        } else {
                            $("#resData").html("<div class='alert alert-success'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Pomyślnie dokonano rezerwacji! Za chwile nastapi przeniesienie na stronę główną<strong></p></div>");
                            setTimeout(function () {
                                Router.go("main");
                            }, 5000);
                        }
                    });
                } else {
                    $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Niepomyślna próba dokonania zapłaty<strong></p></div>")
                }
            };
        });
    },
    "click #back": function () {
        history.back();
    }
});
Template.paypal.onRendered(
    function () {
        var data = Session.get("reservationDataWithPay");
        $("#pay").val("Płacę " + data.price);
    }
);