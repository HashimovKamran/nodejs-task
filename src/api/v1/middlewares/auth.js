const catchAsyncErrors = require('../helpers/catchAsyncErrors');
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) {
        return res.status(401).json({'message':'Unauthenticated'})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({'message':'Unauthenticated'})
        } else next();
    });
});

module.exports = isAuthenticatedUser;