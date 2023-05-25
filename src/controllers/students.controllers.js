import StudentsRepositories from '../repositories/students.repositories.js';
import RegistrationsRepositories from '../repositories/registrations.repositories.js';

const registration = new RegistrationsRepositories;
const students = new StudentsRepositories;
class StudentsControllers
{
	async create ( _req, res ){
		const {name, email, cpf, photo, classId} = res.locals;
		try {
			const {rows: [student]} = await students.create( {name, email, cpf, photo, classId} );
			await registration.create({student_id: student.student_id, class_id: classId});
			return res.status( 201 ).send( {message: 'aluno cadastrado'} );
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async update ( _req, res ){

		const {name, email, cpf, photo, classId: class_id, roleId: role_id, studentId: student_id, previous} = res.locals;
		if( !student_id ) return res.status( 401 ).send( 'Informe um id para a alteração!' );
		try {
			await students.update( {name, email, cpf, photo, class_id, role_id}, student_id );

			if(class_id && previous.class_id !== class_id){
				await registration.create({student_id, class_id});
			}

			return res.status( 201 ).send( {message: 'Atualização bem sucedida!'} );
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async list ( req, res ){
		const {classId} = req.query;
		try {
			const {rows: studentsList} = await students.getStudents ( {classId} );
			return res.status( 200 ).send( studentsList );
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default StudentsControllers;