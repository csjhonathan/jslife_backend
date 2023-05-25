import Joi from 'joi';

export const createClassSchema = Joi.object({
	className: Joi
		.string()
		.length(2)
		.required()
});

export const updateClassSchema = Joi.object({
	classId: Joi
		.number()
		.greater(0)
		.required(),
	name: Joi
		.string()
		.length(2)
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

