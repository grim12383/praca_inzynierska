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
    },
    validrooms: function () {
        var data = Rooms.find({
            owner: Meteor.userId()
        }).fetch();
        if (data.length != 0)
            return true;
        else
            return false;
    }
});