Meteor.publish('publicUsers', function() {
  if(!this.user) return undefined;

  return Meteor.users.find({}, {fields: {'profile': 1}});

});
