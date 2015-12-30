var disabledDates = [];
Template.choosedate.onRendered(
    function () {
        this.autorun(function (a) {
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
        return Offers.findOne(id);
    },
    room: function (id) {
        return Rooms.findOne(id);
    }
});
var disableDates = function (date) {
    var currentDate = date;
    for (var i = 0; i < disabledDates.length; i++) {
        if (currentDate >= disabledDates[i].start && currentDate <= disabledDates[i].end)
            return false;
    }
};