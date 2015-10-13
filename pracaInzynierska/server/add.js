Meteor.methods({
    addHotel: function (o, roomsArray, imagesArray) {
        var r = Offers.insert({
            wlasciciel: o.wlasciciel,
            nazwa: o.nazwa,
            typ: o.typ,
            ulica: o.ulica,
            kod: o.kod,
            miasto: o.miasto,
            wojewodztwo: o.wojewodztwo,
            telefon: o.telefon,
            opis: o.opis
        });
        for (var i = 0; i < roomsArray.length; i++) {
            Rooms.insert({
                wlasciciel: r,
                pokoj: roomsArray[i].pokoj,
                cena: roomsArray[i].cena
            });
            for (var s = 0; s < imagesArray.length; s++) {
                Images.update({
                    _id: imagesArray[s]
                }, {
                    $set: {
                        wlasciciel: r
                    }
                });
            }
        }
    },
    addPrivate: function (o, rooms, imagesArray) {
        var r = Offers.insert({
            wlasciciel: o.wlasciciel,
            typ: o.typ,
            ulica: o.ulica,
            kod: o.kod,
            miasto: o.miasto,
            wojewodztwo: o.wojewodztwo,
            telefon: o.telefon,
            opis: o.opis
        });
        Rooms.insert({
            wlasciciel: r,
            pokoj: rooms.pokoj,
            cena: rooms.cena
        });
        for (var s = 0; s < imagesArray.length; s++) {
            Images.update({
                _id: imagesArray[s]
            }, {
                $set: {
                    wlasciciel: r
                }
            });
        }
    }
});