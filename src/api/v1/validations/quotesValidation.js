const Joi = require('joi');

const quotesValidation = (req, res, next) => {
    const {limit} = req.body.metadata;

    const schema = Joi.object({
        metadata: {
            limit: Joi.number().integer().required()
        }
    });
      
    const data = {
        metadata:{
            limit: limit
        }
    };
      
    const result = schema.validate(data);
    if (result.error) {
        res.status(422).json(result.error.message);
    } else next()
}

module.exports = quotesValidation;