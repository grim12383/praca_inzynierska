Template.offerDetails.helpers({
    rooms: function (id) {
        return Offerrooms.find({
            owner: id
        });
    },
    roomdetails: function (id) {
        return Rooms.find({
            _id: id
        });
    },
    isOwner: function () {
        if (this.owner == Meteor.userId())
            return true;
        return false;
    }
});
Template.offerDetails.events({
    'click #deloffer': function () {
        Meteor.call("delOffer", this._id);
        Router.go('main');
    }
});