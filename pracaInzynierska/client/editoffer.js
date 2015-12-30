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
        updateDetails = {
            title: $('#title').val(),
            desc: $('#desc').val(),
            phone: $('#phone').val(),
            startDate: $('#start').val(),
            endDate: $('#end').val()
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
        $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').text(data.desc);
    });
});