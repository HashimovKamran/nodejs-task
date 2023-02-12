const sendToken = (user, statusCode, res) => {
    const token = user.createJWT(user._id);
    
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
        httpOnly : true
    };

    res.status(statusCode)
        .cookie('Bearer', token, options)
        .json({
           success : true,
           token
        });
}

module.exports = sendToken;