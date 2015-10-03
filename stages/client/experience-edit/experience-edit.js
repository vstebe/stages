Template.experienceEdit.helpers({
  company: function() {
    return Template.instance().data.company;
  }
});

Template.experienceEdit.events({
  'click .experience-edit .before-button': function() {
    Router.go('/company/' + Template.instance().data.company._id);
  },
  'click .experience-edit input[name="type"]' : function(e) {
    var type = $(e.currentTarget).attr('id');
    if(type == 'other')
      $('.experience-edit .precision').parent().fadeIn();
    else
      $('.experience-edit .precision').parent().fadeOut();
  }
});

Template.experienceEdit.rendered = function() {
  $('input[type="date"]').pickadate();
  $('.experience-rating').raty({
      starType: 'i',
      size:4,
    });

}
