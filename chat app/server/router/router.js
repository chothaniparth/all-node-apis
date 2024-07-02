const router = require('express').Router();
const userController = require('../controllers/user');
const { saveMessageToDatabase } = require('../controllers/message');

const {ProfileUpload} = require('../uploads/upload')

router.post('/user/add' , ProfileUpload, userController.addUser);

module.exports = router