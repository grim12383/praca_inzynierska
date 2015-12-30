Meteor.methods({
    addOffer: function (o, selected, prices) {
        var r = Offers.insert({
            owner: o.owner,
            title: o.title,
            phone: o.phone,
            startDate: o.startDate,
            endDate: o.endDate,
            desc: o.desc
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
                address: o.address
            }
        });
    },
    addRoom: function (o, imagesArray) {
        var busy = [];
        var r = Rooms.insert({
            owner: o.owner,
            street: o.street,
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
    }
});