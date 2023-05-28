import StudentsRepositories from '../repositories/students.repositories.js';

const students = new StudentsRepositories;
class StudentsControllers
{
	async create ( _req, res ){
		const {name, email, cpf, photo, classId} = res.locals;
		try {
			await students.create( {name, email, cpf, photo, classId} );
			return res.status( 201 ).send( {message: 'aluno cadastrado'} );
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async update ( req, res ){

		const {name, email, cpf, photo} = res.locals;
		const {studentId: student_id} = req.params;
		
		if( !student_id ) return res.status( 401 ).send( 'Informe um id para a alteração!' );
		try {
			
			await students.update( {name, email, cpf, photo}, student_id );
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

	async getStudentById (req, res){
		const {studentId} = req.params;

		try {
			const {rows: [student]} = await students.getStudentById({studentId});
			if(!student) res.status(404).send({message: 'Este aluno não existe!'});
			return res.status(200).send(student);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default StudentsControllers;