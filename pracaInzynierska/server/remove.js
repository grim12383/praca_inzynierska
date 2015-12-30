Meteor.methods({
    delRoom: function (id) {
        Rooms.remove(id);
        Images.remove({
            owner: id
        });
        var tmp = Offerrooms.find({}).fetch();
        var counter = 0;
        for (var i = 0; i < tmp.length; i++) {
            counter = 0;
            for (var z = 0; z < tmp.length; z++) {
                if (tmp[i].owner == tmp[z].owner && i != z) {
                    counter = counter + 1;
                }
            }
            if (counter == 0) {
                Offers.remove(tmp[i].owner);
            }
        }
        Offerrooms.remove({
            roomid: id
        });
    },
    deleteImg: function (id) {
        Images.remove(id);
    },
    delOffer: function (id) {
        Offers.remove(id);
        Offerrooms.remove({
            owner: id
        });
    },
    delOfferroom: function (id) {
        Offerrooms.remove({
            _id: id
        });
    }
});