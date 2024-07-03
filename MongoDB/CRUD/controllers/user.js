const {User} = require('../models/userSchema');

const fetchUser = async (req, res)=>{
    try{
        const users = await User.find();
        res.json({
            Success : true,
            data : users
        });
    }catch(error){
        res.status(500).json({ message: err.message });
    }
}

const addUser = async (req, res)=>{
    try{
        console.log('body', req.body);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log('user', user);
        const newUser = await user.save();
        console.log('newUser', newUser);
        res.status(201).json({success : true});
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

module.exports = {fetchUser, addUser}