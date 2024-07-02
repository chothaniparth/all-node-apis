const { errorMessage, checkKeysAndRequireValues, successMessage, safeUnlink } = require("../common/main");
const {pool} = require('../ConnectSQL');
const jwt  = require('jsonwebtoken');

const addUser = async (req, res) => {
    try{
        const {FirstName, LastName, Email, PhoneNumber, Age} = req.body
        let ProfileImage = req?.files?.Profile?.length ? `${req?.files?.Profile[0]?.filename}` : "";
        const missingkeys = checkKeysAndRequireValues(Object.keys(req.body), [FirstName, 'LastName', 'Email', 'PhoneNumber', 'Age'], req.body);
        if(missingkeys.length > 0){
            if(req.files && req.files.Profile && req.files.Profile.length > 0){
                safeUnlink(req?.files?.Profile[0]?.path);
            }
            return res.status(400).send(errorMessage(`${missingkeys} is required`));
        }
        const insertQuery = `INSERT INTO Users (FirstName, LastName, Email, PhoneBumber, Age, ProfileImage) VALUES ('${FirstName}', '${LastName}', '${Email}', '${PhoneNumber}', '${Age}', '${ProfileImage}')`;
        const result = await pool.request().query(insertQuery);
        if (result.rowsAffected[0] > 0) {
            const options = { expiresIn: '7d' }; // Token expiration time

            const token = jwt.sign({ PhoneBumber, Email }, '9nv5t3vb7954sdfg74g', options);
    
            return res.status(200).send({...successMessage("Data inserted successfully!"), token}); // or any other success message
        } else {
            // await fs.unlinkSync(req?.files?.logo[0]?.path);
            safeUnlink(req?.files?.logo[0]?.path);
            return res.status(400).send(errorMessage('No rows inserted of registration!'));
        }
    }catch(error){
        if(req.files && req.files.Profile && req.files.Profile.length > 0){
            safeUnlink(req?.files?.Profile[0]?.path);
        }
        console.log('add user error', error);
        return res.status(500).send(errorMessage(error?.message));
    }
}
 
const verifyHandler = async (req, res) => {
    try {
        const { PhoneBumber } = req.body;
        const missingKeys = checkKeysAndRequireValues(['PhoneBumber'], { ...req.body })
        if (missingKeys.length > 0) {
            return res.status(400).send(`${missingKeys.join(', ')} parameters are required and must not be null or undefined`);
        }

        const verifyUser = await pool.request().query(`SELECT * FROM contect where PhoneBumber = '${PhoneBumber}'`);
        if(verifyUser?.recordset?.length === 0) {
            return res.send({...successMessage('User not found'), verify: false });
        }

        const { MobileNumber = PhoneBumber, Email } = verifyUser?.recordset[0];

        const options = { expiresIn: '7d' }; // Token expiration time

        const token = jwt.sign({ MobileNumber, Category }, SECRET_KEY, options);

        res.status(200).send({...successMessage('User verified'), verify: true, token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(errorMessage(error?.message));
    }
}


module.exports = {
    addUser,
}