import RegistrationsRepositories from '../repositories/registrations.repositories.js';
import StudentsRepositories from '../repositories/students.repositories.js';

const student = new StudentsRepositories;
const registration = new RegistrationsRepositories;

class RegistrationsControllers
{

	async list (req, res){
		const {classId: class_id, studentId: student_id} = req.query;
		try {
			const {rows: registrations} = await registration.list({class_id, student_id});
			return res.status(200).send(registrations);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async create (req, res){

		const {class_id, previous} = res.locals;
		const {studentId: student_id} = req.params;

		if(previous.registrationClassId !== class_id) return res.status(401).send({message: 'Você não pode matricular um aluno fora de sua turma de interesse!'});
		try {

			const {rows: [{id: current_registration_id}]} = await registration.create({class_id, student_id});
			await student.update({current_registration_id, registered: true}, student_id);
			return res.status(201).send({message: 'Matrícula realizada com sucesso!'});

		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );

		}
	}

	async update (req, res){

		const {registrationId} = req.params;
		const {egress_date, class_id, student_id, prev} = res.locals;

		try {

			if(prev.class_id === class_id) return res.status(200).send({message: 'Nenhuma alteração foi feita pois a turma do aluno permaneceu igual!'});

			await registration.update({egress_date}, registrationId);

			if(class_id < prev.class_id) return res.status(401).send({message: 'Um aluno não pode ingressar numa turma anterior a sua!'});
			const {rows: [{id: current_registration_id}]} = await registration.create({class_id, student_id});
			await student.update({current_registration_id, registered: true}, student_id);

			return res.status(200).send({message: 'Matrícula do aluno atualizada!'});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async close (req, res){

		const {registrationId} = req.params;
		const {egress_date, student_id} = res.locals;

		try {

			await registration.update({egress_date}, registrationId);
			await student.close({current_registration_id: null, registered: false}, student_id);

			return res.status(200).send({message: 'Matrícula finalizada!'});
		} catch (error) {

			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default RegistrationsControllers;