Template.app.events({
  'click .connect-button' : function() {
    Meteor.loginWithAres();
  },
  'click .disconnect-button' : function() {
    Meteor.logout();
  }
});
