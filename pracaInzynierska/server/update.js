Meteor.methods({
    updateRoom: function (o, imagesArray) {
        Rooms.update({
            _id: o.id
        }, {
            $set: {
                region: o.region,
                street: o.street,
                number: o.number,
                postCode: o.postCode,
                city: o.city,
                howMany: o.howMany,
                type: o.type,
                desc: o.desc
            }
        });
        for (var s = 0; s < imagesArray.length; s++) {
            Images.update({
                _id: imagesArray[s]
            }, {
                $set: {
                    owner: o.id
                }
            });
        }
    },
    updateOffer: function (o, id, selected, price, rooms) {
        if (o.startDate != undefined) {
            Offers.update({
                _id: id
            }, {
                $set: {
                    title: o.title,
                    desc: o.desc,
                    phone: o.phone,
                    startDate: o.startDate,
                    endDate: o.endDate
                }
            });
        } else {
            Offers.update({
                _id: id
            }, {
                $set: {
                    title: o.title,
                    desc: o.desc,
                    phone: o.phone,
                }
            });
        }
        for (var i = 0; i < selected.length; i++) {
            Offerrooms.insert({
                owner: id,
                roomid: selected[i],
                price: price[i]
            });
        }
        for (var i = 0; i < rooms.length; i++) {
            Offerrooms.update({
                _id: rooms[i].id
            }, {
                $set: {
                    price: rooms[i].price
                }
            });
        }

    },
    editprofile: function (data, id) {
        Meteor.users.update({
            _id: id
        }, {
            $set: {
                'profile.name': data.name,
                'profile.surname': data.surname,
                'profile.mail': data.mail,
                'profile.PESEL': data.PESEL,
                'profile.street': data.street,
                'profile.number': data.number,
                'profile.postCode': data.postCode,
                'profile.city': data.city
            }
        });
    }
});