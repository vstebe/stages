Template.experienceEdit.helpers({
  company: function() {
    return Template.instance().data.company;
  },
  suggestedTags: function() {
    return associatedTags(Template.instance().currentTags.get());
  },
  hasSuggestedTags: function() {
    return associatedTags(Template.instance().currentTags.get()).length > 0;
  },
  currentTags: function() {
    return Template.instance().currentTags.get();
  },
  validState : function(name) {
    var errors = Collections.experiences.simpleSchema().namedContext().invalidKeys();
    var n = name;
    var error = _.find(errors, function(i){return i.name == n});
    if(error == undefined)
      return 'valid';
    else
      return 'invalid';
  },
  isValid : function(name) {
    var errors = Collections.experiences.simpleSchema().namedContext().invalidKeys();
    var n = name;
    var error = _.find(errors, function(i){return i.name == n});
    return error == undefined;
  },
});

Template.experienceEdit.events({
  'click .experience-edit .before-button': function() {
    Router.go('/company/' + Template.instance().data.company._id);
  },
  'click .experience-edit input[name="year"]' : function(e) {
    var type = $(e.currentTarget).attr('id');
    if(type == 'other')
      $('.experience-edit .year-precision').parent().fadeIn();
    else
      $('.experience-edit .year-precision').parent().fadeOut();
  },
  'click .experience-edit .suggested-tag': function(e) {
    var tag = $(e.currentTarget).text();
    Template.instance().currentTags.set(Template.instance().currentTags.get().concat(tag));
  },
  'click .experience-edit .delete-tag': function(e) {
    var tag = $(e.currentTarget).data('tag');
    Template.instance().currentTags.set(_.without(Template.instance().currentTags.get(), tag));
  },
  'keypress .experience-edit .new-tag': function(e) {
    if(e.charCode == 13) {
      var tag = $(e.currentTarget).val();
      Template.instance().currentTags.set(Template.instance().currentTags.get().concat(tag));
      $(e.currentTarget).val('');
    }
  },
  'click .experience-edit .experience-send' : function(e) {
    var experience = {
      year: $('.experience-edit [name="year"]:checked').attr('id'),
      dateStart: $('.experience-edit .date-start').val(),
      dateEnd: $('.experience-edit .date-end').val(),
      title: $('.experience-edit .title').val(),
      description: $('.experience-edit .description').val(),
      tags: Template.instance().currentTags.get(),
      ratings: {
        work: $('.experience-edit .work-rating').raty('score'),
        interest: $('.experience-edit .interest-rating').raty('score'),
        learning: $('.experience-edit .learning-rating').raty('score'),
        difficulty: $('.experience-edit .difficulty-rating').raty('score'),
        general: $('.experience-edit .general-rating').raty('score'),
      },
      comment: $('.experience-edit .comment').val()
    };
    console.log(experience);

    //Validation de l'objet
    Collections.experiences.simpleSchema().clean(experience);
    if(Collections.experiences.simpleSchema().namedContext().validate(experience)) {
      /*
      if(template.data) { //En cas de mise à jour
        company._id = template.data._id;
        Meteor.call('updateCompany', company);
      } else { //En cas d'insertion
        company._id = Meteor.uuid();
        Meteor.call('insertCompany', company);
      }
      Router.go('/company/' + company._id);*/
    } else {
      console.log(Collections.experiences.simpleSchema().namedContext().invalidKeys());
    }
  }
});

Template.experienceEdit.created = function() {
  this.currentTags = new ReactiveVar(['NodeJS']);
}

Template.experienceEdit.rendered = function() {
  $('input[type="date"]').pickadate();
  $('.experience-rating').raty({
      starType: 'i',
      size:4,
    });

}
