var roomsArray = [];
var bs = 0;
Template.offerDetails.helpers({
    rooms: function (id) {
        var data = Session.get("filterParams");
        var offerrooms = Offerrooms.find({
            owner: id
        }).fetch();
        if (data != undefined) {
            for (var i = 0; i < offerrooms.length; i++) {
                if (data.region == undefined || data.region == "all") {
                    var tmp = Rooms.findOne({
                        _id: offerrooms[i].roomid
                    });
                    if (parseInt(tmp.howMany) >= data.howMany)
                        roomsArray.push(offerrooms[i]);
                } else if ((data.region != undefined && data.region != "all") && (data.city == undefined || data.city == "all")) {
                    var tmp = Rooms.findOne({
                        _id: offerrooms[i].roomid
                    });
                    if (tmp.region == data.region && parseInt(tmp.howMany) >= data.howMany) {
                        roomsArray.push(offerrooms[i]);
                    }
                } else {
                    var tmp = Rooms.findOne({
                        _id: offerrooms[i].roomid
                    });
                    if (tmp.region == data.region && tmp.city == data.city && parseInt(tmp.howMany) >= data.howMany) {
                        roomsArray.push(offerrooms[i]);
                    }
                }
            }
            var retArray = roomsArray;
            roomsArray = [];
            return retArray;
        } else {
            return offerrooms;
        }
    },
    roomdetails: function (id) {
        return Rooms.find({
            _id: id
        });
    },
    isOwner: function () {
        if (this.owner == Meteor.userId())
            return true;
        return false;
    },
    isNotOwner: function () {
        var data = Offers.findOne({
            _id: this.owner
        });
        if (data.owner != Meteor.userId())
            return true;
        return false;
    },
    priceData: function (pr) {
        var data = Session.get("filterParams");
        data.priceAll = data.dateDiff * parseInt(pr);
        return data;
    },
    valid: function () {
        var data = Session.get("filterParams");
        if (data != undefined)
            if (data.dateDiff != undefined)
                return true;
            else
                return false;
    },
    image: function (id) {
        return Images.findOne({
            owner: id
        });
    },
    isBusy: function (id) {
        var sessiondata = Session.get("filterParams");
        if (sessiondata != undefined)
            if (sessiondata.start != undefined && sessiondata.end != undefined) {
                var startDay = sessiondata.start.substring(0, 2);
                var startMonth = sessiondata.start.substring(3, 5);
                var startYear = sessiondata.start.substring(6, 11);
                var startDateFinal = new Date(startYear, startMonth - 1, startDay);
                var endDay = sessiondata.end.substring(0, 2);
                var endMonth = sessiondata.end.substring(3, 5);
                var endYear = sessiondata.end.substring(6, 11);
                var endDateFinal = new Date(endYear, endMonth - 1, endDay);
                var data = Rooms.findOne({
                    _id: id
                });
                for (var i = 0; i < data.busy.length; i++) {
                    if ((data.busy[i].start <= startDateFinal && data.busy[i].end >= startDateFinal) || (data.busy[i].start <= endDateFinal && data.busy[i].end >= endDateFinal) || (data.busy[i].start >= startDateFinal && data.busy[i].end <= endDateFinal)) {
                        bs = 1;
                        return true;
                    }
                }
            }
        return false;
    }
});
Template.offerDetails.events({
    'click #deloffer': function () {
        Meteor.call("delOffer", this._id);
        Router.go('main');
    },
    'click #back': function () {
        history.back();
    }
});