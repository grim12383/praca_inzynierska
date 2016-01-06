Meteor.publish('rooms', function () {
    return Rooms.find();
});
Meteor.publish('offers', function () {
    return Offers.find();
});
Meteor.publish('offerrooms', function () {
    return Offerrooms.find();
});
Meteor.publish('images', function () {
    return Images.find();
});
Meteor.publish('reservations', function () {
    return Reservations.find();
});
Meteor.publish('users', function () {
    return Meteor.users.find();
});