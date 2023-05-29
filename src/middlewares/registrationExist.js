import RegistrationsRepositories from '../repositories/registrations.repositories.js';

const registration = new RegistrationsRepositories;

export default function registrationExists (){
	return async (req, res, next) =>{

		const {registrationId} = req.params;
		const {student_id} = res.locals;

		try {

			const {rows: [reg]} = await registration.getRegistrationById(registrationId);

			if(!reg) return res.status( 409 ).send( {message: 'Matrícula não encontrada'} );
			if(reg.student_id !== student_id) return res.status( 401 ).send( {message: 'Esta matricula não pertence a este aluno!'} );
			if(reg.egress_date) return res.status(401).send({message: 'Esta matricula ja foi finalizada!'});
			
			res.locals.prev = reg;
			return next();
      
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	};
}