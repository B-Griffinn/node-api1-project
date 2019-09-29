// implement your API here

// import express
const express = require('express');


// create the server
const server = express();
// use the json-afied version of express between us and the browser
server.use(express.json());

// handle requests to the root of the API '//
server.get('/', (req, res) => {
    res.send('Hello From your first server project, Ben!');
});


// POST ** '/api/users' ==> Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    if(req.body !== res.name || res.bio) {
       // ** cancel the request **
       res.sendStatus(400).json({ errorMessage: "Please provide name and bio for the user." });
    } 
    else {
       // save the new user the the database
       res.insert(req.body)
       res.sendStatus(201) 
    }
});

// GET ** '/api/users' ==> Returns an array of all the user objects contained in the database.

// GET ** '/api/users/:id' ==> Returns the user object with the specified id.

// DELETE ** '/api/users/:id' ==> Removes the user with the specified id and returns the deleted user.

/* PUT ** 
'/api/users/:id' ==> 
Updates the user with the 
specified id using data from the request body.
Returns the modified document, NOT the original.
*/


// watch for connections on our port
server.listen(5000, () => {
    console.log('Server is listening to port 5000');
});
