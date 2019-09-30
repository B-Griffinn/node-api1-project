/* 
  Knex is a SQL query builder, 
  mainly used for Node.js applications
  with built in model schema creation, 
  table migrations, connection pooling and seeding.
*/
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Export/Publish the database methods used to in our server.
module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

// return a promise that resolves to an arr of all users in the provided DB
function find() {
  return db('users');
}

// accepts an 'id' param >> returns the user that matches 'id' OR empty arr if user does not exist 
function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

// add a user to the DB >> return an object with the 'id' of inserted user ==> i.e. { id: 123 }
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

// accepts 2 args >> id === user to update ... user === object with changes to be applied.
 // returns count of updated records >>> if count is 1 it means the record was updated correctly.
function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

// accepts an 'id' param >> deletes user >> returns number of records deleted
function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
