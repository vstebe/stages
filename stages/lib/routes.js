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
Router.route('experienceAdd', {
    template: 'experienceEdit',
    path: '/experience/add/:_id?',
    data: function(){
        var currentCompany = this.params._id;
        return {
          company: Collections.companies.findOne({ _id: currentCompany })
        };
    }
});

Router.route('experienceEdit', {
    path: '/experience/edit/:_id?',
    data: function(){
        var experienceId = this.params._id;
        var experience = Collections.experiences.findOne({_id: experienceId});
        experience.company = Collections.companies.findOne({_id: experience.company});
        return experience;
    }
});
