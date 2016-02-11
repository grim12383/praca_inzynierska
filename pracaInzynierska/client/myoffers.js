Template.myOffers.helpers({
    myHotels: function () {
        return Offers.find({
            owner: Meteor.userId()
        }).fetch().reverse();
    },
    validoffers: function () {
        var data = Offers.find({
            owner: Meteor.userId()
        }).fetch();
        if (data.length != 0)
            return true;
        else
            return false;
    }
});