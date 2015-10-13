Template.hotelItem.helpers({
    whichType: function () {
        if (this.typ == "Hotel")
            return true;
        else
            return false;
    },
    rooms: function (id) {
        return Rooms.find({
            wlasciciel: id
        });
    },
    images: function (id) {
        return Images.findOne({
            wlasciciel: id
        });
    }
});