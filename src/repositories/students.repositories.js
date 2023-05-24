import db from '../database/database_connection.js';

class StudentsRepositories
{
	create ( {name, email, cpf, classId, photo} ){
		const query = {
			text: `
        INSERT INTO students (name, email, cpf, class_id, photo)
        	VALUES ($1, $2, $3, $4, $5)
      `,
			values: [name, email, cpf, classId, photo]
		};

		return db.query( query );
	}

	getStudentByCpf ( {cpf} ){
		const query = {
			text: 'SELECT * FROM students WHERE cpf = $1',
			values: [cpf]
		};
		
		return db.query( query );
	}

	getStudentByEmail ( {email} ){
		const query = {
			text: 'SELECT * FROM students WHERE email = $1',
			values: [email]
		};

		return db.query( query );
	}
	
	getStudentById ( {studentId} ){
		const query = {
			text: 'SELECT * FROM students WHERE id = $1',
			values: [studentId]
		};

		return db.query( query );
	}

	getStudents ( {classId} ){
		const query = {
			text: `
				SELECT s.id, s.name, s.email, s.cpf, s.photo, c.name AS class, r.name AS role
					FROM students s
					LEFT JOIN class c ON c.id = s.class_id
					LEFT JOIN roles r ON r.id = s.role_id
					WHERE 1=1
			`,
			values: []
		};

		if( classId ){
			query.values.push( classId );
			query.text+= ` AND s.class_id = $${query.values.length}`;
		}

		return db.query( query );
	}

	update ( user, student_id ){

		let SET = 'SET';
		let WHERE = 'WHERE students.id = ';

		const values = [];

		for( const props in user ){

			if( !user[props] ) continue;
			values.push( user[props] );
			SET += `, ${props} = ${'$' + values.length}`;
			
		}

		values.push( student_id );
		
		WHERE += `${'$' + values.length};`;
		const query = {
			text: `
			UPDATE students
				${SET.replace( ',','' )}
        ${WHERE}
			`,
			values
		};

		return db.query( query );
	}
}

export default StudentsRepositories;