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
          // so it assign http response to {contacts: contacts}
          // contacts
          // func
          // contacts
          contacts: function(Contacts) {
            // return call service
            // Contacts service has many func
            // getContacts.
            return Contacts.getContacts();
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
    // service
    // this
    // getContacts is a func
    this.getContacts = function() {
      // return
      // $http
      // access the api
      return $http.get("http://mean_contact_list_back.local/contacts").
        then(function(response) {
        
          //console.log("===test===???");
          //console.log(response);
          
          // return response
          return response;
        }, function(response) {
          alert("Error finding contacts.");
        });
      }
      
      
  })
  .controller("ListController", function(contacts, $scope) {
    // list controller
    // func
    // contact
    // $scope
    
    //console.log("-- ListController --");
    //console.log(contacts);
    
    // because ListController is along side with resolve
    // resolve has {contacts: contacts}
    // contacts = function(Contacts)
    // we need to call func(Contacts), because Contacts is the service
    // we want to use later
    // Contacts.getContacts(); returns data from remote url
    // return Contacts.getContacts()
    // this means function(contacts, $scope), contacts is from "resolve"
    // attach $scope.contacts ====
    // .data
    $scope.contacts = contacts.data;
    
    //console.log($scope.contacts[0]);
  })
  .controller("NewContactController", function($scope, $location, Contacts) {
    // new contact cotroller
    // $scope
    // $location
    // contacts
    
    // $scope
    // .back
    // func
    $scope.back = function() {
      // $location
      // #/
      $location.path("#/");
    }
    
    
  })
  .controller("EditContactController", function($scope, $routeParams, Contacts) {
    
  })
  
