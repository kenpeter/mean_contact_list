// angular
// module
// contact app
// with ng route
angular.module("contactsApp", ['ngRoute'])
  // .config
  // func
  // route provider
  .config(function($routeProvider) {
    // route provider
    $routeProvider
      // when
      // /
      .when("/", {
        // obj
        // template url
        // list.html
        templateUrl: "list.html",
        controller: "ListController",
        resolve: {
          contacts: function(Contacts) {
            //return Contacts.getContacts();
          }
        }
      })
      .when("/new/contact", {
        controller: "NewContactController",
        templateUrl: "contact-form.html"
      })
      .when("/contact/:contactId", {
        controller: "EditContactController",
        templateUrl: "contact.html"
      })
      .otherwise({
        redirectTo: "/"
      })
  })
  .service("Contacts", function($http) {
  
  })
  .controller("ListController", function(contacts, $scope) {
    // list controller
    // func
    // contact
    // $scope
    
  })
  .controller("NewContactController", function($scope, $location, Contacts) {
    // new contact cotroller
    // $scope
    // $location
    // contacts
  })
  .controller("EditContactController", function($scope, $routeParams, Contacts) {
    
  })
  
