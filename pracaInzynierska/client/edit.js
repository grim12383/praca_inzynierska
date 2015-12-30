var j = 0;
var imagesArray = [];
var disabledDates = [];
Template.edit.helpers({
    images: function (id) {
        return Images.find({
            owner: id
        });
    }
});
Template.edit.events({
    'click #delimg': function () {
        console.log(this._id);
        Meteor.call("deleteImg", this._id);
    },
    'change #file': function (event, template) {
        var files = event.target.files;
        for (var g = 0, ln = files.length; g < ln; g++) {
            var r = Images.insert(files[g]);
            imagesArray.push(r._id);
        }
    },
    'click #add': function () {
        var stDate = $("#start").val();
        var startDay = stDate.substring(0, 2);
        var startMonth = stDate.substring(3, 5);
        var startYear = stDate.substring(6, 11);
        var startDateFinal = new Date(startYear, startMonth - 1, startDay);
        var endDate = $("#end").val();
        var endDay = endDate.substring(0, 2);
        var endMonth = endDate.substring(3, 5);
        var endYear = endDate.substring(6, 11);
        var endDateFinal = new Date(endYear, endMonth - 1, endDay);
        data = {
            start: startDateFinal,
            end: endDateFinal
        };
        var upddata = Rooms.update(this._id, {
            '$push': {
                busy: data
            }
        });
        if (upddata) {

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
    'click #update': function () {
        updateData = {
            id: this._id,
            region: $("#region").val(),
            street: $("#street").val(),
            postCode: $("#postcode").val(),
            city: $("#city").val(),
            howMany: $("#howMany").val(),
            desc: $("#desc").val(),
            type: $("#type").val()
        };

        Meteor.call("updateRoom", updateData, imagesArray);
        Router.go('roomDetails', {
            _id: this._id
        });
    }
});
Template.edit.onRendered(
    function () {
        $('#desc').wysihtml5({
            "link": false,
            "image": false,
        });
        $(".gallery").justifiedGallery({
            rowHeight: 70,
            lastRow: 'nojustify',
            margins: 3
        });
        this.autorun(function (a) {
            var data = Template.currentData(this.view);
            if (!data) return;
            for (var i = 0; i < data.busy.length; i++)
                disabledDates.push(data.busy[i]);
            $('.input-daterange').datepicker({
                startDate: "today",
                clearBtn: true,
                language: "pl",
                todayHighlight: true,
                toggleActive: true,
                beforeShowDay: disableDates,
                format: "dd-mm-yyyy"
            });
        });
    }
);
var disableDates = function (date) {
    var currentDate = date;
    for (var i = 0; i < disabledDates.length; i++) {
        if (currentDate >= disabledDates[i].start && currentDate <= disabledDates[i].end)
            return false;
    }
};