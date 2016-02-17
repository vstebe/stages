Meteor.methods({
  updateTagsNetwork: function(tags) {
    //Mise à jour réseau des tags
    for(var i=0; i<tags.length; i++) {
      for(var j=0; j<i; j++) {
        Meteor.call('addTag', tags[i], tags[j]);
      }
    }
  },
  insertExperience: function(experience) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    experience.user = Meteor.userId();

    Meteor.call("updateTagsNetwork", experience.tags);

    Collections.experiences.insert(experience);
  },

  updateExperience: function(experience) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    //Verification que l'auteur en est le propriétaire
    var experienceDb = Collections.experiences.findOne({_id: experience._id});
    if(experienceDb.user != Meteor.userId())
      throw new Meteor.Error(403, 'You don\'t own this experience');

    //Suppression de la précision si elle sert à rien
    if(experience.year != "other")
      experience.yearPrecision = '';

    Meteor.call("updateTagsNetwork", experience.tags);


    Collections.experiences.update({_id: experience._id}, {
      '$set' : experience
    });

  }
});
