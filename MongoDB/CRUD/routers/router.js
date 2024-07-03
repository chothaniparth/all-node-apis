const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/user/list', userController.fetchUser);
router.post('/user/add', userController.addUser);
router.put('/user/update/:_id', userController.updateUser);
router.delete('/user/delete/:_id', userController.removeUser);

module.exports = router