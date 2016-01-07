var j = 0;
var imagesArray = [];
Template.roomForm.events({
    'click #clear': function () {
        $("input[type=text], textarea").val("");
    },
    'click #send': function () {
        roomDetails = {
            street: $("#street").val(),
            number: $("#number").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            region: $("#region").val(),
            howMany: $("#howMany").val(),
            desc: $("#desc").val(),
            type: $("#type").val(),
            owner: Meteor.userId()
        }
        if (roomDetails.city == "" || roomDetails.number == "" || roomDetails.postCode == "" || roomDetails.city == "" || roomDetails.region == "" || roomDetails.howMany == "" || roomDetails.desc == "" || roomDetails.type == "") {
            $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wypełnij wszystkie wymagane pola!<strong></p></div>");
        } else if (isNaN(parseInt(roomDetails.howMany, 10))) {
            $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Podana wartość pola 'Maksymalna ilość osób' nie jest liczbą!<strong></p></div>");
        } else {
            Meteor.call("addRoom", roomDetails, imagesArray, function (err, res) {
                if (!err) {
                    Router.go('main');
                } else {
                    $(".errors").before("<div class='alert alert-error'>    <a href='#' class='close' data-dismiss='alert' style='padding-right:10px;'>&times;</a><p><strong>Wystapił błąd, spróbuj ponownie!<strong></p></div>");
                }
            });

        }
    },
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
    }
});
Template.roomForm.onRendered(function () {
    $('#desc').wysihtml5({
        "link": false,
        "image": false,
    });
});