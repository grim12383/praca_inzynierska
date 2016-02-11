var dep = new Deps.Dependency();
var offerLength, of, price;
var disabledDates = [];
Template.reservation.events({
    'change #start': function () {
        func();
    },
    'change #end': function () {
        func();
    },

    'click #reservation': function () {
        var sessionData = Session.get("filterParams");
        var date;
        var stayDates, stayDatee;
        resData = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            PESEL: $("#pesel").val(),
            phone: $("#phone").val(),
            mail: $("#mail").val(),
            street: $("#street").val(),
            number: $("#number").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            roomid: this.roomid,
            id: this.owner,
            resid: Meteor.userId()
        };
        if (resData.phone == "") {
            $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Podaj numer telefonu!<strong></p></div>");
        } else {
            if (resData.name == "" || resData.surname == "" || resData.street == "" || resData.number == "" || resData.postCode == "" || resData.city == "" || resData.mail == "") {
                $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wypełnij wszystkie wymagane pola!<strong></p></div>");
            } else {
                var startDateFinal, endDateFinal;
                if (sessionData.start == undefined || sessionData.start == "" && sessionData.end == undefined || sessionData.end == "" || sessionData.dateDiff == 0) {
                    var stDate = $("#start").val();
                    var endDate = $("#end").val();
                    if (stDate == "" || endDate == "") {
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie wybrano daty!<strong></p></div>");
                    } else {
                        var startDay = stDate.substring(0, 2);
                        var startMonth = stDate.substring(3, 5);
                        var startYear = stDate.substring(6, 11);
                        startDateFinal = new Date(startYear, startMonth - 1, startDay);
                        stayDates = stDate;

                        var endDay = endDate.substring(0, 2);
                        var endMonth = endDate.substring(3, 5);
                        var endYear = endDate.substring(6, 11);
                        endDateFinal = new Date(endYear, endMonth - 1, endDay);
                        stayDatee = endDate;
                        d = {
                            start: startDateFinal,
                            end: endDateFinal
                        };
                        date = d;
                    }
                } else {
                    var stDate = sessionData.start;
                    var startDay = stDate.substring(0, 2);
                    var startMonth = stDate.substring(3, 5);
                    var startYear = stDate.substring(6, 11);
                    startDateFinal = new Date(startYear, startMonth - 1, startDay);
                    stayDates = stDate;
                    var endDate = sessionData.end;
                    var endDay = endDate.substring(0, 2);
                    var endMonth = endDate.substring(3, 5);
                    var endYear = endDate.substring(6, 11);
                    endDateFinal = new Date(endYear, endMonth - 1, endDay);
                    stayDatee = endDate;
                    d = {
                        start: startDateFinal,
                        end: endDateFinal
                    };
                    date = d;
                }
                var dateDiff = Math.abs(date.start - date.end) / 86400000;
                if (dateDiff == 0) {
                    $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie mozna dokonać rezerwacji dla wybranej daty, wymagane spędzenie przynajmniej jednej nocy!<strong></p></div>");
                    return false;
                }
                var busy = Rooms.findOne({
                    _id: this.roomid
                });
                var owner = busy.owner;
                for (var i = 0; i < busy.busy.length; i++) {
                    if (busy.busy[i].start >= startDateFinal && busy.busy[i].end <= endDateFinal) {
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie mozna dokonać rezerwacji dla wybranej daty<strong></p></div>");
                        return false;
                    }
                }
                var mailto = Meteor.users.findOne({
                    _id: owner
                });
                var to = mailto.profile.mail;
                var from = resData.mail;
                var subject = "Nowa rezerwacja dla Twojej oferty " + of.title;
                var subject2 = "Dokonałeś rezerwacji dla oferty " + of.title;
                var text = "Masz nowa rezerwacje w pokoju " + busy.type + " " + busy.howMany + "-osobowym w ramach oferty " + of.title + "\n Dane rezerwującego:\nImię i nazwisko: " + resData.name + " " + resData.surname + "\n Adres zamieszkania: " + resData.street + " " + resData.number + " " + resData.postCode + " " + resData.city + "\n Telefon kontaktowy: " + resData.phone + "\n Rezerwacja od: " + stayDates + " do: " + stayDatee;
                var text2 = "Dokonałeś rezerwacji w pokoju " + busy.type + " " + busy.howMany + "-osobowym w ramach oferty " + of.title + "\n Twoje dane:\nImię i nazwisko: " + resData.name + " " + resData.surname + "\n Adres zamieszkania: " + resData.street + " " + resData.number + " " + resData.postCode + " " + resData.city + "\n Telefon kontaktowy: " + resData.phone + "\n Rezerwacja od: " + stayDates + " do: " + stayDatee;
                Meteor.call("sendEmail", from, to, subject2, text2);
                Meteor.call("sendEmail", to, from, subject, text, function (error, result) {
                    if (error)
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podzas wysyłania maila<strong></p></div>");
                });
                Meteor.call("reservation", resData, date, owner, "Nie", function (error, result) {
                    if (error) {
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podczas rezerwacji, spróbuj ponownie!<strong></p></div>");
                    } else {
                        $("#resData").html("<div class='alert alert-success'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Pomyślnie dokonano rezerwacji! Za chwile nastapi przeniesienie na stronę główną<strong></p></div>");
                        setTimeout(function () {
                            Router.go("main");
                        }, 5000);
                    }
                });
            }
        }
    },
    'click #pay': function () {
        var sessionData = Session.get("filterParams");
        var date;
        var stayDates, stayDatee;
        resData = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            PESEL: $("#pesel").val(),
            phone: $("#phone").val(),
            mail: $("#mail").val(),
            street: $("#street").val(),
            number: $("#number").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            roomid: this.roomid,
            id: this.owner,
            resid: Meteor.userId()
        };
        if (resData.phone == "") {
            $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Podaj numer telefonu!<strong></p></div>");
        } else {
            if (resData.name == "" || resData.surname == "" || resData.phone == "" || resData.street == "" || resData.number == "" || resData.postCode == "" || resData.city == "" || resData.mail == "") {
                $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wypełnij wszystkie wymagane pola!<strong></p></div>");
            } else {
                var startDateFinal, endDateFinal;
                if (sessionData.start == undefined || sessionData.start == "" && sessionData.end == undefined || sessionData.end == "" || sessionData.dateDiff == 0) {
                    var stDate = $("#start").val();
                    var endDate = $("#end").val();
                    if (stDate == "" || endDate == "") {
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie wybrano daty!<strong></p></div>");
                    } else {
                        var startDay = stDate.substring(0, 2);
                        var startMonth = stDate.substring(3, 5);
                        var startYear = stDate.substring(6, 11);
                        startDateFinal = new Date(startYear, startMonth - 1, startDay);
                        stayDates = stDate;

                        var endDay = endDate.substring(0, 2);
                        var endMonth = endDate.substring(3, 5);
                        var endYear = endDate.substring(6, 11);
                        endDateFinal = new Date(endYear, endMonth - 1, endDay);
                        stayDatee = endDate;
                        d = {
                            start: startDateFinal,
                            end: endDateFinal
                        };
                        date = d;
                    }
                } else {
                    var stDate = sessionData.start;
                    var startDay = stDate.substring(0, 2);
                    var startMonth = stDate.substring(3, 5);
                    var startYear = stDate.substring(6, 11);
                    startDateFinal = new Date(startYear, startMonth - 1, startDay);
                    stayDates = stDate;
                    var endDate = sessionData.end;
                    var endDay = endDate.substring(0, 2);
                    var endMonth = endDate.substring(3, 5);
                    var endYear = endDate.substring(6, 11);
                    endDateFinal = new Date(endYear, endMonth - 1, endDay);
                    stayDatee = endDate;
                    d = {
                        start: startDateFinal,
                        end: endDateFinal
                    };
                    date = d;
                }
                var dateDiff = Math.abs(date.start - date.end) / 86400000;
                if (dateDiff == 0) {
                    $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie mozna dokonać rezerwacji dla wybranej daty, wymagane spędzenie przynajmniej jednej nocy!<strong></p></div>");
                    return false;
                }
                var busy = Rooms.findOne({
                    _id: this.roomid
                });
                var owner = busy.owner;
                for (var i = 0; i < busy.busy.length; i++) {
                    if (busy.busy[i].start >= startDateFinal && busy.busy[i].end <= endDateFinal) {
                        $("#resData").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie mozna dokonać rezerwacji dla wybranej daty<strong></p></div>");
                        return false;
                    }
                }
                var mailto = Meteor.users.findOne({
                    _id: owner
                });
                var to = mailto.profile.mail;
                var from = resData.mail;
                var subject = "Nowa rezerwacja dla Twojej oferty " + of.title;
                var subject2 = "Dokonałeś rezerwacji dla oferty " + of.title;
                var text = "Masz nowa rezerwacje w pokoju " + busy.type + " " + busy.howMany + "-osobowym w ramach oferty " + of.title + "\n Dane rezerwującego:\nImię i nazwisko: " + resData.name + " " + resData.surname + "\n Adres zamieszkania: " + resData.street + " " + resData.number + " " + resData.postCode + " " + resData.city + "\n Telefon kontaktowy: " + resData.phone + "\n Rezerwacja od: " + stayDates + " do: " + stayDatee;
                var text2 = "Dokonałeś rezerwacji w pokoju " + busy.type + " " + busy.howMany + "-osobowym w ramach oferty " + of.title + "\n Twoje dane:\nImię i nazwisko: " + resData.name + " " + resData.surname + "\n Adres zamieszkania: " + resData.street + " " + resData.number + " " + resData.postCode + " " + resData.city + "\n Telefon kontaktowy: " + resData.phone + "\n Rezerwacja od: " + stayDates + " do: " + stayDatee;

                mailData = {
                    to: to,
                    from: from,
                    subject: subject,
                    subject2: subject2,
                    text: text,
                    text2: text2
                };
                var allData = {
                    resData: resData,
                    mail: mailData,
                    owner: owner,
                    date: date,
                };
                d = Session.get("filterParams");
                if (d.dateDiff != undefined && d.dateDiff != 0)
                    price = d.dateDiff * parseInt(this.price);
                Session.set("reservationDataWithPay", allData);
                Session.set("price", price);

                Router.go("paypal");
            }
        }
    },
    'click #back': function () {
        history.back();
    }
});
Template.reservation.helpers({
    offertitle: function (id) {
        of = Offers.findOne({
            _id: id
        });
        return of;
    },
    room: function (id) {
        return Rooms.findOne({
            _id: id
        });
    },
    stay: function () {
        var data = Session.get("filterParams");
        if (data == undefined || data.start == undefined || data.end == undefined || data.dateDiff == 0)
            return false;
        else
            return true;
    },
    time: function () {
        return Session.get("filterParams");
    },
    priceData: function (pr) {
        var data = Session.get("filterParams");
        data.priceAll = data.dateDiff * parseInt(pr);
        price = data.priceAll;
        return price;
    },
    priceData2: function (pr) {
        dep.depend();

        var dateSt = $("#start").val();
        var dateEnd = $("#end").val();
        if (dateSt != "" && dateSt != undefined && dateEnd != "" && dateEnd != undefined) {
            var DateDay = dateSt.substring(0, 2);
            var DateMonth = dateSt.substring(3, 5);
            var DateYear = dateSt.substring(6, 11);
            var DateFinal = new Date(DateYear, DateMonth - 1, DateDay);
            var DateDayE = dateEnd.substring(0, 2);
            var DateMonthE = dateEnd.substring(3, 5);
            var DateYearE = dateEnd.substring(6, 11);
            var DateFinalEnd = new Date(DateYearE, DateMonthE - 1, DateDayE);
            var dateDiff = Math.abs(DateFinal - DateFinalEnd) / 86400000;
            price = parseInt(pr) * dateDiff;
            return price;
        } else
            return 0;
    }
});
var func = function () {
    dep.changed();
}
Template.reservation.onRendered(
    function () {
        price = undefined;
        this.autorun(function (a) {
            var data = Template.currentData(this.view);
            if (!data)
                return;
            var offerdata = Offers.findOne({
                _id: data.owner
            });
            offer = {
                start: offerdata.startDate,
                end: offerdata.endDate
            };
            offerLength = offer;
            var roomData = Rooms.findOne({
                _id: data.roomid
            });

            for (var i = 0; i < roomData.busy.length; i++)
                disabledDates.push(roomData.busy[i]);
            $('.input-daterange').datepicker({
                startDate: "today",
                clearBtn: true,
                language: "pl",
                todayHighlight: true,
                toggleActive: true,
                autoclose: true,
                beforeShowDay: disableDates,
                format: "dd-mm-yyyy"
            });
        });
    }
);
var disableDates = function (date) {
    var currentDate = date;
    if (currentDate < offerLength.start || currentDate > offerLength.end)
        return false;
    for (var i = 0; i < disabledDates.length; i++) {
        if (currentDate >= disabledDates[i].start && currentDate <= disabledDates[i].end)
            return false;
    }
};