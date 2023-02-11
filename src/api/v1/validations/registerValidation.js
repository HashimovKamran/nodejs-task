const Joi = require('joi');

const registerValidation = (req, res, next) => {
    const {name, email, password} = req.body.metadata;

    const schema = Joi.object({
        metadata: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
        }
    });
      
    const data = {
        metadata:{
            name: name,
            email: email,
            password: password
        }
    };
      
    const result = schema.validate(data);
    if (result.error) {
        res.status(422).json(result.error.message);
    } else next()
}

module.exports = registerValidation;