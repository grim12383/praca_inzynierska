Template.myOffers.helpers({
    myHotels: function () {
        return Offers.find({
            wlasciciel: Meteor.userId()
        });
    }
});