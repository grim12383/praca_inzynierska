Template.start.helpers({
    users: function () {
        var lastusers = [];
        var data = Meteor.users.find().fetch();
        for (var i = 1; i < 6; i++) {
            if (data[data.length - i] != undefined)
                lastusers.push(data[data.length - i]);
        }
        return lastusers;
    },
    offerImages: function () {
        var s = Images.find().fetch();
        var arr = [];
        for (var i = s.length - 1; i >= 0; i--) {
            var z = Offers.findOne(s[i].owner);
            if (arr.length < 5)
                if (z) {
                    s[i].title = z.title;
                    arr.push(s[i]);
                }
        }
        return arr;
    }
});
Meteor.startup(function () {
    document.title = "Oferty hotelowe";
});
Template.start.onRendered(
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