var monthArray = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
Template.myreservations.helpers({
    res: function () {
        return Reservations.find({
            owner: Meteor.userId()
        }).fetch().reverse();
    },
    myres: function () {
        return Reservations.find({
            res: Meteor.userId()
        }).fetch().reverse();
    },
    offer: function (id) {
        return Offers.findOne({
            _id: id
        });
    },
    date: function () {
        var st = this.start;
        var ed = this.end;
        var day = st.getDate();
        var month = st.getMonth();
        var year = st.getFullYear();
        var eday = ed.getDate();
        var emonth = ed.getMonth();
        var eyear = ed.getFullYear();
        data = {
            startDate: day + ' ' + monthArray[month] + ' ' + year,
            endDate: eday + ' ' + monthArray[emonth] + ' ' + eyear
        };
        return data;
    },
    myreservations: function () {
        var data = Reservations.find({
            res: Meteor.userId()
        }).fetch();
        if (data.length != 0)
            return false;
        return true;
    },
    validres: function () {
        var data = Reservations.find({
            owner: Meteor.userId()
        }).fetch();
        if (data.length != 0)
            return true;
        else
            return false;
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
        return day + ' ' + monthArray[month] + ' ' + year;


    },
    end: function (date) {

        var eday = date.getDate();
        var emonth = date.getMonth();
        var eyear = date.getFullYear();
        return eday + ' ' + monthArray[emonth] + ' ' + eyear;
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