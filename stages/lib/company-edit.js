canEditCompany = function(userId, company) {
  //The user can edit the company if
  //he is the creator
  if(company.creator == userId) return true;

  //or he has an experience in this company
  var experience = Collections.experiences.findOne({
    company: company._id,
    user:userId
  });
  return experience != undefined; //true if the experience exists
}

canDeleteCompany = function(userId, company) {
  //the user can delete the company only if he is the creator and there is no experience
  var experience = Collections.experiences.findOne({
    company: company._id,
  });
  return experience == undefined && company.creator == userId;
}

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
    company.creator = Meteor.userId();
    Collections.companies.insert(company);
  },
  updateCompany: function(company) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    if(!canEditCompany(Meteor.userId(), company))
      throw new Meteor.Error(403, 'You have no right to edit this company.');



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


  },
  deleteCompany: function(company) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    if(!canDeleteCompany(Meteor.userId(), company))
      throw new Meteor.Error(403, 'You have no right to delete this company.');

    Collections.companies.remove({
      _id: company._id
    });
  }
});
