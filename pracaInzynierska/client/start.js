Template.start.helpers({
    users: function () {
        var lastusers = [];
        var data = Meteor.users.find().fetch();
        for (var i = 1; i < 6; i++) {
            if (data[data.length - i] != undefined)
                lastusers.push(data[data.length - i]);
        }
        return lastusers;
    },
    offers: function () {
        var lastoffers = [];
        var data = Offers.find().fetch();
        for (var i = 1; i < 6; i++) {
            if (data[data.length - i] != undefined)
                lastoffers.push(data[data.length - i]);
        }
        return lastoffers;
    }
});
Meteor.startup(function () {
    document.title = "Oferty hotelowe";
});