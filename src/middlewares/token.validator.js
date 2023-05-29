import  Jwt  from 'jsonwebtoken';
import StudentsRepositories from '../repositories/students.repositories.js';

const students = new StudentsRepositories;
export default async function tokenValidate ( req, res, next ){
	const {authorization} = req.headers;
	const token = authorization?.split( ' ' )[1];
	const secretKey = process.env.JWT_SECRET_KEY || 'uma-chave-publica-para-o-bot';
	
	if( !token || !authorization ) return res.status( 401 ).send( {message: 'Token válido necessário!'} );

	try {

		const {id, email} = Jwt.verify( token, secretKey );
		const {rows: [user]} = await students.getStudentByEmail({email});
		if( !user ) return res.status( 401 ).send( {message: 'Usuário não existe'} );
		if(user.id!==id) return res.status( 401 ).send( {message: 'Você não pode alterar este usuário'} );
		res.locals.token = id;
		return next();
	} catch ( error ) {
		if( error.name === 'JsonWebTokenError' ){
			return res.status( 401 ).send( {message: 'Token válido necessário!'} );
		}
		return res.status( 500 ).send( {message: error.message} );
	}
}