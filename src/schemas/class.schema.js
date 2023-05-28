import Joi from 'joi';

export const createClassSchema = Joi.object({
	className: Joi
		.string()
		.min(2)
		.required()
});

export const updateClassSchema = Joi.object({
	name: Joi
		.string()
		.min(2)
		.required(),
	entry: Joi
		.boolean()
		.optional(),
	start_date: Joi
		.date()
		.optional(),
	ending_date: Joi
		.date()
		.optional()
});

