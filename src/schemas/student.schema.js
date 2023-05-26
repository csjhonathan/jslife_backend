import Joi from 'joi';

export const studentSchemaRegister = Joi.object( {
	name: Joi
		.string()
		.min( 6 )
		.pattern( /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+){1,}$/ )
		.message( 'Informe o nome e sobrenome.' )
		.required(),
	email: Joi
		.string()
		.min( 5 )
		.email()
		.message( 'O campo deve ser em E-mail válido.' )
		.required(),
	photo: Joi
		.string()
		.uri( {scheme: ['http', 'https']} )
		.min( 5 )
		.message( 'O campo deve ser uma URL válida.' )
		.optional(),
	cpf: Joi
		.string()
		.length( 11 )
		.required(),
	classId: Joi
		.number()
		.greater( 0 )
		.message( 'O campo classId é obrigatório e deve ser maior que 0' )
		.required()
} );

export const studentSchemaUpdate = Joi.object( {
	name: Joi
		.string()
		.min( 6 )
		.pattern( /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+){1,}$/ )
		.message( 'Informe o nome e sobrenome.' )
		.optional(),
	email: Joi
		.string()
		.min( 5 )
		.email()
		.message( 'O campo deve ser em E-mail válido.' )
		.optional(),
	photo: Joi
		.string()
		.uri( {scheme: ['http', 'https']} )
		.min( 5 )
		.message( 'O campo deve ser uma URL válida.' )
		.optional(),
	cpf: Joi
		.string()
		.length( 11 )
		.optional(),
	classId: Joi
		.number()
		.greater( 0 )
		.message( 'O campo classId é obrigatório e deve ser maior que 0' )
		.optional()
} );