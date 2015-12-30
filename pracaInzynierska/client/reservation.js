var dep = new Deps.Dependency();
Template.reservation.helpers({
    rooms: function (id) {
        var data = Offerrooms.find({
            owner: id
        }).fetch();
        var roomsList = [];
        for (var i = 0; i < data.length; i++) {
            roomsList.push(data[i].roomid);
        }
        return Rooms.find({
            _id: {
                $in: roomsList
            }
        });
    },
    roomprice: function (id) {
        dep.depend();
        var selectedItem = $("#rooms option:selected").val();
        return Offerrooms.findOne({
            owner: id,
            roomid: selectedItem
        });
    }
});
Template.reservation.events({
    'change #rooms': function () {
        func();
    },
    'click #date': function () {
        var data = Template.currentData(this.view);
        resData = {
            name: $("#name").val(),
            address: $("#address").val(),
            roomid: this.roomid,
            id: data._id
        }
        Session.set("reservationData", resData);
    }
});
var func = function () {
    dep.changed();
}