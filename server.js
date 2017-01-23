// https://stackoverflow.com/questions/33695893/express-postman-req-body-is-empty
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

// mongo db
var mongodb = require("mongodb");

// cors
var cors = require('cors');

// obj id
var ObjectID = mongodb.ObjectID;

// contacts
var CONTACTS_COLLECTION = "contacts";

// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8005));

// https://stackoverflow.com/questions/37465815/node-js-no-access-control-allow-origin-header-is-present-on-the-requested
// use cors
app.use(cors()); 


var db;

// Connect to the database before starting the application server. 
// mongo db
// mongo client
// connect
// process
// env mongo db uri
var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/meandb'

mongodb.MongoClient.connect(mongo_uri, function (err, database) {
  // func
  // err, db
  // error
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // db
  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8005, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// handle error
// res, reason
// msg, code
function handleError(res, reason, message, code) {
  // console log
  console.log("ERROR: " + reason);
  
  // res status, 500
  res.status(code || 500).json({"error": message});
}


// app
// /contacts
// func
app.get("/contacts", function(req, res) {
  // db collection
  // contact_table
  // find {}
  // to array
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    // error
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      // res
      // status 200
      // json
      res.status(200).json(docs);  
    }
  });
});


// app
// post
// /contacts
app.post("/contacts", function(req, res) {

  //test
  //console.log("--test--");
  //console.log(req.body);  

  // new contact
  // req .body
  var newContact = req.body;
  
  // new contact
  // create date
  // new date();
  newContact.createDate = new Date();

  // req body firstname
  // req body lastname
  if (!(req.body.firstName || req.body.lastName)) {
    // handle error
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  // db collection
  // table
  // insert one
  // new contact
  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    // error
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      // status
      // res
      // 201 ----> it is created
      // .json
      // doc, return
      // ops, what is ops???????????
      // [0]
      res.status(201).json(doc.ops[0]);
    }
  });
});


// app
// get
// contacts/:id
// func, req, res
app.get("/contacts/:id", function(req, res) {
  // db
  // .collection
  // colleciton
  // find one
  // obj(_id, obj)
  // {_id: new obj_id()}
  // req.params.id
  // func
  // err, doc
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    // err
    if (err) {
      // handle error
      // res
      // err.msg
      // actual_msg
      handleError(res, err.message, "Failed to get contact");
    } else {
      // res
      // status
      // 200 means ok
      // .json
      // doc, we use this data in controller.
      res.status(200).json(doc);  
    }
  });
});


// app put, update
// contacts
// :id
// func
// req, res
app.put("/contacts/:id", function(req, res) {
  // update doc
  // req.body
  var updateDoc = req.body;
  
  // remove update doc
  // ._id, so just use useful data
  delete updateDoc._id;

  // db
  // collection
  // collection
  // update one
  // 
  // {_id: new obj_id() }
  // update doc: update doc
  // 
  // req.params, this is for id
  // req.params.id
  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    // error
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      // res
      // status
      // 204 ---> means fullfill the request, but no content
      // end()
      res.status(204).end();
    }
  });
});


// app delete
// contacts
// :id
// func
// req, res
app.delete("/contacts/:id", function(req, res) {
  // db collection
  // collection
  // delete one
  // {_id: new obj_id(..) }
  // func err res
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    // error
    if (err) {
      //
      handleError(res, err.message, "Failed to delete contact");
    } else {
      // res
      // status
      // 204
      // end()
      res.status(204).end();
    }
  });
});




// https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
app.get('/test', function(req, res) {
	res.status(200).send("good");
});


// https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
app.post('/test', function(req, res) {
    //var Keywords = req.body.Keywords;
    console.log("Yoooooo");
    console.log(req.headers);
    console.log(req.body);
    res.status(200).send("yay");
});
