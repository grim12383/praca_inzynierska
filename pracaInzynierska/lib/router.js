Router.route('main', {
    path: '/'
});
Router.route('paypal', {
    path: '/paypal'
});
Router.route('changepw', {
    path: '/changepw',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('myprofile', {
    path: '/myprofile',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('login', {
    path: '/login'
});
Router.route('register', {
    path: '/register'
});
Router.route('hotelForm', {
    path: '/hotelForm',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('editprofile', {
    path: '/editprofile',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('roomDetails', {
    path: '/roomDetails/:_id',
    data: function () {
        return Rooms.findOne({
            _id: this.params._id
        });
    }
});
Router.route('offerDetails', {
    path: '/offerDetails/:_id',
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('myOffers', {
    path: '/myOffers',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('myRooms', {
    path: '/myRooms',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('myreservations', {
    path: '/myreservations',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});
Router.route('editOffer', {
    path: '/editOffer/:_id',
    before: function () {
        var data = Offers.findOne(this.params._id);
        if (Meteor.userId() != data.owner) {
            this.redirect('main');
        } else {
            this.next();
        }
    },
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('edit', {
    path: '/edit/:_id',
    before: function () {
        var data = Rooms.findOne(this.params._id);
        if (Meteor.userId() != data.owner) {
            this.redirect('main');
        } else {
            this.next();
        }
    },
    data: function () {
        return Rooms.findOne(this.params._id);
    }
});
Router.route('reservation', {
    path: '/reservation/:_id',
    data: function () {
        return Offerrooms.findOne(this.params._id);
    }
});
Router.route('roomForm', {
    path: '/roomForm',
    before: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
});