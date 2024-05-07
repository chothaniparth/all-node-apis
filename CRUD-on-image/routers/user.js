const express = require('express');
const multer = require('multer');
const { uploadProfileImage, fetchImg , deleteProfileImg, updateProfileImage} = require('../controllers/user');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './media';
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + '-' + file.originalname;
        cb(null, uniqueFileName);
    },
});

// Create multer instance
const upload = multer({ storage: storage });

// Routes
router.post('/upload', upload.single('profile'), uploadProfileImage);
router.post('/getImage', fetchImg);
router.delete('/deleteProfileImg', deleteProfileImg);
router.put('/upload',upload.single('profile'), updateProfileImage)

module.exports = router;
