const schema = require('./schema.js');

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

	const body = req.body || {};

	const { error } = schema.signupSchema.validate(body);
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

	const body = req.body || {};
	const { error } = schema.loginSchema.validate(body);
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
