var dateDiff = undefined,
    region = undefined,
    city = undefined,
    howMany = 1,
    dateSt = undefined,
    dateEnd = undefined;
var dep = new Deps.Dependency();
Template.main.onRendered(
    function () {
        $('.calendar').datepicker({
            autoclose: "true",
            startDate: "today",
            format: "dd-mm-yyyy",
            language: "pl"
        });
        dateDiff = undefined;
        region = undefined;
        city = undefined;
        howMany = 1;
        dateSt = undefined;
        dateEnd = undefined;
        delete Session.keys["filterParams"];
    }
);
Template.main.events({
    'change #region': function () {
        region = $('#region option:selected').val();
        city = "all";
        func();
    },
    'change #city': function () {
        city = $('#city option:selected').val();
        func();
    },
    'change #howMany': function () {
        howMany = $('#howMany').val();
        howMany = parseInt(howMany);
        func();
    },
    'change #start': function () {
        dateSt = $('#start').val();
        func();
    },
    'change #end': function () {
        dateEnd = $('#end').val();
        func();
    },
    'click #details': function () {
        data = {
            region: region,
            city: city,
            start: dateSt,
            end: dateEnd,
            dateDiff: dateDiff,
            howMany: howMany
        };
        Session.set("filterParams", data);
    }
});
Template.main.helpers({
    getActualHotels: function () {
        dep.depend();
        var offers = Offers.find().fetch();
        var tmp = [];
        var actualOffers = [];
        for (var i = 0; i < offers.length; i++) {
            var stDate = offers[i].startDate;

            var endDate = offers[i].endDate;

            var currentDate = new Date();
            if (currentDate >= stDate && currentDate <= endDate && (dateSt == undefined || dateSt == "")) {
                actualOffers.push(offers[i]);
            } else if (dateSt != undefined && dateSt != "") {
                var DateDay = dateSt.substring(0, 2);
                var DateMonth = dateSt.substring(3, 5);
                var DateYear = dateSt.substring(6, 11);
                var DateFinal = new Date(DateYear, DateMonth - 1, DateDay);
                var DateDayE = dateEnd.substring(0, 2);
                var DateMonthE = dateEnd.substring(3, 5);
                var DateYearE = dateEnd.substring(6, 11);
                var DateFinalEnd = new Date(DateYearE, DateMonthE - 1, DateDayE);
                dateDiff = Math.abs(DateFinal - DateFinalEnd) / 86400000;
                if ((DateFinal >= stDate && DateFinal <= endDate) && (DateFinalEnd >= stDate && DateFinalEnd <= endDate)) {
                    actualOffers.push(offers[i]);
                }
            }
        }
        if ((region == undefined || region == "all") && (city == undefined || city == "all") && (howMany == 1 || howMany == undefined)) {
            $("#city").attr("disabled", "disabled");
            return actualOffers;
        } else if ((region == undefined || region == "all") && (city == undefined || city == "all") && (howMany != 1 || howMany != undefined)) {
            $("#city").attr("disabled", "disabled");
            var actualOffers_id = [];
            var actualOffersHowMany = [];
            for (var i = 0; i < actualOffers.length; i++) {
                actualOffers_id.push(actualOffers[i]._id);
            }
            var actOfferrooms = Offerrooms.find({
                owner: {
                    $in: actualOffers_id
                }
            }).fetch();
            for (var i = 0; i < actOfferrooms.length; i++) {
                var roomHowMany = Rooms.findOne({
                    _id: actOfferrooms[i].roomid
                });
                if (parseInt(roomHowMany.howMany) >= howMany) {
                    var roomOffer = Offers.findOne({
                        _id: actOfferrooms[i].owner
                    });
                    var counter = 0;
                    for (var z = 0; z < actualOffersHowMany.length; z++) {
                        if (roomOffer._id == actualOffersHowMany[z]._id)
                            counter = counter + 1;
                    }
                    if (counter == 0)
                        actualOffersHowMany.push(roomOffer);
                }
            }
            return actualOffersHowMany;
        } else if (region != "all" && (city == "all" || city == undefined) && (howMany == 1 || howMany == undefined)) {
            $("#city").removeAttr("disabled");
            var actualOffers_id = [];
            var actualRegion = [];
            for (var i = 0; i < actualOffers.length; i++)
                actualOffers_id.push(actualOffers[i]._id);
            var roomsRegion = Offerrooms.find({
                owner: {
                    $in: actualOffers_id
                }
            }).fetch();
            for (var i = 0; i < roomsRegion.length; i++) {
                var roomRegion = Rooms.findOne({
                    _id: roomsRegion[i].roomid
                });
                if (roomRegion.region == region) {
                    var roomOffer = Offers.findOne({
                        _id: roomsRegion[i].owner
                    });
                    var counter = 0;
                    for (var z = 0; z < actualRegion.length; z++) {
                        if (roomOffer._id == actualRegion[z]._id)
                            counter = counter + 1;
                    }
                    if (counter == 0)
                        actualRegion.push(roomOffer);
                }


            }
            return actualRegion;
        } else if (region != "all" && (city == "all" || city == undefined) && (howMany != 1 || howMany != undefined)) {
            $("#city").removeAttr("disabled");
            var actualOffers_id = [];
            var actualRegion = [];
            for (var i = 0; i < actualOffers.length; i++)
                actualOffers_id.push(actualOffers[i]._id);
            var roomsRegion = Offerrooms.find({
                owner: {
                    $in: actualOffers_id
                }
            }).fetch();
            for (var i = 0; i < roomsRegion.length; i++) {
                var roomRegion = Rooms.findOne({
                    _id: roomsRegion[i].roomid
                });
                if (roomRegion.region == region && parseInt(roomRegion.howMany) >= howMany) {
                    var roomOffer = Offers.findOne({
                        _id: roomsRegion[i].owner
                    });
                    var counter = 0;
                    for (var z = 0; z < actualRegion.length; z++) {
                        if (roomOffer._id == actualRegion[z]._id)
                            counter = counter + 1;
                    }
                    if (counter == 0)
                        actualRegion.push(roomOffer);
                }


            }
            return actualRegion;
        } else if ((region != undefined && region != "all") && (city != "all" && city != undefined) && (howMany == 1 || howMany == undefined)) {
            $("#city").removeAttr("disabled");
            var actualCities = [];
            var actualRegion = [];
            var actualOffers_id = [];
            for (var i = 0; i < actualOffers.length; i++)
                actualOffers_id.push(actualOffers[i]._id);
            var roomsRegion = Offerrooms.find({
                owner: {
                    $in: actualOffers_id
                }
            }).fetch();
            for (var i = 0; i < roomsRegion.length; i++) {
                var roomRegionCity = Rooms.findOne({
                    _id: roomsRegion[i].roomid
                });
                if (roomRegionCity.region == region && roomRegionCity.city == city) {
                    var roomOffer = Offers.findOne({
                        _id: roomsRegion[i].owner
                    })
                    var counter = 0;
                    for (var z = 0; z < actualCities.length; z++)
                        if (roomOffer._id == actualCities[z]._id)
                            counter = counter + 1;
                    if (counter == 0) actualCities.push(roomOffer);
                }

            }

            return actualCities;
        } else if ((region != undefined && region != "all") && (city != "all" && city != undefined) && (howMany != 1 || howMany != undefined)) {
            $("#city").removeAttr("disabled");
            var actualCities = [];
            var actualRegion = [];
            var actualOffers_id = [];
            for (var i = 0; i < actualOffers.length; i++)
                actualOffers_id.push(actualOffers[i]._id);
            var roomsRegion = Offerrooms.find({
                owner: {
                    $in: actualOffers_id
                }
            }).fetch();
            for (var i = 0; i < roomsRegion.length; i++) {
                var roomRegionCity = Rooms.findOne({
                    _id: roomsRegion[i].roomid
                });
                if (roomRegionCity.region == region && roomRegionCity.city == city && parseInt(roomRegionCity.howMany) >= howMany) {
                    var roomOffer = Offers.findOne({
                        _id: roomsRegion[i].owner
                    })
                    var counter = 0;
                    for (var z = 0; z < actualCities.length; z++)
                        if (roomOffer._id == actualCities[z]._id)
                            counter = counter + 1;
                    if (counter == 0) actualCities.push(roomOffer);
                }

            }

            return actualCities;
        }

    },
    getRegion: function () {
        var data = Rooms.find().fetch();
        var regions = distinctDataRegion(data);
        return regions;
    },
    getCity: function () {
        dep.depend();
        if (region != "all" || region != undefined) {
            var data = Rooms.find({
                region: region
            }).fetch();
            var cities = distinctDataCity(data);
            return cities;
        }

    }
});
var distinctDataRegion = function (data) {
    var distData = [];
    var counter = 0;
    distData.push(data[0]);
    for (var i = 0; i < data.length; i++) {
        for (var z = 0; z < distData.length; z++) {
            if (data[i].region == distData[z].region)
                counter++;
        }
        if (counter == 0)
            distData.push(data[i]);
        else
            counter = 0;
    }
    return distData;
}
var distinctDataCity = function (data) {
    var distData = [];
    var counter = 0;
    distData.push(data[0]);
    for (var i = 0; i < data.length; i++) {
        for (var z = 0; z < distData.length; z++) {
            if (data[i].city == distData[z].city)
                counter++;
        }
        if (counter == 0)
            distData.push(data[i]);
        else
            counter = 0;
    }
    return distData;

}
var func = function () {
    dep.changed();
}