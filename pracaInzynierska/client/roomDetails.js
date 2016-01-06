var disabledDates = [];
Template.roomDetails.helpers({
    images: function (id) {
        return Images.find({
            owner: id
        });
    },
    isOwner: function () {
        if (this.owner == Meteor.userId())
            return true;
        return false;
    }
});
Template.roomDetails.events({
    'click #delroom': function () {
        Meteor.call("delRoom", this._id);
    }
});
Template.roomDetails.events({
    'click #delroom': function () {
        Meteor.call('delRoom', this._id);
        Router.go('main');
    }
});
Template.roomDetails.onRendered(
    function () {
        this.autorun(function (a) {
            var data = Template.currentData(this.view);
            if (!data) return;
            for (var i = 0; i < data.busy.length; i++)
                disabledDates.push(data.busy[i]);
            $('.calendar').datepicker({
                beforeShowDay: disableDates,
                startDate: "today",
                language: "pl"
            });
        });
        $(".gallery").justifiedGallery({
            rowHeight: 70,
            lastRow: 'nojustify',
            margins: 3
        });
    });
var disableDates = function (date) {
    var currentDate = date;
    for (var i = 0; i < disabledDates.length; i++) {
        if (currentDate >= disabledDates[i].start && currentDate <= disabledDates[i].end)
            return false;
    }
};