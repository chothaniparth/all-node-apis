const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        D

        res.status(201).json({success : true});
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const {_id} = req.params;
        const user = await User.findByIdAndUpdate(_id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('user updated :', user);
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeUser = async (req, res)=>{
    try{
        const {_id} = req.params;
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            return res.status(404).json({success : false, data : `cannot find any product with ID ${_id}`});  
        }
        return res.status(200).json({success : true, data : user});
    }catch(error){
        res.status(400).json({ success : false ,message: error.message });
    }
}

module.exports = {fetchUser, addUser, updateUser ,removeUser }