var r;
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
        if (offerdetails.title == "" || offerdetails.desc == "" || offerdetails.phone == "" || offerdetails.startDate == "" || offerdetails.endDate == "" || selected.length == 0) {
            $(".errors").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wypełnij wszystkie wymagane pola!<strong></p></div>");
        } else {
            Meteor.call("addOffer", offerdetails, selected, prices, r._id, function (err, res) {
                if (!err) {
                    Router.go('main');
                } else {
                    $(".errors").html("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystąpił błąd podczas dodawania oferty, spróbuj ponownie!<strong></p></div>");
                }
            });
        }
    },
    'click #clear': function () {
        $("input[type=text]").val("");
        $('#desc').data("wysihtml5").editor.clear();
        $("input[type=checkbox]").prop("checked", false);
    },
    'change #file': function (event, template) {
        var files = event.target.files;
        for (var g = 0, ln = files.length; g < ln; g++) {
            r = Images.insert(files[g], function (err, fileObj) {});
        }
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
    r = undefined;
});