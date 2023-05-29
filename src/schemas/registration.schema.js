import Joi from 'joi';

export const registrationSchema = Joi.object({
	class_id: Joi
		.number()
		.greater(0)
		.required()
});

export const updateRegistrationSchema = Joi.object({
	student_id: Joi
		.number()
		.greater(0)
		.required(),
	class_id: Joi
		.number()
		.greater(0)
		.required(),
	egress_date: Joi
		.date()
		.required()
});

export const closeRegistrationSchema = Joi.object({
	student_id: Joi
		.number()
		.greater(0)
		.required(),
	egress_date: Joi
		.date()
		.required()
});