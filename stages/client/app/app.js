Meteor.subscribe('publicUsers');
Meteor.subscribe('companies');
Meteor.subscribe('experiences');
Meteor.subscribe('tagAssociations');

Meteor.startup(function() {
  GoogleMaps.load();

  moment.locale("fr");

  jQuery.extend( jQuery.fn.pickadate.defaults, {
      monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
      monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
      weekdaysFull: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
      weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
      today: 'Aujourd\'hui',
      clear: '',
      close: 'Fermer',
      firstDay: 1,
      format: 'dd mmmm yyyy',
      formatSubmit: 'yyyy/mm/dd',
      labelMonthNext:"Mois suivant",
      labelMonthPrev:"Mois précédent",
      labelMonthSelect:"Sélectionner un mois",
      labelYearSelect:"Sélectionner une année"
  });

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
