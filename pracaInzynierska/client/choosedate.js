var disabledDates = [];
var offerLength, of;
Template.choosedate.onRendered(
    function () {
        this.autorun(function (a) {
            var offerdataid = Session.get("reservationData");
            var offerdata = Offers.findOne({
                _id: offerdataid.id
            });
            offer = {
                start: offerdata.startDate,
                end: offerdata.endDate
            };
            offerLength = offer;
            var data = Template.currentData(this.view);
            if (!data) {
                return;
            }
            for (var i = 0; i < data.busy.length; i++)
                disabledDates.push(data.busy[i]);
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
Template.choosedate.helpers({
    reservationData: function () {
        var data = Session.get("reservationData");
        return data;
    },
    offer: function (id) {
        of = Offers.findOne(id)
        return of;
    },
    room: function (id) {
        return Rooms.findOne(id);
    }
});
var disableDates = function (date) {
    var currentDate = date;
    if (currentDate < offerLength.start || currentDate > offerLength.end)
        return false;
    for (var i = 0; i < disabledDates.length; i++) {
        if (currentDate >= disabledDates[i].start && currentDate <= disabledDates[i].end)
            return false;
    }
};
Template.choosedate.events({
    "click #reserve": function () {
        var data = Session.get("reservationData");
        var stDate = $("#start").val();
        var startDay = stDate.substring(0, 2);
        var startMonth = stDate.substring(3, 5);
        var startYear = stDate.substring(6, 11);
        var startDateFinal = new Date(startYear, startMonth - 1, startDay);
        var endDate = $("#end").val();
        var endDay = endDate.substring(0, 2);
        var endMonth = endDate.substring(3, 5);
        var endYear = endDate.substring(6, 11);
        var endDateFinal = new Date(endYear, endMonth - 1, endDay);
        date = {
            start: startDateFinal,
            end: endDateFinal
        };
        var busy = Rooms.findOne({
            _id: data.roomid
        });
        var owner = busy.owner;
        for (var i = 0; i < busy.busy.length; i++) {
            if (busy.busy[i].start >= startDateFinal && busy.busy[i].end <= endDateFinal) {
                $("#resData").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Nie mozna dokonać rezerwacji dla wybranej daty<strong></p></div>");
                return false;
            }
        }
        var mailto = Meteor.users.findOne({
            _id: owner
        });
        var to = mailto.profile.mail;
        var from = Meteor.user().profile.mail;
        var subject = "Nowa rezerwacja dla Twojej oferty " + of.title;
        var text = "Masz nowa rezerwacje w pokoju " + busy.type + " " + busy.howMany + "-osobowym w ramach oferty " + of.title + "\n Dane rezerwującego:\nImię i nazwisko: " + data.name + " " + data.surname + "\n Adres zamieszkania: " + data.street + " " + data.number + " " + data.postCode + " " + data.city + "\n Telefon kontaktowy: " + data.phone + "\n Rezerwacja od: " + stDate + " do: " + endDate;
        Meteor.call("sendEmail", to, from, subject, text, function (error, result) {
            if (error)
                alert("dupa");
        });
        Meteor.call("reservation", data, date, owner, function (error, result) {
            if (error) {
                $("#resData").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podczas rezerwacji, spróbuj ponownie!<strong></p></div>");
            } else {
                $("#resData").before("<div class='alert alert-success'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Pomyślnie dokonano rezerwacji! Za chwile nastapi przeniesienie na stronę główną<strong></p></div>");
                setTimeout(function () {
                    Router.go("main");
                }, 5000);
            }
        });
    }
});