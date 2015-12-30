var j = 0;
var imagesArray = [];
Template.roomForm.events({
    'click #clear': function () {
        $("input[type=text], textarea").val("");
    },
    'click #send': function () {
        roomDetails = {
            street: $("#street").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            region: $("#region").val(),
            howMany: $("#howMany").val(),
            desc: $("#desc").val(),
            type: $("#type").val(),
            owner: Meteor.userId()
        }
        Meteor.call("addRoom", roomDetails, imagesArray);
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