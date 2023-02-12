const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    limit: { type: 'number' }
  },
  required: ['limit'],
};


const quotesValidation = (req, res, next) => {
    const { limit } = req.body.metadata;

    const data = {
        limit: limit
    };

    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
        res.status(422).json(validate.errors);
    } else next()
}

module.exports = quotesValidation;