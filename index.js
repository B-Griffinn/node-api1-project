// implement your API here

// import express
const express = require('express');

// import our DB 
const Users = require('./data/db.js');

// create the server
const server = express();
// use the json-afied version of express between us and the browser (parser)
server.use(express.json());

// handle requests to the root of the API '//
server.get('/', (req, res) => {
    res.send('Hello From your first server project, Ben!');
});


// POST ** '/api/users' ==> Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    // hold our req body in a const
    const userProps = req.body;

    console.log('This is usrProps', userProps)

    if(!userProps.name || !userProps.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Users.insert(userProps)
        .then(user => {
            res.status(201).json({ newUser: user });
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
});

// GET ** '/api/users' ==> Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    Users.find()
    .then(user => {
        res.status(200).json({ foundUser: user });
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    });
});

// GET ** '/api/users/:id' ==> Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {

    const userId = req.params.id;

        // res.status(404).json({ message: "The user with the specified ID does not exist." })

        Users.findById(userId)
        .then(user => {
            // console.log(user)
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }   
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        });
});


// DELETE ** '/api/users/:id' ==> Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const removingId = req.params.id;

    Users.findById(removingId)
    .then(delUser => {
        // console.log(user)
        if(delUser) {
        res.status(200).json(delUser)
        Users.remove(removingId)
        .then(() => null)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }    
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
});



/* PUT ** 
'/api/users/:id' ==> 
Updates the user with the 
specified id using data from the request body.
Returns the modified document, NOT the original.
*/

server.put('/api/users/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if(!body.name || !body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
    // Update our user
    Users.update(id, body)
    .then(() => {
        Users.findById(id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            } else if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
});


// watch for connections on our port
server.listen(5000, () => {
    console.log('Server is listening to port 5000');
});
