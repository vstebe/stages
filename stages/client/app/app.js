Meteor.startup(function() {
  GoogleMaps.load();
});

Template.registerHelper("companySizeLabel", function (code) {
    return CompanySize[code];
});

Template.mainLayout.events({
  'click nav .link-companies' : function() {
    Router.go('/');
  },
  'click nav .link-logout' : function() {
    Meteor.logout();
  }
});
