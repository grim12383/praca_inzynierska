Template.hotelDetails.helpers({
    rooms: function (id) {
        return Rooms.find({
            wlasciciel: id
        });
    },
    images: function (id) {
        return Images.find({
            wlasciciel: id
        });
    },
    whichType: function () {
        if (this.typ == "Hotel")
            return true;
        else
            return false;
    },
    isOwner: function () {
        if (Meteor.userId() == this.wlasciciel)
            return true;
        return false;
    }
});
Template.hotelDetails.events({
    'click #delete': function () {
        Meteor.call("removeRooms", this._id);
    }
});