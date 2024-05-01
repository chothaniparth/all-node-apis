const express = require('express')
const {
    check,
    fetchUser,
    uploadUser,
    removeUser,
    updateUser
} = require('../controllers/user')
const router = express.Router()

router.post('/', check)
router.post('/getUser', fetchUser);
router.post('/addUser', uploadUser);
router.delete('/deleteUser', removeUser);
router.post('/updateUser', updateUser)

module.exports = router