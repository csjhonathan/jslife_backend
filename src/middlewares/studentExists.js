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
			
			return next();
		} catch ( error ) {
			return res.status( 500 ).send( {message: error.message} );
		}
	};
}