var region, city, howMany, date;
var dep = new Deps.Dependency();
Template.main.onRendered(
    function () {
        $('.calendar').datepicker({
            autoclose: "true",
            startDate: "today",
            format: "dd-mm-yyyy",
            language: "pl"
        });
    }
);
Template.main.events({
    'click #filter': function () {
        $("#filters").toggle();
    },
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
        console.log(howMany);
        func();
    },
    'change #arrive': function () {
        date = $('#arrive').val();
        func();
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
            if (currentDate >= stDate && currentDate <= endDate && (date == undefined || date == "")) {
                actualOffers.push(offers[i]);
            } else if (date != undefined && date != "") {
                var DateDay = date.substring(0, 2);
                var DateMonth = date.substring(3, 5);
                var DateYear = date.substring(6, 11);
                var DateFinal = new Date(DateYear, DateMonth - 1, DateDay);
                if (DateFinal >= stDate && DateFinal <= endDate) {
                    actualOffers.push(offers[i]);
                }
            }
        }
        if ((region == undefined || region == "all") && (city == undefined || city == "all") && (howMany == 1 || howMany == undefined)) {
            return actualOffers;
        } else if ((region == undefined || region == "all") && (city == undefined || city == "all") && (howMany != 1 || howMany != undefined)) {
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