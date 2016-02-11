Template.hotelItem.helpers({
    rooms: function (id) {
        return Offerrooms.find({
            owner: id
        });
    },
    roomdetails: function (id) {
        return Rooms.find({
            _id: id
        });
    },
    image: function (id) {
        var img = Images.find({
            owner: id
        });
        return img;
    },
    date: function () {
        var day = this.endDate.getDate();
        var month = this.endDate.getMonth() + 1;
        var year = this.endDate.getFullYear();
        if (month > 9 && day > 9)
            return day + "." + month + "." + year;
        else if (month <= 9 && day > 9)
            return day + ".0" + month + "." + year;
        else if (month > 9 && day <= 9)
            return "0" + day + "." + month + "." + year;
        else if (month <= 9 && day <= 9)
            return "0" + day + ".0" + month + "." + year;
    }
});
Template.hotelItem.events({
    'click #details': function () {
        Session.set("offerID", this._id);
    }
});
Template.hotelItem.onRendered(
    function () {
        self = this;
        initSwiper = function () {
            if (self.$('.swiper-container .swiper-slide').length > 0) {
                mySwiper = this.$('.swiper-container').swiper({
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    speed: 400,
                    spaceBetween: 100,
                    autoplay: 3000
                });
                setInterval(mySwiper.reInit, 800);
            } else {
                setTimeout(initSwiper, 100);
            }
        }
        initSwiper();
    }
);