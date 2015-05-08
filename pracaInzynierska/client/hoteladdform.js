var i = 0;
var s = "Hotel";
var dep = new Deps.Dependency();
Template.hotelForm.events({
    'click #addRoom': function () {
        var id = i + 1;
        $('#row').before('<div class="row" id=' + id +
            '><div class="col-md-3">Rodzaj pokoju : <select id="typeRoom"><option value="1">1 osobowy</option><option value="2">2 osobowy</option><option value="3">3 osobowy</option><option value="4">4 osobowy</option><option value="5">5 osobowy</option><option  value="6">6 osobowy</option></select></div><div class="col-md-2"><input type="text" class="form-control" placeholder="Cena za dobę" id="price" required></div></div>');
        i++;
        $('#removeRoom').removeAttr('disabled');

    },
    'click #removeRoom': function () {
        $('#' + i).remove();
        i--;
        if (i == 0)
            $('#removeRoom').attr('disabled', 'disabled');
    },
    'change #type': function () {
        s = $('#type option:selected').text();
        for (var z = 0; z <= i; z++)
            $('#' + z).remove();
        func();
        console.log(s);
    },
    'click #clear': function () {
        $("input[type=text], textarea").val("");
    },
    'click #send': function () {
        if (s == "Osoba prywatna") {
            var adres = $("#adres_pr").val();
            var adres2 = $("#adres2_pr").val();
            var pokoj = $("#typeRoom2").val();
            var cena = $("#price_pr").val();
            var opis = $("#desc").val();
            var wlasciciel = Meteor.userId();
            Offers.insert({
                wlasciciel: wlasciciel,
                typ: s,
                adres: adres,
                adres2: adres2,
                opis: opis,
                pokoj: [
                    pokoj],
                cena: [
                        cena
                    ]
            });
            alert("Pomyślnie dodano oferte");
        } else {
            var nazwa = $("#hotelName").val();
            var adres = $("#adres").val();
            var adres2 = $("#adres2").val();
            var pokoj = $("#typeRoom").val();
            var cena = $("#price").val();
            var opis = $("#desc").val();
            var wlasciciel = Meteor.userId();
            Offers.insert({
                wlasciciel: wlasciciel,
                typ: s,
                nazwa: nazwa,
                adres: adres,
                adres2: adres2,
                opis: opis
            });
            var offerta = Offers.findOne({
                adres: adres
            });
            var tabcena = [];
            var tabpokoj = [];
            for (var z = 0; z <= i; z++) {
                var pokoj = $('#' + z).find('#typeRoom').val();
                var cena = $('#' + z).find('#price').val();
                tabcena.push(cena);
                tabpokoj.push(pokoj);
            }
            Offers.update({
                _id: offerta._id
            }, {
                $push: {
                    pokoj: {
                        $each: tabpokoj
                    }
                }
            });
            Offers.update({
                _id: offerta._id
            }, {

                $push: {
                    cena: {
                        $each: tabcena
                    }
                }
            });

        }
    }
});
Template.hotelForm.helpers({
    selIndex: function () {
        dep.depend();
        if (s == "Hotel")
            return true;
        else
            return false;
    }
});
var func = function () {
    dep.changed();
}