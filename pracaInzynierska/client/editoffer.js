Template.editOffer.events({
    'click #update': function () {
        var selected = [];
        $('#newrooms input:checked').each(function () {
            selected.push($(this).val());
        });
        var prices = [];
        for (var i = 0; i < selected.length; i++) {
            var z = $('#' + selected[i]).val();
            prices.push(z);
        }
        var existedrooms = [];
        $('#rooms input:text').each(function () {
            offerroom = {
                id: $(this).attr('id'),
                price: $(this).val()
            };
            existedrooms.push(offerroom);
        });
        var stDate = $("#start").val();
        var endDateFinal = undefined;
        var startDateFinal = undefined;
        if (stDate != "") {
            var startDay = stDate.substring(0, 2);
            var startMonth = stDate.substring(3, 5);
            var startYear = stDate.substring(6, 11);
            startDateFinal = new Date(startYear, startMonth - 1, startDay);
            var endDate = $("#end").val();
            var endDay = endDate.substring(0, 2);
            var endMonth = endDate.substring(3, 5);
            var endYear = endDate.substring(6, 11);
            endDateFinal = new Date(endYear, endMonth - 1, endDay);
        }
        updateDetails = {
            title: $('#title').val(),
            desc: $('#desc').val(),
            phone: $('#phone').val(),
            startDate: startDateFinal,
            endDate: endDateFinal
        }
        Meteor.call("updateOffer", updateDetails, this._id, selected, prices, existedrooms);
    },
    'click #delroom': function () {
        Meteor.call("delOfferroom", this._id);
    }
});
Template.editOffer.helpers({
    rooms: function () {
        return Offerrooms.find({
            owner: this._id
        });
    },
    roomdetails: function () {
        return Rooms.find({
            _id: this.roomid
        });
    },
    roomsadd: function () {
        return Rooms.find({
            owner: Meteor.userId()
        });
    }
});
Template.editOffer.onRendered(function () {
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
    this.autorun(function (a) {
        var data = Template.currentData(this.view);
        if (!data) return;
        var day = data.startDate.getDate();
        var month = data.startDate.getMonth();
        var year = data.startDate.getFullYear();
        var eday = data.endDate.getDate();
        var emonth = data.endDate.getMonth();
        var eyear = data.endDate.getFullYear();
        $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').text(data.desc);
    });
});