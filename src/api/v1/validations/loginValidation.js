const Joi = require('joi');

const loginValidation = (req, res, next) => {
    const {email, password} = req.body.metadata;

    const schema = Joi.object({
        metadata: {
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
        }
    });
      
    const data = {
        metadata:{
            email: email,
            password: password
        }
    };
      
    const result = schema.validate(data);
    if (result.error) {
        res.status(422).json(result.error.message);
    } else next()
}

module.exports = loginValidation;