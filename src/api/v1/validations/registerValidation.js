const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { 
        type: 'string',
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      },
      password: { 
        type: 'string',
        minLength: 8,
        maxLength: 20,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])(?=.{8,20})'
      }
    },
    required: ['name', 'email', 'password'],
};

const registerValidation = (req, res, next) => {
    const { name, email, password } = req.body.metadata;
      
    const data = {
        name: name,
        email: email,
        password: password
    };
      
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
        res.status(422).json(validate.errors);
    } else next()
}

module.exports = registerValidation;