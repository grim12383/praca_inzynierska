var monthArray = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
Template.myprofile.helpers({
    created: function () {
        var data = Meteor.user();
        var day = data.createdAt.getDate();
        var month = data.createdAt.getMonth();
        var year = data.createdAt.getFullYear();
        var hours = data.createdAt.getHours();
        var minutes = data.createdAt.getMinutes();
        return day + ' ' + monthArray[month] + ' ' + year + ' o godzinie ' + hours + ':' + minutes;
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
    room: function (id) {
        return Rooms.findOne({
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
    }
});