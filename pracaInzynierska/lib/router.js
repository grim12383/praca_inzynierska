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
Router.route('hotelDetails', {
    path: '/hotelDetails/:_id',
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('edit', {
    path: '/edit/:_id',
    data: function () {
        return Offers.findOne(this.params._id);
    }
});
Router.route('/myOffers', function () {
    this.render('myOffers');
});