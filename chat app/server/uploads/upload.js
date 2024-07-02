const multer = require('multer');

const Profilestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/ProfileImage`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
const uploadFields = [
    { name: 'Profile', maxCount: 1 },
];
const ProfileUpload = multer({ storage: Profilestorage }).fields(uploadFields);

module.exports = {
    ProfileUpload,
}