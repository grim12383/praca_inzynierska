var i = 0,
    j = 0;
var imagesArray = [];
var img = 0;
var idHotelu = null;
var s = "Hotel";
var dep = new Deps.Dependency();
Template.hotelForm.events({
    'change #file': function (event, template) {
        var files = event.target.files;
        for (var g = 0, ln = files.length; g < ln; g++) {
            var r = Images.insert(files[g], function (err, fileObj) {});
            imagesArray.push(r._id);
        }
    },
    'click #addImage': function () {
        j++;
        $('#imgrow').before('<div class="row" id=' + j + '><input type="file" id="file"></div>');
        if (j > 0 && j < 8) {
            $('#removeImage').removeAttr('disabled');
        } else if (j == 8) {
            $('#addImage').attr('disabled', 'disabled');
        }
    },
    'click #removeImage': function () {
        if (j == imagesArray.length) {
            Images.remove({
                _id: imagesArray[imagesArray.length - 1]
            });
            imagesArray.pop();
            $('#' + j).remove();
            j--;
        } else {
            $('#' + j).remove();
            j--;
        }
        if (j == 0) {
            $('#removeImage').attr('disabled', 'disabled');
        } else if (j > 0 && j < 8) {
            $('#addImage').removeAttr('disabled');
        }
    },
    'click #addRoom': function () {
        var id = i - 1;
        $('#row').before('<div class="row" id=' + id +
            '><div class="col-md-4">Rodzaj lokum : <input type="text" id="typeRoom"></div><div class="col-md-2"><input type="text" class="form-control" placeholder="Cena za dobę" id="price" required></div></div>');
        i--;
        $('#removeRoom').removeAttr('disabled');
    },
    'click #removeRoom': function () {
        $('#' + i).remove();
        i++;
        if (i == 0)
            $('#removeRoom').attr('disabled', 'disabled');
    },
    'change #type': function () {
        s = $('#type option:selected').text();
        for (var z = 0; z <= i; z++)
            $('#' + z).remove();
        func();
    },
    'click #clear': function () {
        $("input[type=text], textarea").val("");
    },
    'click #send': function () {
        if (s == "Osoba prywatna") {
            offerDetails = {
                ulica: $("#adres").val(),
                kod: $("#postcode").val(),
                miasto: $("#city").val(),
                typ: s,
                wojewodztwo: $("#region").val(),
                pokoj: $("#typeRoom").val(),
                cena: $("#price").val(),
                opis: $("#desc").val(),
                telefon: $("#phone").val(),
                wlasciciel: Meteor.userId()
            }
            hotelRooms = {
                pokoj: $('#typeRoom').val(),
                cena: $('#price').val()
            }
            Meteor.call("addPrivate", offerDetails, hotelRooms, imagesArray);
        } else {
            offerDetails = {
                nazwa: $("#hotelName").val(),
                ulica: $("#adres").val(),
                kod: $("#postcode").val(),
                miasto: $("#city").val(),
                typ: s,
                wojewodztwo: $("#region").val(),
                pokoj: $("#typeRoom").val(),
                cena: $("#price").val(),
                opis: $("#desc").val(),
                telefon: $("#phone").val(),
                wlasciciel: Meteor.userId()
            }
            var hotelArray = []
            for (var z = 0; z >= i; z--) {
                var pokoj = $('#' + z).find('#typeRoom').val();
                var cena = $('#' + z).find('#price').val();
                hotelRooms = {
                    pokoj: pokoj,
                    cena: cena
                }
                hotelArray.push(hotelRooms);
            }
            Meteor.call("addHotel", offerDetails, hotelArray, imagesArray);
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