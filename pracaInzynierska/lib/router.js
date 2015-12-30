Router.route('/', function () {
    this.render('home');
});
Router.route('/main', function () {
    this.render('main');
});
Router.route('/login', function () {
    this.render('login');
});
Router.route('/register', function () {
    this.render('register');
});
Router.route('/hotelForm', function () {
    this.render('hotelForm');
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
Router.route('/myOffers', function () {
    this.render('myOffers');
});
Router.route('editOffer', {
    path: '/editOffer/:_id',
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('edit', {
    path: '/edit/:_id',
    data: function () {
        return Rooms.findOne(this.params._id);
    }
});
Router.route('reservation', {
    path: '/reservation/:_id',
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('/roomForm', function () {
    this.render('roomForm');
});
Router.route('choosedate', {
    path: '/choosedate/:_id',
    data: function () {
        return Rooms.findOne({
            _id: this.params._id
        });
    }
});