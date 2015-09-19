Template.companyEdit.events({
  'change .input': function(event, template) {
  var files = event.target.files;
  for (var i = 0, ln = files.length; i < ln; i++) {
    var fileObj = Images.insert(files[i], function(err, obj) {
      Collections.companies.update({_id : Collections.companies.findOne()._id}, {
        '$set' : {
          'photo' : obj._id
        }
      });
    });

  }
}
});

Template.companyEdit.helpers({
  'img' : function() {
    return Images.findOne().url();
  }
});
