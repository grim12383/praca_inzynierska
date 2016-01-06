Template.hotelForm.events({
    'click #send': function () {
        var selected = [];
        $('#rooms input:checked').each(function () {
            selected.push($(this).val());
        });
        var prices = [];
        for (var i = 0; i < selected.length; i++) {
            var z = $('#' + selected[i]).val();
            prices.push(z);
        }
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
        offerdetails = {
            title: $('#title').val(),
            desc: $('#desc').val(),
            phone: $('#phone').val(),
            startDate: startDateFinal,
            endDate: endDateFinal,
            owner: Meteor.userId()
        }
        Meteor.call("addOffer", offerdetails, selected, prices);
        Router.go("main");
    },
    'click #clear': function () {
        $("input[type=text]").val("");
        $('#desc').data("wysihtml5").editor.clear();
        $("input[type=checkbox]").prop("checked", false);
    }
});
Template.hotelForm.helpers({
    rooms: function () {
        return Rooms.find({
            owner: Meteor.userId()
        });
    }
});
Template.hotelForm.onRendered(function () {
    $('#desc').wysihtml5({
        "link": false,
        "image": false
    });
    $('.input-daterange').datepicker({
        startDate: "today",
        clearBtn: true,
        language: "pl",
        autoclose: "true",
        todayHighlight: true,
        toggleActive: true,
        format: "dd-mm-yyyy"
    });
});