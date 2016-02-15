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

    var update = {'$set' : company};

    //Si on a enlevé le champ site internet
    if(!company.website) {
      Collections.companies.update(company._id, {
        '$set': company,
        '$unset': {website: 1}
      });
    } else {
      if (company.website.substring(0, 4) != "http") {
          company.website = "http://" + company.website;
      }
      Collections.companies.update(company._id, {
        '$set': company,
      });
    }


  }
});
