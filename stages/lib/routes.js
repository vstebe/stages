Router.configure({
  layoutTemplate: 'mainLayout',
});
Router.route('companies', {
  path: '/'
});
Router.route('companyEdit', {
    path: '/company/edit/:_id?',
    data: function(){
        var currentCompany = this.params._id;
        return Collections.companies.findOne({ _id: currentCompany });
    }
});
Router.route('company', {
    path: '/company/:_id',
    data: function(){
        var currentCompany = this.params._id;
        return Collections.companies.findOne({ _id: currentCompany });
    }
});
Router.route('experienceEdit', {
    path: '/experience/add/:_id?',
    data: function(){
        var currentCompany = this.params._id;
        return {
          company: Collections.companies.findOne({ _id: currentCompany })
        };
    }
});
