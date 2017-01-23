// Hak
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
          // http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
          // resolve it is also a promise, just guarantee finished.
          // We can have multiple async funcs here, they all be resolved before passing to controller.
        
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
        // NOTE: have no resolves
      
        // when doing routeProvider
        // we don't put #, just /new/contact
        // contoller, see below
        controller: "NewContactController",
        // template url
        // xxx.html
        templateUrl: "contact-form.html"
      })
      
      
      .when("/contact/:contactId", {
        // contact/id
        // controller: edit contact controler
        controller: "EditContactController",
        // template contact.html
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
    

    // this
    // getContact
    // func
    // contact id, someone pass    
    this.getContact = function(contactId) {
      // url
      // contacts/id
      var url = backend_server + "/contacts/" + contactId;
      return $http.get(url)
        .then(function(response) {
          return response;
        }, function(response) {
          alert("Error finding this contact.");
        });
    }
    
    
    this.editContact = function(contact) {
      // var url
      // contacts/id
      var url = backend_server + "/contacts/" + contact._id;
      
      // console id
      console.log(contact._id);
      
      // actually put
      return $http.put(url, contact)
        // then
        .then(function(response) {
          // res
          return response;
        }, function(response) {
          // alert
          alert("Error editing this contact.");
          console.log(response);
      });
    }
    
    
    this.deleteContact = function(contactId) {
      var url = backend_server + "/contacts/" + contactId;
        // actually http delete
        return $http.delete(url)
          .then(function(response) {
            return response;
          }, function(response) {
            alert("Error deleting this contact.");
            console.log(response);
        });
    }  
    
    
  })
  
  
  .controller("ListController", function(contacts, $scope) {
    // contacts is the ================ resolve
  
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
    // Only Contacts is available
    
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
  
  
  .controller("EditContactController", function($scope, $route, $routeParams, $location, Contacts) {
    // Only Contacts is available
  
    // Contacts is service
    // getContact .................
    // $route params
    // contact id
    // then
    // func doc
    Contacts.getContact($routeParams.contactId).then(function(doc) {
      // attach contact to $scope
      // doc
      // .data
      // and it attach some data to $scope, so incase we need to use it in ng model.
      $scope.contact = doc.data;
    }, function(response) {
      alert(response);
    });

    // that is why is called toggle edit...
    // NOTE: clic, the edit button........
    // $scope
    // toggle edit
    // == func
    $scope.toggleEdit = function() {
      // $scope
      // edit mode = true
      // display contact info.............
      $scope.editMode = true;
      
      // $scope
      // contact form url
      // is the actual contact form html..............
      // include the form, to allow edit...
      $scope.contactFormUrl = "contact-form.html";
    }

    // $scope
    // back
    // === func
    // $scope
    // edit mode = false
    // $scope
    $scope.back = function() {
      // edit mode false, display contact info
      $scope.editMode = false;
      // include nothing
      $scope.contactFormUrl = "";
    }

    // $scope
    // save contact
    $scope.saveContact = function(contact) {
      // actually save edit contact
      Contacts.editContact(contact);
      
      // edit mode false, display contact info
      $scope.editMode = false;
      $scope.contactFormUrl = "";
    }

    // delete
    $scope.deleteContact = function(contactId) {
      Contacts.deleteContact(contactId).then(function(data){
      
        //test
        console.log("--test--");
        console.log(data);
      
        // Bug....
        // I want to go back to home page to list all items
        // but I still see the item, even though I delete it.
        // I need to refresh the entire page....
        $location.path("/");
      });
      
    }
    
  })
  
