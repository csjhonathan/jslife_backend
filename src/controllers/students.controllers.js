import StudentsRepositories from '../repositories/students.repositories.js';

const students = new StudentsRepositories;
class StudentsControllers
{
	async create ( req, res ){
		const {name, email, cpf, photo, classId} = res.locals;
		try {
			await students.create( {name, email, cpf, photo, classId} );
			res.status( 201 ).send( {message: 'aluno cadastrado'} );
		} catch ( error ) {
			res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default StudentsControllers;