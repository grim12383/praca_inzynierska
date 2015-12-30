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
        offerdetails = {
            title: $('#title').val(),
            desc: $('#desc').val(),
            phone: $('#phone').val(),
            startDate: $('#start').val(),
            endDate: $('#end').val(),
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
        todayHighlight: true,
        toggleActive: true,
        format: "dd-mm-yyyy"
    });
});