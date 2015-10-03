associatedTags = function(tags) {
  if(!Meteor.user())
    throw new Meteor.Error(403, 'You must be authenticated.');

  var associations = [];

  tags.forEach(function(tag) {
    associations = associations.concat(Collections.tagAssociations.find({
      tags: tag
    }).fetch());
  });


  var tagsArray = _.map(associations, function(i){ return i.tags});
  var associated = _.flatten(tagsArray, true);
  associated = _.without.apply(this, [associated].concat(tags));
  associated = _.countBy(associated, function(a){return a;});
  associated = Object.keys(associated).sort(function(a,b){return associated[b]-associated[a]});
  /*var givenTagIndex = tags.indexOf(tag);
  if(givenTagIndex > -1)
    tags.splice(givenTagIndex, 1);*/

  return associated;
}

Meteor.methods({
  addTag: function(tag, linkedTag) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    var tagTab = [tag, linkedTag];

    var exists = Collections.tagAssociations.findOne({
      tags: {
        $all: tagTab
      }
    });

    if(exists) {
      Collections.tagAssociations.update({
        _id: exists._id
      }, {
        $set: {
          score: exists.score+1
        }
      });
    } else {
      Collections.tagAssociations.insert({
        tags: tagTab,
        score:1
      });
    }


  },
  associatedTags: function(tag) {

  }
});
