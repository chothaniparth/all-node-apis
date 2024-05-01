const sql = require('mssql/msnodesqlv8');
const path = require('path');
const fs = require('fs');
const {DB_connect} = require('../DB_connect');
DB_connect();

const db = new sql.Request();

async function uploadProfileImage(req, res) {
    if(!req.body.Uname || !req.file.filename){
        return res.json({success : false, msg : 'please fill all fields'})
    } else {
        const quary = `insert into images (Uname, Uprofile) values ('${req.body.Uname}', '${req.file.filename}')`
        // const values = [req.body.Uname, req.file.filename]
        db.query(quary, (error, result)=>{
            if(error){
                console.log('add image error :', error);
                return res.json({success : false, msg : 'system error'})
            } else {
                console.log('add image result :', req.file);
                return res.json({success : true,  msg : 'added image successfully'})
            }
        })
    }
}

function fetchImg(req, res) {
    if (!req.body.id) {
        return res.json({ success: false, msg: 'Can not get image without id' });
    } else {
        const query = `SELECT Uprofile FROM images WHERE id = ${req.body.id}`;
        db.query(query, (error, result) => {
            if (error) {
                console.log('Error in extracting image:', error);
                return res.json({ success: false, msg: 'System error' });
            } else {
                if (result.recordset.length === 0) {
                    return res.json({ success: false, msg: 'No image found with the provided id' });
                } else {
                    const imageName = result.recordset[0].Uprofile;
                    const serverAddress = `http://localhost:8000/media/${imageName}`;
                    return res.json({success : true, msg : serverAddress})
                }
            }
        });
    }
}

function deleteProfileImg(req, res){
    if(!req.body.id){

    }
}

module.exports = {uploadProfileImage, fetchImg, deleteProfileImg};




// fs.access(imagePath, fs.constants.F_OK, (err) => {
//     if (err) {
//         console.log('Image file not found:', err);
//         return res.json({ success: false, msg: 'Image file not found' });
//     } else {
//         // Read the image file
//         fs.readFile(imagePath, (err, data) => {
//             if (err) {
//                 console.log('Error reading image file:', err);
//                 return res.json({ success: false, msg: 'Error reading image file' });
//             } else {
//                 // Set appropriate headers for image response
//                 res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image format
//                 res.setHeader('Content-Disposition', 'inline');
                
//                 // Send image data and URL in the response
//                 res.json({ success: true, imageUrl: imageUrl, imageData: data.toString('base64') });
//             }
//         });
//     }
// });


