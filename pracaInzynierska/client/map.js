Meteor.startup(function () {
    GoogleMaps.load();
});
Template.map.helpers({
    mapOptions: function () {
        if (GoogleMaps.loaded())
            return {
                zoom: 10,
                center: new google.maps.LatLng(52.2330649, 20.9207693)
            };
    }
});
Template.map.onCreated(function () {
    GoogleMaps.ready('roomsmap', function (map) {
        var markersArray = [];
        var geocoder = new google.maps.Geocoder();
        var data = Rooms.find().fetch();
        for (var i = 0; i < data.length; i++) {
            var address = data[i].street + ' ' + data[i].number + ' ' + data[i].city;
            var desc = data[i].type + ' ' + data[i].howMany + '-osobowy';
            geocoder.geocode({
                'address': address,
            }, function (desc, data) {
                return (function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        map.instance.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map.instance,
                            position: results[0].geometry.location
                        });
                        var infowindow = new google.maps.InfoWindow();
                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.setContent(desc);
                            infowindow.open(map.instance, marker);
                            map.panTo(marker.getPosition());
                        });
                    } else {
                        alert("Coś poszło nie tak");
                    }
                });
            }(desc, data));
        }
    });



});