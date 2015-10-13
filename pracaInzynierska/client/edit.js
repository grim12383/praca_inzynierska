Template.edit.helpers({
    rooms: function (id) {
        return Rooms.find({
            wlasciciel: id
        });
    },
    images: function (id) {
        return Images.find({
            wlasciciel: id
        });
    },
    type: function (typ) {
        if (typ == "Hotel")
            return true;
        else
            return false;
    }
});
Template.edit.events({
    'click #delImage': function () {
        Images.remove(this._id);
    },
    'click #delRoom': function () {
        Rooms.remove(this._id);
    }
});