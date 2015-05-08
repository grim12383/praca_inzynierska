Template.navbar.helpers({
    isLoggedIn: function () {
        if (Meteor.userId() != null)
            return true;
        else
            return false;
    }
});
Template.navbar.events({
    'click #logout': function () {
        Meteor.logout();
    }
});