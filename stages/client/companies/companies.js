Template.companies.helpers({
  'companies' : function() {
    var companies = Collections.companies.find().fetch();
    for(var i=0; i<companies.length; i++) {
      if(companies[i].photo){
        companies[i].photo = Images.findOne({_id: companies[i].photo});
      }else
          companies[i].photo = '#';
    }
    return companies;
  },
  'noCompany' : function() {
    return Collections.companies.find().fetch().length == 0;
  }
});

Template.companies.events({
  'click .company-card' : function(event) {
    Router.go('company', {_id: $(event.currentTarget).data('id')});
  },
  'click .create-company-button' : function() {
    Router.go('/company/edit')
  }
});

Template.companies.created = function() {
  window.document.title="Liste des entreprises";

}

Template.company.helpers({
  companyMapOptions: function() {
    var company = Collections.companies.findOne({_id: Template.instance().data._id});
    console.log(company);
    var template = Template.instance();
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      // Map initialization options
      return {
        center: new google.maps.LatLng(company.location.latitude, company.location.longitude),
        zoom: 12
      };
    }
  },
  'img' : function() {
    if(!Template.instance().data)
      return '/img/question.png';
    var obj = Images.findOne({_id: Template.instance().data.photo});
    if(obj)
      return obj.url();
    return '/img/question.png';
  },
  experiences: function() {
    return Collections.experiences.find({company: Template.instance().data._id});
  },
  hasField: function(field) {
    return Template.instance().data[field] != undefined;
  },
  canEditCompany: function() {
    return canEditCompany(Meteor.userId(), Template.instance().data);
  }
  ,
  canDeleteCompany: function() {
    return canDeleteCompany(Meteor.userId(), Template.instance().data);
  }
});

Template.company.events({
  'click .edit-company': function() {
    Router.go('/company/edit/' + Template.instance().data._id);
  },
  'click .add-experience': function() {
    Router.go('/experience/add/' + Template.instance().data._id);
  },
  'click .delete-company': function() {
    $('.delete-company-dialog').openModal();
  },
  'click .confirm-delete-company': function() {
    Meteor.call('deleteCompany', Template.instance().data, function() {
      Router.go('/');
    });

  }
});

Template.company.created = function() {
  var template = this;
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('companyMap', function(map) {
    // Add a marker to the map once it's ready
    template.marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

    var theMap = map.instance;

    Tracker.autorun(function() {
      var company = Collections.companies.findOne({_id: template.data._id});
      if(company.location) {
        template.marker.setPosition(new google.maps.LatLng(company.location.latitude, company.location.longitude));
        console.log(theMap);
        theMap.panTo(new google.maps.LatLng(company.location.latitude, company.location.longitude));
      }

      //score
      var experiences = Collections.experiences.find({company: template.data._id}).fetch();
      if(experiences.length > 0) {
        var sum = 0;
        experiences.forEach(function(e) {
          sum += e.ratings.general;
        });
        $('.rating').raty('set', {score: sum/experiences.length});
      }

    });
  });


  window.document.title = this.data.name;
};

Template.company.rendered = function() {
  $('.rating').raty({
    starType: 'i',
    readOnly: true,
    score: 0,
    size:4
  });
  $('.rating').fitText();

}
