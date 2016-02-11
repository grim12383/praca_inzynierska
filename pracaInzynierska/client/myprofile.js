var monthArray = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
Template.myprofile.helpers({
    created: function () {
        var data = Meteor.user();
        var day = data.createdAt.getDate();
        var month = data.createdAt.getMonth();
        var year = data.createdAt.getFullYear();
        var hours = data.createdAt.getHours();
        var minutes = data.createdAt.getMinutes();
        return day + ' ' + monthArray[month] + ' ' + year + ' o godzinie ' + hours + ':' + minutes;
    }
});