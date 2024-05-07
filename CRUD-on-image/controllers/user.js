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
        db.query(quary, async (error, result)=>{
            if(error){
                console.log('add image error :', error);
                const deleteOldImage = await fs.unlinkSync(`./media/${req.file.filename}`);
                // console.log(deleteOldImage);
                return res.json({success : false, msg : 'system error'})
            } else {
                const serverAddress = `http://${process.env.domain}/media/${req.file.filename}`;
                return res.json({success : true,  msg : 'added image successfully', url : serverAddress})
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
                    const serverAddress = `http://${process.env.domain}/media/${imageName}`;
                    return res.json({success : true, msg : serverAddress})
                }
            }
        });
    }
}

async function deleteProfileImg(req, res) {
    try {
        const { id } = req.body;
        const query = `SELECT Uprofile FROM images WHERE id = ${id}`;
        
        const imageResponse = await db.query(query);

        if (imageResponse.recordset.length === 0 || !imageResponse.recordset[0].Uprofile  === null) {
            return res.json({ success: false, msg: 'Image does not exist' });
        }
        const image = imageResponse.recordset[0].Uprofile

        const deleteOldImage = await fs.unlinkSync(`./media/${image}`) 
        // console.log(deleteOldImage);
        const deleteFromDatabase = `UPDATE images SET Uprofile = '' WHERE id = ${id}`;
        const updateResponse =  await db.query(deleteFromDatabase); 
        // console.log('delte update :', updateResponse);
        return res.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return res.json({ success: false, msg: 'System error' });
    }
}

async function updateProfileImage (req, res){
    try{   
        const {id} = req.body
        const {filename} = req.file
        if(!id || !filename){
            // console.log(id, filename);
            return res.json({success : false, msg : 'fill all fields'})
        }
        const oldImageQuary = `select Uprofile from images where id = ${id}`
        const getOldImage = await db.query(oldImageQuary)
        const image = getOldImage.recordset[0].Uprofile
        // Delete old image if it exists and is not an empty string
        if (image && image !== '' && image !== null) {
            // console.log('Deleting old image:', image);
            const deleteOldImage = await fs.unlinkSync(`./media/${image}`);
            // console.log('Old image deleted successfully');
        }
        const updateQuary = `update images set Uprofile = '${filename}' where id = ${id}`
        const newImageAddress = `http://${process.env.domain}/media/${filename}`
        return res.json({success : true, url : newImageAddress})
    } catch(error){
        console.log('update error :', error);
        const deleteOldImage = await fs.unlinkSync(`./media/${req.file.filename}`);
        return res.json({success : false, msg : 'system error'})
    }
}

module.exports = {
    uploadProfileImage, 
    fetchImg, 
    deleteProfileImg, 
    updateProfileImage
};