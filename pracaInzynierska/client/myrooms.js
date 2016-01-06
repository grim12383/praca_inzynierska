Template.myRooms.helpers({
    myrooms: function () {
        return Rooms.find({
            owner: Meteor.userId()
        });
    },
    image: function (id) {
        var img = Images.find({
            owner: id
        }).fetch();
        return img[0];
    }
});