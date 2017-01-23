var backend_server = "http://mean_contact_list_back.local";

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
        // when doing routeProvider
        // we don't put #, just /new/contact
        // contoller, see below
        controller: "NewContactController",
        // template url
        // xxx.html
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
      return $http.get(backend_server + "/contacts").
        then(function(response) {
        
          //console.log("===test===???");
          //console.log(response);
          
          // return response
          return response;
        }, function(response) {
          alert("Error finding contacts.");
        });
    }
    
    // this is the service
    // createContact is a newly created func
    // func(contact), contact expects ng-model from input, etc  
    this.createContact = function(contact) {
      // return
      // $http
      // post
      // /contacts
      // post he ng-model, contact
      return $http.post(backend_server + "/contacts", contact)
        // .then
        // response
        .then(function(response) {
          // return response
          return response;
        }, function(response) {
          // alert
          alert("Error creating contact.");
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
    // ng-click="back()", used in contact-form.html
    // so we append func to $scope, then use in template
    $scope.back = function() {
      // $location
      // #/
      $location.path("#/");
    }
    
    // in contact-form.html
    // ng-click="saveContact(contact)"
    // there are many fields in contact-form.html
    // e.g. ng-model="contact.firstName",
    // so contact is from the ng-model, pass into createContact
    $scope.saveContact = function(contact) {
      // Contacts is service
      // createContact is a func of service
      // then
      Contacts.createContact(contact).then(function(doc) {
        // what is doc????????
        // document in colleciton
        // /contact/243242343434
        var contactUrl = "/contact/" + doc.data._id;
        // $locaiton.path, go to that contact id
        $location.path(contactUrl);
      }, function(response) {
        // error
        alert(response);
      });
    }
    
  })
  .controller("EditContactController", function($scope, $routeParams, Contacts) {
    
  })
  
