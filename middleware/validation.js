const joi = require('@hapi/joi');

// validate sign up payload to make sure it has valid fields present
function validateSignupBody(req, res, next) {
  const keys = [
    'email',
    'username',
    'firstname',
    'lastname',
    'password',
    'role'
  ];
  for (let key of Object.keys(req.body)) {
    if (!keys.includes(key)) delete req.body[key];
  }
  //schema validation for signup body
  const schema = joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
    username: joi
      .string()
      .min(4)
      .required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required(),
    role: joi.string()
  });
  const body = req.body || {};

  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).send({
      message: 'Bad Request',
      error: {
        name: error.name,
        message: error.details[0].message
      },
      data: null
    });
  }
  next();
}

//validate login payload to make sure it has valid fields
function validateLoginBody(req, res, next) {
  const keys = ['email', 'password'];
  for (let key of Object.keys(req.body)) {
    //if keys are present in req.body but are not valid delete them
    if (!keys.includes(key)) delete req.body[key];
  }

  const schema = joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  });

  const body = req.body || {};
  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).send({
      message: 'Bad Request',
      error: {
        name: error.name,
        message: error.details[0].message
      },
      data: null
    });
  }
  next();
}

module.exports = {
  validateSignupBody,
  validateLoginBody
};
