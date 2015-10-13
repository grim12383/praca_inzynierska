Meteor.methods({
    removeRooms: function (id) {
        Rooms.remove({
            wlasciciel: id
        });
        Images.remove({
            wlasciciel: id
        });
        Offers.remove(id);
    }
});