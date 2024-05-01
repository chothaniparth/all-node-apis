const express = require('express');
const route = express.Router();
const { fetchUser, addUser, deleteUser, updateUser} = require('../controller/controller')

// crud for user
route.post('/fetchUser', fetchUser)
route.post('/createUser', addUser)
route.delete('/deleteUser', deleteUser)
route.post('/updateUser', updateUser)

module.exports = route;