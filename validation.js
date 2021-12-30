const Joi = require("joi");

//Validate user registration with joi
const registrationValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
  return schema.validate(data)
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
  return Joi.validate(data, schema)
};

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation