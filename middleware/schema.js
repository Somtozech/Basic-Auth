const joi = require('@hapi/joi');

//schema validation for signup body
const signupSchema = joi.object().keys({
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

const loginSchema = joi.object().keys({
	email: joi
		.string()
		.email()
		.required(),
	password: joi.string().required()
});

module.exports = {
	signupSchema,
	loginSchema
};
