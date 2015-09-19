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
  }
});
