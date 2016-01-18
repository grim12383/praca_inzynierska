Meteor.methods({
    addOffer: function (o, selected, prices, z) {
        var r = Offers.insert({
            owner: o.owner,
            title: o.title,
            phone: o.phone,
            startDate: o.startDate,
            endDate: o.endDate,
            desc: o.desc
        });
        Images.update({
            _id: z
        }, {
            $set: {
                owner: r
            }
        });
        for (var i = 0; i < selected.length; i++) {
            Offerrooms.insert({
                owner: r,
                roomid: selected[i],
                price: prices[i]
            });
        }
    },
    addUser: function (o) {
        return Accounts.createUser({
            username: o.login,
            password: o.password,
            profile: {
                mail: o.mail,
                name: o.name,
                surname: o.surname,
                PESEL: o.PESEL,
                street: o.street,
                number: o.number,
                postCode: o.postCode,
                city: o.city
            }
        });
    },
    addRoom: function (o, imagesArray) {
        var busy = [];
        var r = Rooms.insert({
            owner: o.owner,
            street: o.street,
            number: o.number,
            postCode: o.postCode,
            city: o.city,
            region: o.region,
            desc: o.desc,
            howMany: o.howMany,
            type: o.type,
            busy: busy
        });
        for (var s = 0; s < imagesArray.length; s++) {
            Images.update({
                _id: imagesArray[s]
            }, {
                $set: {
                    owner: r
                }
            });
        }
    },
    reservation: function (data, date, owner) {
        Reservations.insert({
            name: data.name,
            surname: data.surname,
            street: data.street,
            number: data.number,
            postCode: data.postCode,
            city: data.city,
            phone: data.phone,
            PESEL: data.PESEL,
            offer: data.id,
            room: data.roomid,
            start: date.start,
            end: date.end,
            owner: owner,
            res: data.resid
        });
        Rooms.update(data.roomid, {
            '$push': {
                busy: date
            }
        })
    }
});