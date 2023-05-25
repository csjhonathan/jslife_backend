import StudentsRepositories from '../repositories/students.repositories.js';

const student = new StudentsRepositories;

export default function studentExist (){
	return async ( req, res, next ) => {
    
		const {email, cpf, studentId} = res.locals;
		const {path} = req;

		try {

			const {rows: [studentByCpf]} = await student.getStudentByCpf( {cpf} );
			const {rows: [studentByEmail]} = await student.getStudentByEmail( {email} );
			const {rows: [studentById]} = await student.getStudentById( {studentId} );

			if( path === '/students/register' && ( studentByCpf || studentByEmail ) ){
				return res.status( 409 ).send( {message: 'Este aluno ja está cadastrado'} );
			}
			const previous = {};
			if( path === '/students/update' && !studentById ){
				return res.status( 409 ).send( {message: 'Aluno não encontrado!'} );
			}else if(path === '/students/update' && studentById){
				for( const props in studentById ){
					if(!studentById[props]) continue;
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