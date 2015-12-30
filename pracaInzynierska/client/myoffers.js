Template.myOffers.helpers({
    myHotels: function () {
        return Offers.find({
            owner: Meteor.userId()
        });
    }
});