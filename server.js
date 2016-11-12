//Requires Modules
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//Creating the object constructors for add, remove, and update the shopping list.
var Storage = {
  add: function(name, id) {
    var item;
    if(id==null) {
      item = {name: name, id: this.setId};
    }
    else{
      item = {name: name, id: id};
    }
    this.items.push(item);
    this.setId += 1; 
    return item;
  },
  remove: function(id) {
    var targetIndex = null;
    this.items.forEach(function(item, i){
      if(item.id == id){
        targetIndex = i;
      }
    });
    if(targetIndex === null){
      return false;
    }
    else{
      this.items.splice(targetIndex, 1);
      return true;
    }
  },
  update: function(name, id){
    var targetIndex = null;
    this.items.forEach(function(item, i){
      if(item.id == id){
        targetIndex = i;
      }
    });
    if(targetIndex === null){
      return this.add(name, id);  
    }
    else{
      this.items[targetIndex].name = name;
      return this.items[targetIndex];
    }
    
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}
//Storing the objects for the storage for the user using the shopping list.
var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
//Creating the app to tell and let express 
var app = express();
app.use(express.static('public'));
//Applying the GET request all items.
app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.listen(process.env.PORT || 8080, function(){
  console.log('Server is running at http://localhost:8080');
});

exports.app = app;
exports.storage = storage;


// PUTing and DELETEing items

//  Estimated Time: 2-3 hours
// In the previous assignments you created a server that allows you to add items to your shopping list and view those items. Now you need a way to delete the items from your list when you have successfully picked them up from the store, and edit them when you change your mind about buying an item.

// Part 1 - adding a DELETE endpoint
// To complete this section of the assignment you should create a DELETE endpoint for /items/<id>. For example, making a delete request to /items/3 would delete the item with ID 3.

// Requirements

// Create an endpoint that responds to a DELETE request to /items/:id
// If the item is succesfully deleted, the server should respond with a 200 OK status
// If an incorrect ID is supplied, your endpoint should fail gracefully, returning a 404 Not Found status and a JSON error message.
// Part 2 - adding a PUT endpoint
// To complete this section of the assignment you should create a PUT endpoint for /items/<id>. For example, sending the JSON object {"name": "Durian", "id": 3} to /items/3 should set the item with ID 3 to be a Durian.

// Requirements

// Create an endpoint that responds to a PUT request to /items/:id
// If the item is edited, the server should respond with a 200 OK status and the new item
// If the request is incorrectly formed (bad body, missing id), the request should fail gracefully
// If a non-existent ID is supplied, your endpoint should create a new item using the ID supplied.
// Remember that you're passing the ID in the request.params and the request.body, so you should check that they match as well.
// Extension task - An API for users
// If you'd like more practice building APIs, then try extending your API for creating and managing users. Users should have a username, and should be able to own a subset of the items on the list. For now, users shouldn't have passwords or be able to login. For example, if you were to make a get request to /users/joe, you might be given the following data:

// {
//     "username": "joe",
//     "items": [{
//         "name": "Durian",
//         "id": 3
//     },
//     {
//         "name": "Plantain",
//         "id": 7
//     }]
// }
// Adjust your data model in storage to have users that own items.
// Adjust the starter data to have users.
// Create an endpoint that responds to a GET request to /users/:username that shows only the items that belong to the user.
// Tip: Making requests using cURL
// You will find that using a browser to debug your endpoints is very cumbersome. For example, you would need to use an AJAX request to send JSON data to your API. cURL is a command-line utility which you can use to make HTTP requests directly to your API. For example, to make requests to the four CRUD endpoints in this project you could run the following commands (while your server is running):

// # Make a GET request to fetch the list of items
// curl http://localhost:8080/items

// # Make a POST request to add an item
// curl -X POST -H "Content-Type: application/json" -d '{"name": "durian"}' http://localhost:8080/items

// # Make a PUT request to edit an item
// curl -X PUT -H "Content-Type: application/json" -d '{"name": "durian", "id": 3}' http://localhost:8080/items/3

// # Make a DELETE request to delete an item
// curl -X DELETE http://localhost:8080/items/3
// The -X flag to cURL describes which HTTP method you are using (GET, POST, PUT or DELETE). The default is to make a GET request. The -H flag allows you to provide additional headers for the request. Notice how in the POST and PUT requests you add a header saying that the content of the request body will be JSON. The -d flag is used to provide the data which will be sent in the request body.