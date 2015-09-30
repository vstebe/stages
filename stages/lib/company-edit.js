var lookForLocation = function(company) {
  var googleData = Geo.geocode(company.address);
  if(googleData.length > 0) {
    company.location = {
      latitude: googleData[0].latitude,
      longitude: googleData[0].longitude
    }
  }
  return company;
}

Meteor.methods({
  insertCompany: function(company) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    if(Meteor.isServer) {
      company = lookForLocation(company);
    }
    Collections.companies.insert(company);
  },
  updateCompany: function(company) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    if(Meteor.isServer) {
      company = lookForLocation(company);
    }
    Collections.companies.update({_id: company._id}, {'$set' : company});
  }
});
