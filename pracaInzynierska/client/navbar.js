Template.navbar.helpers({
    isLoggedIn: function () {
        if (Meteor.userId() != null)
            return true;
        else
            return false;
    },
    haveRoom: function () {
        var o = Rooms.find({
            owner: Meteor.userId()
        }).fetch();
        if (o.length == 0)
            return false;
        else if (o.length > 0)
            return true;
    },
    haveOffer: function () {
        var o = Offers.find({
            owner: Meteor.userId()
        }).fetch();
        if (o.length == 0)
            return false;
        else if (o.length > 0)
            return true;
    },
    haveRes: function () {
        var o = Reservations.find({
            owner: Meteor.userId()
        }).fetch();
        if (o.length == 0)
            return false;
        else if (o.length > 0)
            return true;
    }
});
Template.navbar.events({
    'click #logout': function () {
        Meteor.logout();
    }
});