import StudentsRepositories from '../repositories/students.repositories.js';

const student = new StudentsRepositories;

export default function studentExist (){
	return async ( req, res, next ) => {
    
		const {email, cpf} = res.locals;
		const {path} = req;

		try {

			const {rows: [studentByCpf]} = await student.getStudentByCpf( {cpf} );
			const {rows: [studentByEmail]} = await student.getStudentByEmail( {email} );

			if( path === '/students/register' && ( studentByCpf || studentByEmail ) ){
				return res.status( 409 ).send( {message: 'Este aluno ja está cadastrado'} );
			}
			
			return next();
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	};
}