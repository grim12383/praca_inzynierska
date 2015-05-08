Template.hotelItem.helpers({
    whichType: function () {
        if (this.typ == "Hotel")
            return true;
        else
            return false;
    }
});