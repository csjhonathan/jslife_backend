import RegistrationsRepositories from '../repositories/registrations.repositories.js';

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

	async update (req, res){
		const {registrationId} = req.params;
		const {egress_date} = req.query;
		try {
			await registration.update({egress_date}, registrationId);
			return res.status(200).send({message: 'Matrícula do aluno atualizada!'});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default RegistrationsControllers;