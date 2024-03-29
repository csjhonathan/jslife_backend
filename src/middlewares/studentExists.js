import StudentsRepositories from '../repositories/students.repositories.js';

const student = new StudentsRepositories;

export default function studentExist (){
	return async ( req, res, next ) => {
    
		const {email, cpf} = res.locals;
		const {path} = req;
		const {studentId} = req.params;

		try {

			const {rows: [studentByCpf]} = await student.getStudentByCpf( {cpf} );
			const {rows: [studentByEmail]} = await student.getStudentByEmail( {email} );
			const {rows: [studentById]} = await student.getStudentById( {studentId} );

			if( path === '/students/register' && ( studentByCpf || studentByEmail ) ){
				return res.status( 409 ).send( {message: 'Este aluno ja está cadastrado'} );
			}

			const previous = {};
			if( path.includes('/students/update') && !studentById ){
				return res.status( 409 ).send( {message: 'Aluno não encontrado!'} );
			}else if(path.includes('/students/update') && studentById){
				const hash = {
					name: true,
					cpf: true,
					email: true,
					classId: true,
					photo: true
				};

				for( const props in studentById ){
					if(!studentById[props] || !hash[props]) continue;
					previous[props] = studentById[props];
				}
				
				res.locals.previous = previous;
			}
			
			if(path.includes('/registrations/create/') && studentById && studentById.registered){
				return res.status(404).send({message: 'Este aluno já está matriculado!'});
			}else if(path.includes('/registrations/create/') && studentById && !studentById.registered){
				const hash = {
					name: true,
					cpf: true,
					email: true,
					registrationClassId: true,
					photo: true
				};
				for( const props in studentById ){
					if(!studentById[props] || !hash[props]) continue;
					previous[props] = studentById[props];
				}
				
				res.locals.previous = previous;
			}

			if(path.includes('/students/signin') && studentByEmail){
				res.locals.studentByEmail = studentByEmail;
				return next();
			}else if(path.includes('/students/signin') && !studentByEmail){
				return res.status(409).send({message: 'Email Incorreto!'});
			}

			if(path.includes('/students/update/password/') && studentById){
				if(res.locals.token !== studentById.id) return res.status(401).send({message: 'Você não pode alterar a senha de outro usuário!'});
				res.locals.studentById = studentById;
				return next();
			}else if(path.includes('/students/update/password/') && !studentById){
				return res.status(409).send({message: 'Usuário não encontrado!'});
			}
			return next();
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	};
}