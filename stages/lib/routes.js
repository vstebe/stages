Router.configure({
  layoutTemplate: 'mainLayout',
});
Router.route('companies', {
  path: '/'
});
Router.route('companyEdit', {
  path: '/edit'
});
Router.route('company', {
    path: '/company/:_id',
    data: function(){
        var currentCompany = this.params._id;
        return Collections.companies.findOne({ _id: currentCompany });
    }
});
