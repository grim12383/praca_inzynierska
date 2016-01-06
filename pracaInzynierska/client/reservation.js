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
            surname: $("#surname").val(),
            PESEL: $("#pesel").val(),
            phone: $("#phone").val(),
            street: $("#street").val(),
            number: $("#number").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            roomid: this.roomid,
            id: data._id
        }
        if (resData.name == "" || resData.surname == "" || resData.phone == "" || resData.street == "" || resData.number == "" || resData.postCode == "" || resData.city == "") {
            alert("Nie wypełniono");
        } else {
            console.log(this.roomid);
            Session.set("reservationData", resData);
            Meteor.defer(function () {
                Router.go('/choosedate/' + resData.roomid, {
                    _id: resData.roomid
                });
            });

        }
    }
});
var func = function () {
    dep.changed();
}