import StudentsRepositories from '../repositories/students.repositories.js';
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';

const students = new StudentsRepositories;
class StudentsControllers
{
	async create ( _req, res ){
		const {name, email, cpf, photo, classId} = res.locals;
		try {
			if(email.includes('@driven') || email.includes('@admin')){
				await students.create( {name, email, cpf, photo, classId, role_id: 2} );
				return res.status( 201 ).send( {message: 'Usuário cadastrado'} );
			}
			await students.create( {name, email, cpf, photo, classId, role_id: 1} );
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

	async updatePassowrd (req, res){

		const{currentPassword,newPassword, studentById}=res.locals;
		const {studentId} = req.params;

		try {
			const passwordIsCorrect =  currentPassword === studentById.cpf || bcrypt.compareSync(currentPassword, studentById.password) ;

			if(!passwordIsCorrect) return res.status(401).send({message: 'A senha atual informada está incorreta!'});

			const hash = bcrypt.hashSync( newPassword, 10 );
			await students.updatePassowrd(hash, studentId);
			return res.status(200).send({message: 'Senha atualizada!'});
		} catch (error) {
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

	async getStudentByEmail (req, res){
		const {password, studentByEmail} = res.locals;

		try {
			const passwordIsCorrect = bcrypt.compareSync(password, studentByEmail.password) || password === studentByEmail.cpf;

			if(!passwordIsCorrect) return res.status(401).send({message: 'Senha incorreta!'});

			const payload = {id: studentByEmail.id, name: studentByEmail.name, cpf: studentByEmail.cpf, email: studentByEmail.email, role_id: studentByEmail.role_id};
			const secretKey = process.env.JWT_SECRET_KEY;
			const token = Jwt.sign(payload, secretKey);

			return res.status(200).send({...payload, token});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default StudentsControllers;