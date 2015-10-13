var region, city;
var dep = new Deps.Dependency();
var dep1 = new Deps.Dependency();
Template.main.events({
    'click #filter': function () {
        $("#filters").toggle();
    },
    'change #region': function () {
        region = $('#region option:selected').val();
        if (region == "all" || region == undefined)
            city = "all";
        func();
    },
    'change #city': function () {
        city = $('#city option:selected').val();
        func();
    }
});
Template.main.helpers({
    getExampleHotels: function () {
        dep.depend();
        console.log(region, ' ', city);
        if ((region == undefined || region == "all") && (city == undefined || city == "all")) {
            var ret = Offers.find();
            return ret;
        } else if (region != "all" && (city == "all" || city == undefined))
            return Offers.find({
                wojewodztwo: region
            });
        else if ((region != undefined && region != "all") && (city != "all" && city != undefined))
            return Offers.find({
                wojewodztwo: region,
                miasto: city
            })
    },
    getRegion: function () {
        var data = Offers.find().fetch();
        var regions = distinctDataRegion(data);
        return regions;
    },
    getCity: function () {
        dep.depend();
        console.log("wszedlem");
        if (region != "all" || region != undefined) {
            var data = Offers.find({
                wojewodztwo: region
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
            if (data[i].wojewodztwo == distData[z].wojewodztwo)
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
            if (data[i].miasto == distData[z].miasto)
                counter++;
        }
        if (counter == 0)
            distData.push(data[i]);
        else
            counter = 0;
    }
    return distData;

}
var func1 = function () {
    dep1.changed();
}
var func = function () {
    dep.changed();
}