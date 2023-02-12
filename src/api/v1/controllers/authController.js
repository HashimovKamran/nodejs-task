const User = require('../models/User');
const catchAsyncErrors = require('../helpers/catchAsyncErrors');
const sendToken = require('../helpers/sendToken');

const registerUser = catchAsyncErrors( async (req, res, next) => {
    const {name,email,password} = req.body.metadata;

    const user = await User.findOne({email});

    if(user) {
        return res.status(401).json({'message':'Invalid Email or Password.'});
    }
    
    await User.create({
        name,
        email,
        password
    });

    res.status(201).json({"success": true, 'message':'User successfully created'});
});

const loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body.metadata;

    const user = await User.findOne({email}).select('+password');
    
    if(!user) {
        return res.status(401).json({'message':'Invalid Email or Password.'});
    }
    
    const isPasswordMatched = await user.comparePassword(password, user.password);

    if(!isPasswordMatched) {
        return res.status(401).json({'message':'Invalid Email or Password.'});
    }
    sendToken(user, 200, res);
});

module.exports = { registerUser, loginUser };