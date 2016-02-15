var uploadFile = function(event, template) {
  template.photoUploading.set(true);
  FS.Utility.eachFile(event, function(file) {
    $('.file-path').val(file.name)
    var fileObj = Images.insert(file, function(err, obj) {
        template.photo.set(obj._id);
        template.photoUploading.set(false);
    });
  });
}

Template.companyEdit.events({
  'change .file': function(event, template) {
    uploadFile(event, template);
  },
  // Catch the dropped event
  'dropped #dropzone': function(event, template) {
    event.stopPropagation();
    event.preventDefault();
    uploadFile(event, template);
  },
  'dragover .upload-zone' : function(e,t) {
    e.preventDefault();
  },
  'click .company-edit .submit' : function() {
    var template = Template.instance();

    //Création de l'objet
    var company = {
      name: $('.company-edit .name').val(),
      description: $('.company-edit .description').val(),
      address: $('.company-edit .address').val(),
      size: $('.company-edit .size option:selected').val(),
      website: $('.company-edit .website').val()
    };

    //On prend la photo si elle a été uploadé
    if(template.photo.get())
      company.photo = template.photo.get();

    //Validation de l'objet
    Collections.companies.simpleSchema().clean(company);
    if(Collections.companies.simpleSchema().namedContext().validate(company)) {
      if(template.data) { //En cas de mise à jour
        company._id = template.data._id;
        Meteor.call('updateCompany', company);
      } else { //En cas d'insertion
        company._id = Meteor.uuid();
        Meteor.call('insertCompany', company);
      }
      Router.go('/company/' + company._id);
    } else {
      console.log(Collections.companies.simpleSchema().namedContext().invalidKeys());
    }

  },
  'click .dropzone .btn' : function() {
    $('.dropzone input').click();
  },
  'click .before-button': function() {
    if(Template.instance().data)
      Router.go('/company/'+Template.instance().data._id);
    else
      Router.go('/');
  }
});

Template.companyEdit.created = function () {
  this.photo = new ReactiveVar(undefined);
  this.photoUploading = new ReactiveVar(false);

  if(this.data && this.data.photo)
    this.photo.set(this.data.photo);
};

Template.companyEdit.rendered = function() {
  $('select').material_select();
}


Template.companyEdit.helpers({
  'img' : function() {
    var obj = Images.findOne({_id: Template.instance().photo.get()});
    if(obj)
      return obj.url();
    return '/img/question.png';
  },
  'imgUploadProgress' : function() {
    return Template.instance().photoUploading.get();
  },
  'activeClass' : function(obj) {
    return (obj == undefined) ? '' : 'active';
  },
  validState : function(name) {
    var errors = Collections.companies.simpleSchema().namedContext().invalidKeys();
    var n = name;
    var error = _.find(errors, function(i){return i.name == n});
    if(error == undefined)
      return 'valid';
    else
      return 'invalid';
  },
  isSizeOptionSelected: function(val) {
    if(Template.instance().data == undefined) {
      return (val == undefined) ? 'selected' : '';
    }
    return (val == Template.instance().data.size) ? 'selected' : '';
  },
  updateForm: function() {
    return (Template.instance().data != undefined);
  }
});
