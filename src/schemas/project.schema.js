import Joi from 'joi';

export const projectChema = Joi.object( {
	name: Joi
		.string()
		.required()
		.messages({
			'any.required': 'Informe o nome do projeto!'
		})
} );

export const deliverProject = Joi.object({
	project_id: Joi
		.number()
		.greater(0)
		.required(),
	class_id: Joi
		.number()
		.greater(0)
		.required(),
	student_id: Joi
		.number()
		.greater(0)
		.required(),
	repository: Joi
		.string()
		.uri()
		.required()
});

