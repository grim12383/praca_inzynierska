Template.myreservations.helpers({
    res: function () {
        return Reservations.find({
            owner: Meteor.userId()
        });
    },
    room: function (id) {
        return Rooms.findOne({
            _id: id
        });
    },
    pesel: function () {
        if (this.PESEL == undefined || this.PESEL == "")
            return false;
        else
            return true;
    },
    st: function (date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        if (day < 10)
            return '0' + day + '-' + month + 1 + '-' + year;
        else if (day >= 10)
            return day + '-' + month + 1 + '-' + year;


    },
    end: function (date) {

        var eday = date.getDate();
        var emonth = date.getMonth();
        var eyear = date.getFullYear();
        if (eday < 10)
            return '0' + eday + '-' + emonth + 1 + '-' + eyear;
        else if (eday >= 10)
            return eday + '-' + emonth + 1 + '-' + eyear;
    },
    off: function (id) {
        return Offers.findOne({
            _id: id
        });
    },
    pr: function (oid, rid) {
        var s = Offerrooms.findOne({
            owner: oid,
            roomid: rid
        });
        return s;
    }
});