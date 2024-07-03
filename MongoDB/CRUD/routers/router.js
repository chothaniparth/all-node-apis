const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/user/list', userController.fetchUser);
router.post('/user/add', userController.addUser);

module.exports = router