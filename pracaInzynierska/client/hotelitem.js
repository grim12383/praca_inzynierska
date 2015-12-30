Template.hotelItem.helpers({
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
    image: function (id) {
        var img = Images.find({
            owner: id
        }).fetch();
        return img[0];
    }
});