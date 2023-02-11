const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../middlewares/errorHandler');

const isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) {
        return res.status(401).json({'message':'Unauthenticated'})
    }
    
    jwt.verify(token, process.env.JWT_SECRET);
    next();
});

module.exports = isAuthenticatedUser;